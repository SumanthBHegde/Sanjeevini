import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sendEmail } from "@/utils/email/mailer";
import { 
  generateEditorApprovalEmail, 
  generateEditorRejectionEmail, 
  generateEditorRequestEmail 
} from "@/utils/email/templates";

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const session = await auth();
    
    // Only admin users can send role-related emails
    const isAdmin = session?.user?.role === 'admin' || session?.user?.isAdmin === true;
    
    // Non-admin users can only send editor request receipt emails
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    const { type, recipient, username } = await request.json();

    // Validate request
    if (!type || !recipient || !username) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    let emailResult;
    
    switch (type) {
      case 'editor_approval':
        // Only admins can send approval emails
        if (!isAdmin) {
          return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 403 }
          );
        }
        
        const approvalEmail = generateEditorApprovalEmail(username);
        emailResult = await sendEmail({
          to: recipient,
          subject: "Your Editor Request Has Been Approved! - Sanjeevini",
          html: approvalEmail.html,
          text: approvalEmail.text
        });
        break;
        
      case 'editor_rejection':
        // Only admins can send rejection emails
        if (!isAdmin) {
          return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 403 }
          );
        }
        
        const rejectionEmail = generateEditorRejectionEmail(username);
        emailResult = await sendEmail({
          to: recipient,
          subject: "Update on Your Editor Request - Sanjeevini",
          html: rejectionEmail.html,
          text: rejectionEmail.text
        });
        break;
        
      case 'editor_request':
        // Anyone can send request notifications (for their own account)
        const requestEmail = generateEditorRequestEmail(username);
        emailResult = await sendEmail({
          to: recipient,
          subject: "Editor Request Received - Sanjeevini",
          html: requestEmail.html,
          text: requestEmail.text
        });
        break;
        
      default:
        return NextResponse.json(
          { success: false, message: "Invalid email type" },
          { status: 400 }
        );
    }
    
    if (emailResult.success) {
      return NextResponse.json(
        { success: true, message: "Email sent successfully" },
        { status: 200 }
      );
    } else {
      console.error("Email sending failed:", emailResult.error);
      return NextResponse.json(
        { success: false, message: "Failed to send email" },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error("Error in email API:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 }
    );
  }
}