import Link from "next/link";
import PlantCard from "@/components/plants/PlantCard";
import { PlantType } from "@/types/plants";
import { RiPlantLine } from "react-icons/ri";

type FeaturedPlantsProps = {
    plants: PlantType[];
    query?: string;
};

export default function FeaturedPlants({ plants, query }: FeaturedPlantsProps) {
    return (
        <section className="bg-[var(--color-home)] py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="section-title-large text-2xl font-bold mb-10 pl-2">
                    {query ? `Search results for "${query}"` : "Recommended plants"}
                </h2>

                {plants?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {plants.slice(0, 8).map((plant) => (
                            <PlantCard key={plant._id} plant={plant} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg border border-[var(--color-card-stroke-primary)] p-8 text-center">
                        <RiPlantLine size={48} className="text-[var(--color-bg-accent)] mx-auto mb-4" />
                        <h3 className="title-sm mb-2">No plants found</h3>
                        {query ? (
                            <p className="body-text-secondary max-w-sm mx-auto mb-6">
                                No plants match your search criteria. Try a different search term or browse all plants.
                            </p>
                        ) : (
                            <p className="body-text-secondary max-w-sm mx-auto mb-6">
                                Our database is growing! Be the first to add a medicinal plant to our collection.
                            </p>
                        )}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            {query && (
                                <Link
                                    href="/"
                                    className="btn-outline inline-block"
                                >
                                    View all plants
                                </Link>
                            )}
                            <Link
                                href="/plant/create"
                                className="btn-primary inline-block"
                            >
                                Add a new plant
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}