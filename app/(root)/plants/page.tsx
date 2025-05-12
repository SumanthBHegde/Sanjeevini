import { client } from "@/sanity/lib/client";
import { PLANTS_QUERY } from "@/sanity/lib/queries";
import PlantCard from "@/components/plants/PlantCard";
import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import { withSanityErrorHandling } from "@/sanity/env";
import { getFallbackPlants, testSanityConnection } from "@/utils/sanity-connection";
import Image from "next/image";
import { FileText } from "lucide-react";

export default async function PlantsPage({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const query = searchParams?.query || "";
    const queryString = typeof query === "string" ? query : query[0] || "";

    // Test connection before fetching
    const connectionTest = await testSanityConnection();

    // Fetch plants with error handling and fallback
    let plants = [];

    if (connectionTest.success) {
        plants = await withSanityErrorHandling(
            async () => await client.fetch(PLANTS_QUERY),
            getFallbackPlants()
        );
    } else {
        console.warn("Using fallback plant data due to Sanity connection issues");
        plants = getFallbackPlants();
    }

    // Filter plants by search query if provided
    const filteredPlants = queryString
        ? plants.filter((plant: any) =>
            plant.name?.toLowerCase().includes(queryString.toLowerCase()) ||
            plant.scientificName?.toLowerCase().includes(queryString.toLowerCase()) ||
            plant.description?.toLowerCase().includes(queryString.toLowerCase())
        )
        : plants;

    return (
        <div className="bg-[var(--color-home)] min-h-screen">
            {/* Hero Section */}
            <section className="relative py-16 bg-[var(--color-bg-card)] border-b border-[var(--color-card-stroke-primary)]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero4.webp"
                        alt="Medicinal plants hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>
                </div>
                <div className="section_container relative z-20">
                    <div className="text-center mb-8">
                        <h1 className="title-primary mb-4 text-white">Explore Medicinal Plants</h1>
                        <p className="body-text-secondary max-w-3xl mx-auto text-white">
                            Discover the rich biodiversity of medicinal plants from the Western Ghats,
                            learn about their traditional uses, and contribute to preserving this ancient knowledge.
                        </p>
                    </div>

                    <SearchForm query={queryString} />
                </div>
            </section>

            {/* Plants Grid */}
            <section className="py-16">
                <div className="section_container">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="title-secondary">
                            {filteredPlants.length === 0
                                ? "No plants found"
                                : queryString
                                    ? `Search Results: ${filteredPlants.length} plant${filteredPlants.length === 1 ? '' : 's'} found`
                                    : "All Plants"
                            }
                        </h2>
                        <Link
                            href="/plant/create"
                            className="bg-[var(--color-bg-accent)] text-[var(--color-text-on-accent)] px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors text-sm font-medium"
                        >
                            Add New Plant
                        </Link>
                    </div>

                    {filteredPlants.length === 0 ? (
                        <div className="bg-white rounded-lg border border-[var(--color-card-stroke-primary)] p-8 text-center">
                            <FileText size={48} className="text-[var(--color-bg-accent)] mx-auto mb-4" />
                            <h3 className="title-sm mb-2">
                                {queryString ? "No plants match your search" : "No plants added yet"}
                            </h3>
                            <p className="body-text-secondary max-w-sm mx-auto mb-6">
                                {queryString
                                    ? "Try a different search term or browse all plants in our collection."
                                    : "Be the first to add a medicinal plant to our growing database!"
                                }
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                {queryString && (
                                    <Link
                                        href="/plants"
                                        className="inline-block px-6 py-2 border border-[var(--color-bg-accent)] text-[var(--color-bg-accent)] rounded-lg hover:bg-[var(--color-bg-card)] transition-colors"
                                    >
                                        View all plants
                                    </Link>
                                )}
                                <Link
                                    href="/plant/create"
                                    className="submit_button inline-block max-w-fit px-6 py-2"
                                >
                                    Add a new plant
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="card_grid">
                            {filteredPlants.map((plant: any) => (
                                <PlantCard key={plant._id} plant={plant} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}