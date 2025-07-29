"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Author } from "@/sanity/types"; // Import the Author type

// Define the types for editor requests
interface EditorRequest extends Author {
    editorRequestReason?: string;
    editorRequestDate?: string;
}

function EditorRequestsContent() {
    const { data: session } = useSession();
    const router = useRouter();
    const [requests, setRequests] = useState<EditorRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [processingId, setProcessingId] = useState<string | null>(null);

    // Check if user is admin
    const isAdmin = session?.user?.role === 'admin' || session?.user?.isAdmin === true;

    useEffect(() => {
        // Redirect if not logged in or not an admin
        if (session && !isAdmin) {
            router.push('/');
            return;
        }

        if (isAdmin) {
            fetchEditorRequests();
        }
    }, [session, isAdmin, router]);

    const fetchEditorRequests = async () => {
        try {
            const pendingRequests = await client.fetch<EditorRequest[]>(`
        *[_type == "author" && pendingEditorRequest == true] {
          _id,
          name,
          email,
          username,
          image,
          expertise,
          bio,
          editorRequestReason,
          editorRequestDate,
          createdAt
        } | order(editorRequestDate desc)
      `);

            setRequests(pendingRequests);
        } catch (err) {
            console.error("Error fetching editor requests:", err);
            setError("Failed to load editor requests");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (userId: string) => {
        setProcessingId(userId);
        try {
            // Find the user to get their email and name
            const user = requests.find(req => req._id === userId);

            // Use the new API endpoint to approve the editor request
            const response = await fetch('/api/editor-actions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    action: 'approve',
                    email: user?.email,
                    name: user?.name || user?.username || 'User'
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to approve editor request");
            }

            // Update the local state to remove the approved request
            setRequests(prevRequests => prevRequests.filter(req => req._id !== userId));
        } catch (err) {
            console.error("Error approving editor request:", err);
            setError(err instanceof Error ? err.message : "Failed to approve editor request");
        } finally {
            setProcessingId(null);
        }
    };

    const handleReject = async (userId: string) => {
        setProcessingId(userId);
        try {
            // Find the user to get their email and name
            const user = requests.find(req => req._id === userId);

            // Use the new API endpoint to reject the editor request
            const response = await fetch('/api/editor-actions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    action: 'reject',
                    email: user?.email,
                    name: user?.name || user?.username || 'User'
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to reject editor request");
            }

            // Update the local state to remove the rejected request
            setRequests(prevRequests => prevRequests.filter(req => req._id !== userId));
        } catch (err) {
            console.error("Error rejecting editor request:", err);
            setError(err instanceof Error ? err.message : "Failed to reject editor request");
        } finally {
            setProcessingId(null);
        }
    };

    // If user is not logged in, show a message
    if (!session) {
        return (
            <div className="section_container py-10">
                <h1 className="heading-lg mb-4">Please Sign In</h1>
                <p className="body-lg mb-6">You need to be signed in as an administrator to view this page.</p>
                <Link href="/sign-in" className="btn-primary">
                    Sign In
                </Link>
            </div>
        );
    }

    // If user is not an admin, show access denied
    if (session && !isAdmin) {
        return (
            <div className="section_container py-10">
                <h1 className="heading-lg mb-4">Access Denied</h1>
                <p className="body-lg mb-6">You do not have permission to access this page.</p>
                <Link href="/" className="btn-primary">
                    Go Home
                </Link>
            </div>
        );
    }

    return (
        <div className="section_container py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="heading-lg">Editor Requests</h1>
                <div className="flex gap-3">
                    <button
                        onClick={async () => {
                            setLoading(true);
                            setError("");
                            try {
                                // First check for any users with pendingEditorRequest field
                                const allPendingUsers = await client.fetch(`
                                    *[_type == "author" && defined(pendingEditorRequest) && pendingEditorRequest == true] {
                                      _id, name, email, pendingEditorRequest, editorRequestReason
                                    }
                                `);

                                console.log("All users with pendingEditorRequest=true:", allPendingUsers);

                                if (allPendingUsers.length === 0) {
                                    // If none found, check all users to see if any have pending request fields
                                    const allUsers = await client.fetch(`
                                        *[_type == "author" && defined(editorRequestReason)] {
                                          _id, name, email, pendingEditorRequest, editorRequestReason
                                        }
                                    `);

                                    console.log("Users with editorRequestReason field:", allUsers);

                                    if (allUsers.length > 0 && allPendingUsers.length === 0) {
                                        setError("Found users with editor request reason but pendingEditorRequest is not set to true. Check console for details.");
                                    } else {
                                        setError("No editor requests found in the database. Check console for details.");
                                    }
                                } else {
                                    setRequests(allPendingUsers);
                                    setError("");
                                }

                                fetchEditorRequests();
                            } catch (err) {
                                console.error("Error during debug fetch:", err);
                                setError("Error during debug fetch. Check console for details.");
                            } finally {
                                setLoading(false);
                            }
                        }}
                        className="btn-outline flex items-center gap-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                        </svg>
                        Refresh & Debug
                    </button>
                    <Link href="/admin" className="btn-outline">
                        Back to Admin
                    </Link>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--color-bg-accent)]"></div>
                </div>
            ) : requests.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                    <p className="body-lg text-gray-600">No pending editor requests at this time.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {requests.map((request) => (
                        <div key={request._id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    {request.image ? (
                                        <Image
                                            src={request.image}
                                            alt={request.name || "User"}
                                            width={80}
                                            height={80}
                                            className="rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-bold">
                                            {request.name ? request.name[0].toUpperCase() : "U"}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <h2 className="heading-md mb-1">{request.name}</h2>
                                    <p className="text-gray-600 mb-2">{request.email}</p>

                                    {request.expertise && (
                                        <p className="mb-1"><span className="font-medium">Expertise:</span> {request.expertise}</p>
                                    )}

                                    {request.bio && (
                                        <p className="mb-2"><span className="font-medium">Bio:</span> {request.bio}</p>
                                    )}

                                    <div className="bg-amber-50 p-4 rounded-lg mb-4">
                                        <p className="font-medium mb-1">Why they want to be an editor:</p>
                                        <p className="text-gray-800">{request.editorRequestReason || "No reason provided"}</p>
                                    </div>

                                    <div className="text-sm text-gray-500 mb-4">
                                        Request submitted: {request.editorRequestDate
                                            ? new Date(request.editorRequestDate).toLocaleDateString()
                                            : "Unknown date"}
                                        {request.createdAt && (
                                            <span> • Joined: {new Date(request.createdAt).toLocaleDateString()}</span>
                                        )}
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleApprove(request._id)}
                                            disabled={processingId === request._id}
                                            className={`btn-primary ${processingId === request._id ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            {processingId === request._id ? 'Processing...' : 'Approve'}
                                        </button>
                                        <button
                                            onClick={() => handleReject(request._id)}
                                            disabled={processingId === request._id}
                                            className={`btn-outline text-red-600 hover:bg-red-50 ${processingId === request._id ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            {processingId === request._id ? 'Processing...' : 'Reject'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function EditorRequestsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditorRequestsContent />
        </Suspense>
    );
}