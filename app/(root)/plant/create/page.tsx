import CreatePlantForm from "@/components/forms/CreatePlantForm";
import CreatePlantHero from "@/components/plants/CreatePlantHero";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default async function CreatePlantPage() {
    const session = await auth();
    
    // Check if user is logged in
    if (!session?.user) {
        redirect("/sign-in");
    }
    
    // Check if user has editor or admin role
    const canCreate = session.user.role === 'admin' || session.user.role === 'editor';
    
    if (!canCreate) {
        redirect("/");
    }
    
    return (
        <>
            <CreatePlantHero />
            <section className="bg-[var(--color-home)] py-12">
                <div className="max-w-2xl mx-auto px-4">
                    <Suspense fallback={<div>Loading...</div>}>
                        <CreatePlantForm />
                    </Suspense>
                </div>
            </section>
        </>
    );
}