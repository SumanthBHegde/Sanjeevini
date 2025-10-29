import { client } from "@/sanity/lib/client";
import { PLANTS_QUERY } from "@/sanity/lib/queries";
import PlantCard from "@/components/plants/PlantCard";
import Link from "next/link";
import Image from "next/image";
import { withSanityErrorHandling } from "@/sanity/env";
import { getFallbackPlants } from "@/utils/sanity-connection";
import { PlantType } from "@/types/plants";
import { notFound } from "next/navigation";

// Valid category slugs
const validCategories = ["medicinal", "culinary", "ornamental", "endangered"];

// Category metadata
const categoryInfo: Record<string, { title: string; description: string; heroImage: string }> = {
    medicinal: {
        title: "Medicinal Plants",
        description: "Explore plants with healing properties used in traditional medicine and modern therapeutics.",
        heroImage: "/hero1.webp"
    },
    culinary: {
        title: "Culinary Plants",
        description: "Discover edible plants and spices that add flavor and nutrition to our meals.",
        heroImage: "/hero2.webp"
    },
    ornamental: {
        title: "Ornamental Plants",
        description: "Browse decorative plants that beautify gardens and living spaces.",
        heroImage: "/hero3.webp"
    },
    endangered: {
        title: "Endangered Plants",
        description: "Learn about rare and threatened plant species that need our protection.",
        heroImage: "/hero4.webp"
    }
};

type CategoryPageProps = {
    params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;

    // Validate category
    if (!validCategories.includes(slug)) {
        notFound();
    }

    // Fetch all plants with error handling
    const allPlants = await withSanityErrorHandling(
        async () => await client.fetch(PLANTS_QUERY),
        getFallbackPlants()
    );

    // Filter plants by category
    const categoryPlants = allPlants.filter((plant: PlantType) =>
        plant.category?.toLowerCase() === slug.toLowerCase()
    );

    const info = categoryInfo[slug];

    return (
        <div className="bg-[var(--color-home)] min-h-screen">
            {/* Hero Section */}
            <section className="relative py-16 bg-[var(--color-bg-card)] border-b border-[var(--color-card-stroke-primary)]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={info.heroImage}
                        alt={info.title}
                        fill
                        className="object-cover brightness-[0.6]"
                        priority
                    />
                </div>
                <div className="section_container relative z-20">
                    <div className="text-center mb-8">
                        <h1 className="title-primary mb-4 text-white">{info.title}</h1>
                        <p className="body-text-secondary max-w-3xl mx-auto text-white">
                            {info.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Plants Section */}
            <section className="py-16">
                <div className="section_container">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="title-secondary">
                            {categoryPlants.length} {categoryPlants.length === 1 ? 'Plant' : 'Plants'} Found
                        </h2>
                        <Link
                            href="/plants"
                            className="text-[var(--color-bg-accent)] hover:underline text-sm font-medium"
                        >
                            View All Plants →
                        </Link>
                    </div>

                    {categoryPlants.length === 0 ? (
                        <div className="bg-white rounded-lg border border-[var(--color-card-stroke-primary)] p-8 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-bg-accent)] mx-auto mb-4">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                            <h3 className="title-sm mb-2">No {info.title} Yet</h3>
                            <p className="body-text-secondary max-w-sm mx-auto mb-6">
                                Be the first to add a plant in the {slug} category to our collection!
                            </p>
                            <Link
                                href="/plant/create"
                                className="submit_button inline-block max-w-fit px-6 py-2"
                            >
                                Add a Plant
                            </Link>
                        </div>
                    ) : (
                        <div className="card_grid">
                            {categoryPlants.map((plant: PlantType) => (
                                <PlantCard key={plant._id} plant={plant} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

// Generate static params for all valid categories
export async function generateStaticParams() {
    return validCategories.map((slug) => ({
        slug,
    }));
}
