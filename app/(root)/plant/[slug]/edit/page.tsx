import CreatePlantForm from "@/components/forms/CreatePlantForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { PLANT_QUERY } from "@/sanity/lib/queries";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

type EditPlantPageProps = {
    params: { slug: string };
};

export default async function EditPlantPage({ params }: EditPlantPageProps) {
    const session = await auth();

    // Check if user is logged in
    if (!session?.user) {
        redirect("/sign-in");
    }

    // Check if user has editor or admin role
    const canEdit = session.user.role === 'admin' || session.user.role === 'editor';

    if (!canEdit) {
        redirect("/");
    }

    // Fetch the plant data
    const plant = await client.fetch(PLANT_QUERY, { slug: params.slug });

    if (!plant) {
        redirect("/plants");
    }

    return (
        <>
            <section className="relative w-full min-h-[200px] flex flex-col items-center justify-center bg-[var(--color-bg-accent)] text-white">
                <div className="max-w-5xl mx-auto px-4 py-12 text-center">
                    <h1 className="text-4xl font-bold mb-3">Edit Plant</h1>
                    <p className="text-lg opacity-90">Update information for {plant.name}</p>
                </div>
            </section>

            <section className="bg-[var(--color-home)] py-12">
                <div className="max-w-2xl mx-auto px-4">
                    <Suspense fallback={<div>Loading...</div>}>
                        <CreatePlantForm plant={plant} isEditing={true} />
                    </Suspense>
                </div>
            </section>
        </>
    );
}
