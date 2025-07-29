"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import UserPlants from "@/components/UserPlants";
import Link from "next/link";

function UserPlantsContent() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === "authenticated" && session?.id) {
            setIsLoading(false);
        } else if (status === "unauthenticated") {
            router.push("/sign-in");
        }
    }, [status, session, router]);

    if (isLoading) {
        return (
            <div className="bg-[var(--color-home)] min-h-screen py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="title-primary mb-6">Your Plants</h1>
                    <div className="flex flex-wrap gap-6">
                        {Array(3).fill(0).map((_, i) => (
                            <Skeleton key={i} className="h-64 w-full sm:w-80 rounded-lg bg-[var(--color-avatar-card-bg)]" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[var(--color-home)] min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="title-primary">Your Plants</h1>
                    <Link
                        href="/plant/create"
                        className="bg-[var(--color-bg-accent)] text-[var(--color-text-on-accent)] px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors font-medium"
                    >
                        Add New Plant
                    </Link>
                </div>

                {session?.id && (
                    <UserPlants id={session.id} showAddButton={true} />
                )}

                <div className="mt-10 text-center">
                    <Link
                        href="/user/profile"
                        className="inline-flex items-center text-[var(--color-bg-accent)] hover:underline gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        Back to Your Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function UserPlantsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserPlantsContent />
        </Suspense>
    );
}