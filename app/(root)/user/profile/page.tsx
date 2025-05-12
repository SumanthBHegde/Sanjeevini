"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileRedirectPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated" && session?.id) {
            router.push(`/user/${session.id}`);
        } else if (status === "unauthenticated") {
            router.push("/sign-in");
        }
    }, [status, session, router]);

    return (
        <div className="bg-[var(--color-home)] min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="title-primary mb-6">Loading Your Profile</h1>
                <div className="flex flex-col items-center gap-4">
                    <Skeleton className="h-12 w-48 bg-[var(--color-avatar-card-bg)]" />
                    <Skeleton className="h-48 w-48 rounded-full bg-[var(--color-avatar-card-bg)]" />
                    <Skeleton className="h-6 w-36 bg-[var(--color-avatar-card-bg)]" />
                    <Skeleton className="h-4 w-64 bg-[var(--color-avatar-card-bg)]" />
                    <div className="flex flex-wrap gap-2 justify-center">
                        <Skeleton className="h-32 w-64 rounded-lg bg-[var(--color-avatar-card-bg)]" />
                        <Skeleton className="h-32 w-64 rounded-lg bg-[var(--color-avatar-card-bg)]" />
                    </div>
                </div>
            </div>
        </div>
    );
}