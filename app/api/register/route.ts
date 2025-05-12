import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";
import { createHash } from "crypto";
import { isHardcodedAdmin } from "@/config/admins";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await writeClient.fetch(
      `*[_type == "author" && email == $email][0]`,
      { email }
    );

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash the password (in production, use a proper password hashing library like bcrypt)
    const hashedPassword = createHash("sha256")
      .update(`${password}${process.env.PASSWORD_SALT || "salt"}`)
      .digest("hex");
    
    console.log("Registering new user with email:", email);

    // Check if this is a hardcoded admin email
    const isAdmin = isHardcodedAdmin(email);
    
    // Create a new user in Sanity with role set based on hardcoded admins
    const newUser = await writeClient.create({
      _type: "author",
      name,
      email,
      username: email.split("@")[0],
      password: hashedPassword, // Store the hashed password
      role: isAdmin ? 'admin' : 'viewer', // Set role based on hardcoded admins
      isAdmin: isAdmin, // Legacy field, keeping for backward compatibility
      pendingEditorRequest: false, // Not requesting editor privileges by default
      createdAt: new Date().toISOString(),
    });
    
    console.log("User registered successfully with ID:", newUser._id);

    // Return success without exposing sensitive data
    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: newUser._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}