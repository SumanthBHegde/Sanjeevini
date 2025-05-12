import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { PLANT_QUERY, SIMILAR_PLANTS_QUERY } from "@/sanity/lib/queries";
import PlantHero from "@/components/plants/PlantHero";
import PlantDetails from "@/components/plants/PlantDetails";
import SimilarPlants from "@/components/plants/SimilarPlants";

// Define types
type PlantPageProps = {
    params: { slug: string };
};

export default async function PlantPage({ params }: PlantPageProps) {
    try {
        // Fetch plant data from Sanity
        const slug = params.slug;
        const response = await sanityFetch({
            query: PLANT_QUERY,
            params: { slug },
        });

        const plant = response.data;

        if (!plant) {
            return notFound();
        }

        // Fetch similar plants
        const similarResponse = await sanityFetch({
            query: SIMILAR_PLANTS_QUERY,
            params: {
                category: plant.category,
                currentSlug: slug
            },
        });

        const similarPlants = similarResponse.data || [];

        return (
            <>
                <PlantHero plant={plant} />
                <PlantDetails plant={plant} />
                <SimilarPlants plants={similarPlants} />
            </>
        );
    } catch (error) {
        console.error("Error in Plant page:", error);
        return (
            <div className="p-10 text-center">
                <h1 className="text-2xl font-bold text-red-500">Something went wrong</h1>
                <p className="mt-4">We encountered an error while loading this plant information. Please try again.</p>
            </div>
        );
    }
}