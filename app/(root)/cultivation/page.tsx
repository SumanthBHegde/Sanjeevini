import { client } from "@/sanity/lib/client";
import { PLANTS_QUERY } from "@/sanity/lib/queries";
import PlantCard from "@/components/plants/PlantCard";
import Link from "next/link";
import Image from "next/image";
import { withSanityErrorHandling } from "@/sanity/env";
import { getFallbackPlants } from "@/utils/sanity-connection";
import { IoWaterOutline } from "react-icons/io5";
import { FiSun, FiAlertOctagon } from "react-icons/fi";
import { RiPlantLine } from "react-icons/ri";
import { PlantType } from "@/types/plants";
import { TbShovel } from "react-icons/tb";

export default async function CultivationPage() {
    // Fetch plants with error handling and fallback
    const plants = await withSanityErrorHandling(
        async () => await client.fetch(PLANTS_QUERY),
        getFallbackPlants()
    );

    const cultivablePlants = plants.filter((plant: PlantType) =>
        plant.cultivationTips && plant.cultivationTips.length > 0
    );

    // Cultivation tips categories
    const cultivationTips = [
        {
            title: "Soil Preparation",
            description: "Most medicinal plants need well-draining soil rich in organic matter. Prepare the soil with compost and avoid waterlogging, which can lead to root rot.",
            icon: <TbShovel size={40} className="text-[var(--color-bg-accent)]" />
        },
        {
            title: "Watering Practices",
            description: "Different plants have different water requirements. Generally, water deeply but infrequently to encourage deep root growth and avoid overwatering.",
            icon: <IoWaterOutline size={40} className="text-[var(--color-bg-accent)]" />
        },
        {
            title: "Sunlight Requirements",
            description: "Most Western Ghats medicinal plants prefer partial shade to full sun. Monitor your plants and adjust their position if they show signs of light stress.",
            icon: <FiSun size={40} className="text-[var(--color-bg-accent)]" />
        },
        {
            title: "Natural Pest Control",
            description: "Use organic pest control methods such as neem oil, beneficial insects, and companion planting to protect your medicinal plants while keeping them free from harmful chemicals.",
            icon: <FiAlertOctagon size={40} className="text-[var(--color-bg-accent)]" />
        }
    ];

    return (
        <div className="bg-[var(--color-home)] min-h-screen">
            {/* Hero Section */}
            <section className="relative py-16 bg-[var(--color-bg-card)] border-b border-[var(--color-card-stroke-primary)]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero3.webp"
                        alt="Plant cultivation in Western Ghats"
                        fill
                        className="object-cover brightness-[0.6]"
                        priority
                    />
                </div>
                <div className="section_container relative z-20">
                    <div className="text-center mb-8">
                        <h1 className="title-primary mb-4 text-white">Cultivation Guides</h1>
                        <p className="body-text-secondary max-w-3xl mx-auto text-white">
                            Learn how to grow and care for medicinal plants from the Western Ghats.
                            Preserve traditional botanical knowledge through sustainable cultivation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Cultivation Tips Section */}
            <section className="py-16">
                <div className="section_container">
                    <h2 className="title-secondary mb-8">Essential Cultivation Tips</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {cultivationTips.map((tip, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 border border-[var(--color-card-stroke-primary)] hover:border-[var(--color-card-active-stroke)] transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-[var(--color-bg-card)] rounded-full">
                                        {tip.icon}
                                    </div>
                                    <div>
                                        <h3 className="title-sm mb-2">{tip.title}</h3>
                                        <p className="body-text-secondary">{tip.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 mb-16 p-6 bg-[var(--color-avatar-card-bg)] rounded-lg border border-[var(--color-avatar-card-stroke)]">
                        <h3 className="title-sm mb-4">Climate & Environmental Considerations</h3>
                        <p className="body-text-secondary mb-4">
                            The Western Ghats is characterized by tropical to subtropical climatic conditions with high rainfall and humidity. When cultivating native plants from this region, try to recreate similar conditions:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 body-text-secondary">
                            <li>Maintain moderate to high humidity levels</li>
                            <li>Protect plants from extreme temperatures</li>
                            <li>Provide dappled sunlight that mimics a forest canopy for understory plants</li>
                            <li>Use mulch to retain soil moisture and protect roots</li>
                            <li>Consider seasonal variations in your cultivation practices</li>
                        </ul>
                    </div>

                    {/* Plants with Cultivation Info */}
                    <h2 className="title-secondary mb-6">Plants with Cultivation Guides</h2>

                    {cultivablePlants.length === 0 ? (
                        <div className="bg-white rounded-lg border border-[var(--color-card-stroke-primary)] p-8 text-center">
                            <RiPlantLine size={48} className="text-[var(--color-bg-accent)] mx-auto mb-4" />
                            <h3 className="title-sm mb-2">No Cultivation Guides Yet</h3>
                            <p className="body-text-secondary max-w-sm mx-auto mb-6">
                                Our collection of cultivation guides is still growing. Add a plant with cultivation tips to help others learn sustainable growing practices!
                            </p>
                            <Link
                                href="/plant/create"
                                className="submit_button inline-block max-w-fit px-6 py-2"
                            >
                                Add Plant with Cultivation Tips
                            </Link>
                        </div>
                    ) : (
                        <div className="card_grid">
                            {cultivablePlants.map((plant: PlantType) => (
                                <PlantCard key={plant._id} plant={plant} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Community Section */}
            <section className="py-12 bg-[var(--color-bg-card)]">
                <div className="section_container">
                    <div className="text-center mb-8">
                        <h2 className="title-secondary mb-4">Join Our Cultivation Community</h2>
                        <p className="body-text-secondary max-w-3xl mx-auto">
                            Connect with other plant enthusiasts, share your cultivation experiences, and learn from fellow gardeners.
                        </p>
                        <Link
                            href="/sign-in?isRegister=true"
                            className="submit_button inline-block mt-6 px-6 py-3 max-w-xs"
                        >
                            Sign Up & Contribute
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}