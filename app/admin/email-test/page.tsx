import TestEmailComponent from "../../../components/email/TestEmailComponent";

export default function TestEmailPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6 text-center">SMTP Configuration Test</h1>
            <p className="text-center mb-6 max-w-lg mx-auto">
                This page allows you to test if your SMTP configuration is working properly.
                Enter your email address below and click the button to send a test email.
            </p>
            <TestEmailComponent />
        </div>
    );
}