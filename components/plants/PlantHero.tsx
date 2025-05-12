import Image from "next/image";
import { PlantType } from "@/types/plants";

type PlantHeroProps = {
    plant: PlantType;
};

const PlantHero = ({ plant }: PlantHeroProps) => {
    const formattedDate = plant.publishedAt
        ? new Date(plant.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : "Unknown Date";

    return (
        <section className="relative w-full min-h-[300px] flex flex-col items-center justify-center text-white overflow-hidden">
            {/* Hero Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero7.webp"
                    alt="Plant species backdrop"
                    fill
                    className="object-cover brightness-[0.6]"
                    priority
                />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-12 text-center">
                {/* Date Badge */}
                <div className="badge-secondary mb-6 inline-block">
                    {formattedDate}
                </div>

                {/* Plant Name */}
                <h1 className="heading text-white mb-4">
                    {plant.name}
                </h1>

                {/* Scientific Name */}
                <p className="sub-heading text-[var(--color-text-secondary-accent)] mb-6 italic">
                    {plant.scientificName}
                </p>

                {/* Description */}
                <p className="body-text-white mb-8 max-w-3xl mx-auto">
                    {plant.description}
                </p>
            </div>
        </section>
    );
};

export default PlantHero;