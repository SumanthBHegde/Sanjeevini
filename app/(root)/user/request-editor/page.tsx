"use client";

import { useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function RequestEditorContent() {
    const { data: session, update } = useSession();
    const router = useRouter();
    const [reason, setReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Redirect if user is not logged in
    if (!session?.user) {
        return (
            <div className="section_container py-10">
                <h1 className="heading-lg mb-4">Please Sign In</h1>
                <p className="body-lg mb-6">You need to be signed in to request editor privileges.</p>
                <Link href="/sign-in" className="btn-primary">
                    Sign In
                </Link>
            </div>
        );
    }

    // If user is already an editor or admin
    if (session.user.role === 'editor' || session.user.role === 'admin' || session.user.isAdmin) {
        return (
            <div className="section_container py-10">
                <h1 className="heading-lg mb-4">You already have editor privileges</h1>
                <p className="body-lg mb-6">You already have the ability to create and edit content.</p>
                <Link href="/plant/create" className="btn-primary">
                    Create New Content
                </Link>
            </div>
        );
    }

    // If user has a pending request
    if (session.user.pendingEditorRequest) {
        return (
            <div className="section_container py-10">
                <h1 className="heading-lg mb-4">Request Pending</h1>
                <p className="body-lg mb-6">
                    Your request for editor privileges is pending approval. An administrator will review your request soon.
                </p>
                <Link href="/" className="btn-outline">
                    Return to Home
                </Link>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            // Use the new API endpoint instead of directly calling writeClient
            const response = await fetch('/api/editor-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reason }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to submit editor request");
            }

            // Update the session to reflect the change
            await update({
                ...session,
                user: {
                    ...session.user,
                    pendingEditorRequest: true
                }
            });

            // Send confirmation email to the user
            try {
                await fetch('/api/email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        type: 'editor_request',
                        recipient: session.user.email,
                        username: session.user.name || session.user.username || 'User',
                    }),
                });
            } catch (emailError) {
                console.error("Error sending confirmation email:", emailError);
                // Don't fail the whole request if email fails
            }

            setSuccess(true);

            // Redirect after a short delay
            setTimeout(() => {
                router.push('/');
            }, 3000);
        } catch (error: unknown) {
            console.error("Error submitting editor request:", error);
            setError(
                error instanceof Error
                    ? error.message
                    : "An error occurred while submitting your request. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="section_container py-10">
            <h1 className="heading-lg mb-4">Request Editor Privileges</h1>
            <p className="body-lg mb-6">
                As an editor, you&apos;ll be able to create and edit plant information on Sanjeevini.
                Please tell us why you&apos;d like to become an editor and what expertise you can bring.
            </p>

            {success ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-700">
                        Your request has been submitted successfully! An administrator will review your request soon.
                        You will be redirected in a moment...
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="max-w-xl">
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    <div className="mb-6">
                        <label htmlFor="reason" className="block mb-2 font-medium">
                            Why do you want to become an editor?
                        </label>
                        <textarea
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={5}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-bg-accent)] focus:border-[var(--color-bg-accent)] outline-none resize-none"
                            placeholder="Please describe your interest in plants and any relevant experience..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !reason.trim()}
                        className={`btn-primary ${(isSubmitting || !reason.trim()) ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                    </button>
                    <Link href="/" className="btn-outline ml-4">
                        Cancel
                    </Link>
                </form>
            )}
        </div>
    );
}

export default function RequestEditorPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RequestEditorContent />
        </Suspense>
    );
}