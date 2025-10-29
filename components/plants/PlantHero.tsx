import Image from "next/image";
import { PlantType } from "@/types/plants";

type PlantHeroProps = {
    plant: PlantType;
};

const PlantHero = ({ plant }: PlantHeroProps) => {
    // Format date - should always exist from creation
    const formattedDate = plant.publishedAt
        ? new Date(plant.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

    return (
        <section className="relative w-full h-[450px] flex flex-col items-center justify-end overflow-hidden">
            {/* Plant Image as Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={plant.mainImage || "/hero1.webp"}
                    alt={plant.name}
                    fill
                    className="object-cover brightness-[0.5]"
                    priority
                />
            </div>

            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-[1]"></div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-10">
                {/* Date */}
                <p className="text-sm text-white/90 mb-3">
                    Published: {formattedDate}
                </p>

                {/* Plant Name */}
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                    {plant.name}
                </h1>

                {/* Scientific Name */}
                {plant.scientificName && (
                    <p className="text-xl text-white/95 italic mb-4">
                        {plant.scientificName}
                    </p>
                )}

                {/* Description */}
                {plant.description && (
                    <p className="text-base text-white/90 max-w-3xl line-clamp-2">
                        {plant.description}
                    </p>
                )}
            </div>
        </section>
    );
};

export default PlantHero;