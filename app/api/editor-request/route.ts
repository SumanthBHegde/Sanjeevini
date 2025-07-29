import { NextResponse } from "next/server";
import { auth } from "@/auth"; // Import auth from the root auth.ts file
import { writeClient } from "@/sanity/lib/write-client";
import { withSanityErrorHandling } from "@/sanity/env";

export async function POST(request: Request) {
  try {
    // Get the session using the auth() function
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be signed in to request editor access" },
        { status: 401 }
      );
    }
    
    // If user is already an editor or admin
    if (session.user.role === 'editor' || session.user.role === 'admin' || session.user.isAdmin) {
      return NextResponse.json(
        { error: "You already have editor privileges" },
        { status: 400 }
      );
    }
    
    // If user has a pending request
    if (session.user.pendingEditorRequest) {
      return NextResponse.json(
        { error: "You already have a pending editor request" },
        { status: 400 }
      );
    }
    
    // Get the reason from the request body
    const { reason } = await request.json();
    
    if (!reason || !reason.trim()) {
      return NextResponse.json(
        { error: "Please provide a reason for your request" },
        { status: 400 }
      );
    }
    
    // Ensure we have a valid user ID
    if (!session.user._id) {
      return NextResponse.json(
        { error: "User ID is missing. Please try signing out and signing in again." },
        { status: 400 }
      );
    }
    
    // Use the helper function to handle Sanity connection errors
    await withSanityErrorHandling(
      async () => {
        // Update the user's document in Sanity
        return writeClient
          .patch(session.user._id)
          .set({
            pendingEditorRequest: true,
            editorRequestReason: reason,
            editorRequestDate: new Date().toISOString()
          })
          .commit();
      },
      null
    ).catch(error => {
      console.error("Detailed Sanity error:", error);
      
      // Check if it's a network-related error
      if (error?.isNetworkError || 
          error?.code === "ENOTFOUND" || 
          (error?.message && (
            error.message.includes("getaddrinfo") || 
            error.message.includes("network") ||
            error.message.includes("connect")
          ))) {
        throw new Error("Cannot connect to Sanity API. Please check your internet connection and try again.");
      }
      
      // Re-throw the error for the catch block to handle
      throw error;
    });
    
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error in editor request API:", error);
    
    // Provide a more descriptive error message based on the type of error
    let errorMessage = "Failed to process editor request";
    
    if (error instanceof Error) {
      if (error.message.includes("Cannot connect to Sanity API")) {
        errorMessage = error.message;
      } else if (error.message.includes("ENOTFOUND")) {
        errorMessage = "Cannot reach the Sanity API. Please check your internet connection.";
      } else if (error.message.includes("Unauthorized")) {
        errorMessage = "Authorization error with Sanity. Please contact an administrator.";
      } else {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}