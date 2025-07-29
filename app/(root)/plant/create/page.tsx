import CreatePlantForm from "@/components/forms/CreatePlantForm";
import CreatePlantHero from "@/components/plants/CreatePlantHero";
import { Suspense } from "react";

export default function CreatePlantPage() {
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