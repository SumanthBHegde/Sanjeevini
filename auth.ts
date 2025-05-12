import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { createHash } from "crypto";
import { isHardcodedAdmin } from "@/config/admins";

// Add custom type extensions
declare module "next-auth" {
  interface User {
    id?: string;
    isAdmin?: boolean;
    role?: string;
  }
  
  interface Session {
    id?: string;
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin?: boolean;
      role?: string;
    } & Record<string, any>;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    isAdmin?: boolean;
    role?: string;
    user?: Record<string, any>;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          // Add additional GitHub-specific fields
          username: profile.login,
          bio: profile.bio
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }
        
        try {
          console.log("Attempting to authorize with email:", credentials.email);
          
          // Find user in Sanity database
          const user = await client.fetch(
            `*[_type == "author" && email == $email][0]{
              _id,
              name,
              email,
              password,
              isAdmin,
              role,
              image
            }`,
            { email: credentials.email }
          );
          
          console.log("User found:", user ? "Yes" : "No");
          
          if (!user || !user.password) {
            console.log("User not found or password missing");
            return null;
          }
          
          // Hash the input password with the same method used in registration
          const hashedInputPassword = createHash("sha256")
            .update(`${credentials.password}${process.env.PASSWORD_SALT || "salt"}`)
            .digest("hex");
          
          // Compare the hashed passwords
          const passwordMatch = hashedInputPassword === user.password;
          console.log("Password match:", passwordMatch);
          
          if (!passwordMatch) {
            return null;
          }
          
          // Check if this is a hardcoded admin email
          const isHardcodedAdminCheck = isHardcodedAdmin(credentials.email);
          
          // If it's a hardcoded admin but doesn't have admin role in DB, we'll update it later in callbacks
          const isAdminValue = isHardcodedAdminCheck ? true : (user.isAdmin || false);
          const roleValue = isHardcodedAdminCheck ? 'admin' : (user.role || 'viewer');
          
          console.log("Authentication successful for:", user.email);
          
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            isAdmin: isAdminValue,
            role: roleValue,
            isHardcodedAdmin: isHardcodedAdminCheck
          };
        } catch (error) {
          console.error("Error during credential authorization:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in", // Error code passed in query string as ?error=
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Allow credential sign-in if user was returned from authorize
      if (account?.provider === "credentials") {
        return !!user;
      }

      const id =
        account?.provider === "github"
          ? profile?.id
          : account?.provider === "google"
          ? profile?.sub
          : null;

      if (!id) {
        console.error("Profile ID is missing for provider:", account?.provider);
        return false;
      }

      try {
        // Check if user exists in Sanity
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });
          
        // Check if email is in hardcoded admin list
        const isEmailAdmin = user.email ? isHardcodedAdmin(user.email) : false;

        // Create user if they don't exist
        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id,
            name: user.name || "Anonymous",
            username:
              account?.provider === "github"
                ? profile?.login || "github_user"
                : user.email?.split('@')[0] || "google_user",
            email: user.email || "no_email",
            image: user.image || "",
            bio:
              account?.provider === "github"
                ? profile?.bio || "GitHub bio unavailable"
                : "Google bio unavailable",
            role: isEmailAdmin ? 'admin' : 'viewer', // Set role based on hardcoded admin list
            isAdmin: isEmailAdmin, // Set isAdmin based on hardcoded admin list
            // Track registration date
            createdAt: new Date().toISOString(),
          });
        } 
        // If user exists but the email is in the hardcoded admin list, ensure they have admin privileges
        else if (isEmailAdmin && (!existingUser.isAdmin || existingUser.role !== 'admin')) {
          await writeClient
            .patch(existingUser._id)
            .set({
              role: 'admin',
              isAdmin: true
            })
            .commit();
        }
        
        return true;
      } catch (error) {
        console.error("Error during OAuth sign-in:", error);
        return false;
      }
    },
    async jwt({ token, user, account, profile }) {
      // Add user data to the token when it's first created
      if (user) {
        token.id = user.id;
        
        // Check if this email is in the hardcoded admin list
        if (user.email && isHardcodedAdmin(user.email)) {
          token.isAdmin = true;
          token.role = 'admin';
          
          // If this is a hardcoded admin but doesn't have admin role in DB, update their role
          if (user.isHardcodedAdmin && user.id) {
            try {
              await writeClient
                .patch(user.id)
                .set({
                  role: 'admin',
                  isAdmin: true
                })
                .commit();
                
              console.log(`Updated hardcoded admin user: ${user.email}`);
            } catch (error) {
              console.error("Error updating hardcoded admin:", error);
            }
          }
        } else {
          token.isAdmin = user.isAdmin ?? false;
          token.role = user.role ?? 'viewer';
        }
        
        // For credential sign-ins, populate the token with user data
        if (!account || account.provider === "credentials") {
          token.user = {
            _id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            isAdmin: token.isAdmin,
            role: token.role
          };
        }
      }
      
      if (account && profile) {
        const id =
          account.provider === "github"
            ? profile?.id
            : account.provider === "google"
            ? profile?.sub
            : null;

        if (id) {
          try {
            const user = await client
              .withConfig({ useCdn: false })
              .fetch(
                `*[_type == "author" && id == $id][0]{
                  _id,
                  name,
                  email,
                  username,
                  image,
                  isAdmin,
                  role,
                  pendingEditorRequest
                }`, 
                { id }
              );
            
            if (user) {
              token.id = user._id || null;
              token.user = user;
              
              // Check if this email is in the hardcoded admin list and override DB values if needed
              if (user.email && isHardcodedAdmin(user.email)) {
                token.isAdmin = true;
                token.role = 'admin';
                token.user.isAdmin = true;
                token.user.role = 'admin';
                
                // Update the user in the database if they're not marked as admin
                if (!user.isAdmin || user.role !== 'admin') {
                  try {
                    await writeClient
                      .patch(user._id)
                      .set({
                        role: 'admin',
                        isAdmin: true
                      })
                      .commit();
                      
                    console.log(`Updated hardcoded admin user: ${user.email}`);
                  } catch (error) {
                    console.error("Error updating hardcoded admin:", error);
                  }
                }
              } else {
                // Use the database values
                token.isAdmin = user.isAdmin || false;
                token.role = user.role || 'viewer';
              }
            }
          } catch (error) {
            console.error("Error fetching user data for JWT:", error);
          }
        }
      }
      
      // Final check - if the email in the token is a hardcoded admin, ensure admin privileges
      if (token?.user?.email && isHardcodedAdmin(token.user.email)) {
        token.isAdmin = true;
        token.role = 'admin';
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.id = String(token.id);
      }
      if (token?.user) {
        session.user = {
          ...session.user,
          ...token.user
        };
      }
      // Add role and isAdmin flags to the session
      session.user.isAdmin = token.isAdmin ?? false;
      session.user.role = token.role ?? 'viewer';
      
      return session;
    },
  },
});
