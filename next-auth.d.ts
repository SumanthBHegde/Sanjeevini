import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    isAdmin?: boolean;
    role?: string;
    isHardcodedAdmin?: boolean;
  }
  
  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    id?: string;
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin?: boolean;
      role?: string;
      _id?: string;
      username?: string;
      pendingEditorRequest?: boolean;
    } & Record<string, any>;
  }
  
  /**
   * The shape of the JWT token stored in the session cookie.
   */
  interface JWT {
    id?: string;
    isAdmin?: boolean;
    role?: string;
    user?: {
      _id?: string;
      name?: string;
      email?: string;
      image?: string;
      isAdmin?: boolean;
      role?: string;
      username?: string;
      pendingEditorRequest?: boolean;
    } & Record<string, any>;
  }
}
