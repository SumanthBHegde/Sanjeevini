"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

function AdminDashboardContent() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalPlants: 0,
        pendingEditorRequests: 0,
        pendingPlantApprovals: 0
    });
    const [loading, setLoading] = useState(true);

    // Check if user is admin
    const isAdmin = session?.user?.role === 'admin' || session?.user?.isAdmin === true;

    useEffect(() => {
        // Redirect if not logged in or not an admin
        if (status === "unauthenticated" || (status === "authenticated" && !isAdmin)) {
            router.push('/');
            return;
        }

        if (status === "authenticated" && isAdmin) {
            fetchDashboardStats();
        }
    }, [status, isAdmin, router]);

    const fetchDashboardStats = async () => {
        try {
            // Fetch dashboard statistics
            const [userCount, plantCount, editorRequestCount, pendingPlantCount] = await Promise.all([
                client.fetch(`count(*[_type == "author"])`),
                client.fetch(`count(*[_type == "plant"])`),
                client.fetch(`count(*[_type == "author" && pendingEditorRequest == true])`),
                client.fetch(`count(*[_type == "plant" && approved == false])`),
            ]);

            setStats({
                totalUsers: userCount,
                totalPlants: plantCount,
                pendingEditorRequests: editorRequestCount,
                pendingPlantApprovals: pendingPlantCount
            });
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
        } finally {
            setLoading(false);
        }
    };

    // Loading state
    if (status === "loading" || loading) {
        return (
            <div className="section_container py-10">
                <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-bg-accent)]"></div>
                </div>
            </div>
        );
    }

    // If user is not logged in, show a message
    if (status === "unauthenticated") {
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
    if (status === "authenticated" && !isAdmin) {
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
            <h1 className="heading-lg mb-8">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-sm font-medium text-gray-500 mb-1">Total Users</h2>
                    <p className="text-3xl font-bold text-[var(--color-bg-accent)]">{stats.totalUsers}</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-sm font-medium text-gray-500 mb-1">Total Plants</h2>
                    <p className="text-3xl font-bold text-[var(--color-bg-accent)]">{stats.totalPlants}</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-sm font-medium text-gray-500 mb-1">Pending Editor Requests</h2>
                    <p className="text-3xl font-bold text-amber-600">{stats.pendingEditorRequests}</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-sm font-medium text-gray-500 mb-1">Plants Pending Approval</h2>
                    <p className="text-3xl font-bold text-amber-600">{stats.pendingPlantApprovals}</p>
                </div>
            </div>

            {/* Admin Actions */}
            <h2 className="title-secondary mb-5">Admin Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/admin/editor-requests" className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h3 className="font-semibold mb-2">Manage Editor Requests</h3>
                        <p className="text-sm text-gray-600">Review and approve requests from users who want to become editors.</p>

                        {stats.pendingEditorRequests > 0 && (
                            <div className="mt-3 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                                {stats.pendingEditorRequests} pending request{stats.pendingEditorRequests !== 1 ? 's' : ''}
                            </div>
                        )}
                    </div>
                </Link>

                <Link href="/studio" className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                        </div>
                        <h3 className="font-semibold mb-2">Sanity Studio</h3>
                        <p className="text-sm text-gray-600">Access the full Sanity Studio interface to manage all content.</p>
                    </div>
                </Link>

                <Link href="/admin/email-test" className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <h3 className="font-semibold mb-2">Email Test</h3>
                        <p className="text-sm text-gray-600">Test the email notification system to ensure it&apos;s working properly.</p>
                    </div>
                </Link>
            </div>

            {/* Return to site button */}
            <div className="mt-10 flex justify-center">
                <Link href="/" className="btn-outline">
                    Return to Home
                </Link>
            </div>
        </div>
    );
}

export default function AdminDashboardPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminDashboardContent />
        </Suspense>
    );
}