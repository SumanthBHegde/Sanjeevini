import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";

export async function POST(request) {
  try {
    // Get the session to verify the user is an admin
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be signed in to perform this action" },
        { status: 401 }
      );
    }
    
    // Verify the user is an admin
    const isAdmin = session.user.role === 'admin' || session.user.isAdmin === true;
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: "You do not have permission to perform this action" },
        { status: 403 }
      );
    }
    
    // Get the action details from the request body
    const { userId, action, email, name } = await request.json();
    
    if (!userId || !action) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }
    
    if (action === 'approve') {
      // Update the user's role to editor and remove the pending request flag
      await writeClient
        .patch(userId)
        .set({
          role: 'editor',
          pendingEditorRequest: false,
          editorApprovedDate: new Date().toISOString(),
          editorApprovedBy: session.user._id
        })
        .commit();
      
      // Send approval email to the user
      if (email) {
        try {
          await fetch('/api/email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'editor_approval',
              recipient: email,
              username: name || 'User',
            }),
          });
        } catch (emailError) {
          console.error("Error sending approval email:", emailError);
          // Continue with the approval process even if email fails
        }
      }
      
      return NextResponse.json({ success: true, action: 'approved' });
    } 
    else if (action === 'reject') {
      // Update the user to remove the pending request flag
      await writeClient
        .patch(userId)
        .set({
          pendingEditorRequest: false,
          editorRequestRejectedDate: new Date().toISOString(),
          editorRequestRejectedBy: session.user._id
        })
        .commit();
      
      // Send rejection email to the user
      if (email) {
        try {
          await fetch('/api/email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'editor_rejection',
              recipient: email,
              username: name || 'User',
            }),
          });
        } catch (emailError) {
          console.error("Error sending rejection email:", emailError);
          // Continue with the rejection process even if email fails
        }
      }
      
      return NextResponse.json({ success: true, action: 'rejected' });
    }
    
    return NextResponse.json(
      { error: "Invalid action specified" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in editor approval/rejection API:", error);
    
    let errorMessage = "Failed to process editor request action";
    
    if (error?.message) {
      if (error.message.includes("Insufficient permissions")) {
        errorMessage = "Server lacks permission to update user records. Please contact a system administrator.";
      } else if (error.message.includes("Unauthorized")) {
        errorMessage = "Authorization error with Sanity. Please contact an administrator.";
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}