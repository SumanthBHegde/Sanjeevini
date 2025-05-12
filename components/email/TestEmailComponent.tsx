'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from '@/hooks/use-toast';

export default function TestEmailComponent() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleTestEmail = async () => {
        if (!email || !email.includes('@')) {
            toast({
                title: 'Invalid email',
                description: 'Please enter a valid email address',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/email/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: 'Test email sent',
                    description: `Email successfully sent to ${email}`,
                    variant: 'default',
                });
            } else {
                toast({
                    title: 'Failed to send email',
                    description: data.error?.message || 'Something went wrong',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                title: 'Failed to send email',
                description: 'Check your SMTP configuration',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Test Email Configuration</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Send test email to:
                    </label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your-email@example.com"
                        className="w-full"
                    />
                </div>
                <Button
                    onClick={handleTestEmail}
                    disabled={isLoading}
                    className="w-full"
                >
                    {isLoading ? 'Sending...' : 'Send Test Email'}
                </Button>
            </div>
        </div>
    );
}