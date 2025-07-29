import Image from "next/image";
import Link from "next/link";

type PlantDetailsProps = {
    plant: {
        name: string;
        scientificName?: string;
        description?: string;
        uses?: string[];
        habitat?: string;
        gallery?: string[];
        cultivation?: string[];
        categories?: string[];
        [key: string]: unknown;
    };
};

export default function PlantDetails({ plant }: PlantDetailsProps) {
    const { name, scientificName, description, uses, habitat, gallery, cultivation } = plant;

    return (
        <section className="py-10">
            <div className="section_container">
                {/* Plant Header */}
                <div className="mb-10">
                    <h1 className="heading mb-3">{name}</h1>
                    <h2 className="sub-heading text-[var(--color-text-primary)] italic mb-6">{scientificName}</h2>

                    <div className="flex flex-wrap gap-3 mb-6">
                        {plant.categories?.map((category: string) => (
                            <span key={category} className="badge-primary">
                                {category}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Plant Image and Quick Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
                    <div className="col-span-1 lg:col-span-2">
                        <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-md">
                            <Image
                                src={gallery && gallery.length > 0 ? gallery[0] : "/sanjivini_hero.jpg"}
                                alt={name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 66vw"
                                priority
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="section-title mb-4">Quick Information</h3>

                        <div className="space-y-4">
                            <div>
                                <p className="ui-text-label mb-1">Common Name:</p>
                                <p className="body-text-primary">{name}</p>
                            </div>

                            <div>
                                <p className="ui-text-label mb-1">Scientific Name:</p>
                                <p className="body-text-primary italic">{scientificName}</p>
                            </div>

                            <div>
                                <p className="ui-text-label mb-1">Habitat:</p>
                                <p className="body-text-primary">{habitat || "Western Ghats"}</p>
                            </div>

                            <div>
                                <p className="ui-text-label mb-1">Categories:</p>
                                <div className="flex flex-wrap gap-2">
                                    {plant.categories?.map((category: string) => (
                                        <span key={category} className="badge-primary text-xs">
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Plant Description */}
                <div className="mb-16">
                    <h3 className="section-title-large mb-6">Description</h3>
                    <p className="body-text-primary mb-5">{description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                        {gallery && gallery.slice(1).map((image: string, index: number) => (
                            <div key={index} className="relative w-full h-[200px] rounded-lg overflow-hidden shadow-sm">
                                <Image
                                    src={image}
                                    alt={`${name} image ${index + 2}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Medicinal Uses */}
                {uses && (
                    <div className="mb-16 bg-white rounded-xl shadow-md p-8">
                        <h3 className="section-title-large mb-6">Medicinal Uses</h3>
                        <p className="body-text-primary">{uses}</p>
                    </div>
                )}

                {/* Cultivation */}
                {cultivation && (
                    <div className="mb-16">
                        <h3 className="section-title-large mb-6">Cultivation Information</h3>
                        <div className="bg-white rounded-xl shadow-md p-8">
                            <p className="body-text-primary">{cultivation}</p>
                        </div>
                    </div>
                )}

                {/* Conservations Status */}
                <div className="mb-16">
                    <h3 className="section-title-large mb-6">Conservation Status</h3>
                    <div className="bg-white rounded-xl shadow-md p-8">
                        <p className="body-text-primary mb-6">
                            Conservation information for this species is currently being compiled. Many plant species in the Western Ghats face conservation challenges due to habitat loss, climate change, and over-harvesting.
                        </p>
                        <p className="body-text-primary">
                            If you have specific information about the conservation status of this plant, please consider contributing to our database.
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-[var(--color-bg-card)] rounded-xl shadow-md p-8 text-center">
                    <h3 className="section-title-large mb-4">Share Your Knowledge</h3>
                    <p className="body-text-primary mb-6">
                        Do you have additional information about {name}? Help us improve our database by sharing your knowledge.
                    </p>
                    <Link
                        href="/sign-in"
                        className="btn-primary inline-block"
                    >
                        Contribute
                    </Link>
                </div>
            </div>
        </section>
    );
}