/**
 * Email templates for role-related notifications
 */

/**
 * Generate HTML email for editor role approval
 */
export function generateEditorApprovalEmail(username: string, siteName: string = 'Sanjeevini') {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .footer { font-size: 12px; color: #777; text-align: center; margin-top: 20px; }
        .button { background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${siteName}</h1>
        </div>
        <div class="content">
          <h2>Your Editor Request Has Been Approved!</h2>
          <p>Hello ${username},</p>
          <p>Great news! Your request to become an Editor on ${siteName} has been approved.</p>
          <p>As an Editor, you now have the ability to:</p>
          <ul>
            <li>Create new plant entries</li>
            <li>Edit existing plant information</li>
            <li>Contribute valuable content to our botanical knowledge base</li>
          </ul>
          <p>We're excited to see your contributions to our community!</p>
          <p><a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://sanjeevini.app'}/plant/create" class="button">Start Creating Now</a></p>
          <p>Thank you for your interest and dedication to ${siteName}.</p>
          <p>Best regards,<br>The ${siteName} Team</p>
        </div>
        <div class="footer">
          <p>This is an automated message, please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    Your Editor Request Has Been Approved!
    
    Hello ${username},
    
    Great news! Your request to become an Editor on ${siteName} has been approved.
    
    As an Editor, you now have the ability to:
    - Create new plant entries
    - Edit existing plant information
    - Contribute valuable content to our botanical knowledge base
    
    We're excited to see your contributions to our community!
    
    Visit ${process.env.NEXT_PUBLIC_BASE_URL || 'https://sanjeevini.app'}/plant/create to start creating now.
    
    Thank you for your interest and dedication to ${siteName}.
    
    Best regards,
    The ${siteName} Team
    
    This is an automated message, please do not reply to this email.
  `;

  return { html, text };
}

/**
 * Generate HTML email for editor role rejection
 */
export function generateEditorRejectionEmail(username: string, siteName: string = 'Sanjeevini') {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #3b82f6; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .footer { font-size: 12px; color: #777; text-align: center; margin-top: 20px; }
        .button { background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${siteName}</h1>
        </div>
        <div class="content">
          <h2>Update on Your Editor Request</h2>
          <p>Hello ${username},</p>
          <p>Thank you for your interest in becoming an Editor on ${siteName}.</p>
          <p>After careful consideration, we are unable to approve your editor request at this time. This could be due to various factors including:</p>
          <ul>
            <li>Limited editor positions available</li>
            <li>Need for additional contributions or participation</li>
            <li>Specific expertise requirements for current editorial needs</li>
          </ul>
          <p>We encourage you to continue participating in our community as a valued member. You're welcome to apply again in the future as you build more experience with our platform.</p>
          <p><a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://sanjeevini.app'}/plants" class="button">Explore Plants</a></p>
          <p>Thank you for your understanding.</p>
          <p>Best regards,<br>The ${siteName} Team</p>
        </div>
        <div class="footer">
          <p>This is an automated message, please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    Update on Your Editor Request
    
    Hello ${username},
    
    Thank you for your interest in becoming an Editor on ${siteName}.
    
    After careful consideration, we are unable to approve your editor request at this time. This could be due to various factors including:
    - Limited editor positions available
    - Need for additional contributions or participation
    - Specific expertise requirements for current editorial needs
    
    We encourage you to continue participating in our community as a valued member. You're welcome to apply again in the future as you build more experience with our platform.
    
    Visit ${process.env.NEXT_PUBLIC_BASE_URL || 'https://sanjeevini.app'}/plants to continue exploring our collection.
    
    Thank you for your understanding.
    
    Best regards,
    The ${siteName} Team
    
    This is an automated message, please do not reply to this email.
  `;

  return { html, text };
}

/**
 * Generate HTML email for editor request receipt
 */
export function generateEditorRequestEmail(username: string, siteName: string = 'Sanjeevini') {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f59e0b; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .footer { font-size: 12px; color: #777; text-align: center; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${siteName}</h1>
        </div>
        <div class="content">
          <h2>Editor Request Received</h2>
          <p>Hello ${username},</p>
          <p>We've received your request to become an Editor on ${siteName}. Thank you for your interest in contributing to our botanical knowledge base!</p>
          <p>Our admin team will review your request, and you'll receive a notification once a decision has been made.</p>
          <p>In the meantime, you can continue to explore and engage with our existing content.</p>
          <p>Thank you for your patience and interest in ${siteName}.</p>
          <p>Best regards,<br>The ${siteName} Team</p>
        </div>
        <div class="footer">
          <p>This is an automated message, please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    Editor Request Received
    
    Hello ${username},
    
    We've received your request to become an Editor on ${siteName}. Thank you for your interest in contributing to our botanical knowledge base!
    
    Our admin team will review your request, and you'll receive a notification once a decision has been made.
    
    In the meantime, you can continue to explore and engage with our existing content.
    
    Thank you for your patience and interest in ${siteName}.
    
    Best regards,
    The ${siteName} Team
    
    This is an automated message, please do not reply to this email.
  `;

  return { html, text };
}