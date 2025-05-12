import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '../../../../utils/email/mailer';

export async function testEmailConfig(email: string) {
  try {
    const result = await sendEmail({
      to: email,
      subject: 'Sanjeevini Email Setup Test',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h1 style="color: #4CAF50;">Sanjeevini Email Test</h1>
          <p>This is a test email to confirm your SMTP configuration is working correctly.</p>
          <p>If you're seeing this, your email system is properly configured!</p>
          <p>Timestamp: ${new Date().toISOString()}</p>
        </div>
      `,
      text: 'Sanjeevini Email Test: This is a test email to confirm your SMTP configuration is working correctly.'
    });
    
    console.log('Email test result:', result);
    return result;
  } catch (error) {
    console.error('Email test failed:', error);
    return { success: false, error };
  }
}

// Next.js App Router handlers
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email || 'your-email@example.com';
    
    const result = await testEmailConfig(email);
    
    return NextResponse.json(
      result,
      { status: result.success ? 200 : 500 }
    );
  } catch (error) {
    console.error('Error processing email test request:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to process request' } },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST to test email configuration' },
    { status: 405 }
  );
}