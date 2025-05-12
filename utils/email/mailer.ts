import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
  // For production, use SMTP settings
  if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  
  // For development, use ethereal.email (fake SMTP service)
  // This will log a URL in the console where you can view the email
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'ethereal.user@ethereal.email', // Replace with actual ethereal credentials
      pass: 'ethereal_password',
    },
  });
};

/**
 * Send an email notification
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - Email HTML content
 * @param {string} text - Email text content (fallback)
 * @returns {Promise<any>} - Nodemailer response
 */
export async function sendEmail({ to, subject, html, text }: { 
  to: string; 
  subject: string; 
  html: string; 
  text: string;
}) {
  try {
    const transporter = createTransporter();
    
    const info = await transporter.sendMail({
      from: `"Sanjeevini" <${process.env.SMTP_FROM || 'noreply@sanjeevini.app'}>`,
      to,
      subject,
      text,
      html,
    });
    
    console.log(`Email sent: ${info.messageId}`);
    
    // If using ethereal for development, log the URL to view the email
    if (info.messageId && !process.env.SMTP_HOST) {
      console.log(`View email preview at: ${nodemailer.getTestMessageUrl(info)}`);
    }
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}