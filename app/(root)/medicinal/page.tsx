import { client } from "@/sanity/lib/client";
import { PLANTS_QUERY } from "@/sanity/lib/queries";
import PlantCard from "@/components/plants/PlantCard";
import Link from "next/link";
import Image from "next/image";
import { withSanityErrorHandling } from "@/sanity/env";
import { getFallbackPlants } from "@/utils/sanity-connection";
import { GiMedicines } from "react-icons/gi";

export default async function MedicinalPage() {
    // Fetch plants that have medicinal properties with error handling
    const allPlants = await withSanityErrorHandling(
        async () => await client.fetch(PLANTS_QUERY),
        getFallbackPlants()
    );

    const medicinalPlants = allPlants.filter((plant: any) =>
        plant.medicinalProperties && plant.medicinalProperties.length > 0
    );

    return (
        <div className="bg-[var(--color-home)] min-h-screen">
            {/* Hero Section */}
            <section className="relative py-16 bg-[var(--color-bg-card)] border-b border-[var(--color-card-stroke-primary)]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero1.webp"
                        alt="Medicinal plants of Western Ghats"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
                </div>
                <div className="section_container relative z-20">
                    <div className="text-center mb-8">
                        <h1 className="title-primary mb-4 text-white">Medicinal Uses</h1>
                        <p className="body-text-secondary max-w-3xl mx-auto text-white">
                            Explore the traditional medicinal applications of plants from the Western Ghats,
                            a knowledge system preserved through generations of indigenous wisdom.
                        </p>
                    </div>
                </div>
            </section>

            {/* Medicinal Info Section */}
            <section className="py-16">
                <div className="section_container">
                    <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                        <div className="w-full md:w-1/2">
                            <h2 className="title-secondary mb-4">Traditional Healing Wisdom</h2>
                            <p className="body-text-secondary mb-4">
                                For centuries, the indigenous communities of the Western Ghats have utilized the rich plant biodiversity for treating various ailments. This traditional knowledge has been passed down through generations and forms an essential part of local healthcare systems.
                            </p>
                            <p className="body-text-secondary">
                                The plants found in this region contain numerous bioactive compounds with proven therapeutic effects. From relieving common conditions like coughs and fevers to managing chronic ailments, these plants offer natural remedies with minimal side effects when used appropriately.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 relative h-[300px] rounded-lg overflow-hidden border-2 border-[var(--color-card-stroke-primary)]">
                            <Image
                                src="/hero7.webp"
                                alt="Traditional medicinal plants"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    </div>

                    {/* Plants with Medicinal Properties */}
                    <h2 className="title-secondary mb-6">Plants with Medicinal Properties</h2>

                    {medicinalPlants.length === 0 ? (
                        <div className="bg-white rounded-lg border border-[var(--color-card-stroke-primary)] p-8 text-center">
                            <GiMedicines size={48} className="text-[var(--color-bg-accent)] mx-auto mb-4" />
                            <h3 className="title-sm mb-2">No Medicinal Plants Found</h3>
                            <p className="body-text-secondary max-w-sm mx-auto mb-6">
                                Our collection of medicinal plants is growing. Be the first to add a plant with medicinal properties to our database!
                            </p>
                            <Link
                                href="/plant/create"
                                className="submit_button inline-block max-w-fit px-6 py-2"
                            >
                                Add a Medicinal Plant
                            </Link>
                        </div>
                    ) : (
                        <div className="card_grid">
                            {medicinalPlants.map((plant: any) => (
                                <PlantCard key={plant._id} plant={plant} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Disclaimer Section */}
            <section className="py-8 bg-red-50">
                <div className="section_container">
                    <div className="border-l-4 border-red-500 pl-4 py-2">
                        <h3 className="title-sm text-red-700 mb-2">Medical Disclaimer</h3>
                        <p className="body-text-secondary text-red-700">
                            The medicinal information provided on this website is for educational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions you may have regarding a medical condition.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}