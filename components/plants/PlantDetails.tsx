import Link from "next/link";
import ReactMarkdown from "react-markdown";

type PlantDetailsProps = {
    plant: {
        name: string;
        scientificName?: string;
        description?: string;
        detailedDescription?: string;
        mainImage?: string;
        category?: string;
        region?: string;
        medicinalProperties?: string[];
        cultivationTips?: string[];
        traditionalUses?: string[];
        conservationStatus?: string;
        [key: string]: unknown;
    };
};

export default function PlantDetails({ plant }: PlantDetailsProps) {
    return (
        <section className="py-16 bg-[var(--color-home)]">
            <div className="max-w-5xl mx-auto px-4">
                
                {/* Quick Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {plant.scientificName && (
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-[var(--color-card-stroke-primary)]">
                            <p className="text-sm text-[var(--color-text-secondary)] mb-2 font-medium">Scientific Name</p>
                            <p className="text-[var(--color-text-primary)] italic">{plant.scientificName}</p>
                        </div>
                    )}
                    
                    {plant.category && (
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-[var(--color-card-stroke-primary)]">
                            <p className="text-sm text-[var(--color-text-secondary)] mb-2 font-medium">Category</p>
                            <p className="text-[var(--color-text-primary)] capitalize">{plant.category}</p>
                        </div>
                    )}
                    
                    {plant.region && (
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-[var(--color-card-stroke-primary)]">
                            <p className="text-sm text-[var(--color-text-secondary)] mb-2 font-medium">Region</p>
                            <p className="text-[var(--color-text-primary)]">{plant.region}</p>
                        </div>
                    )}
                </div>

                {/* Detailed Description */}
                {plant.detailedDescription && (
                    <div className="bg-white rounded-lg p-10 shadow-sm border border-[var(--color-card-stroke-primary)] mb-8">
                        <h2 className="section-title-large mb-6">About This Plant</h2>
                        <div className="prose prose-lg max-w-none body-text-primary">
                            <ReactMarkdown>{plant.detailedDescription}</ReactMarkdown>
                        </div>
                    </div>
                )}

                {/* Medicinal Properties */}
                {plant.medicinalProperties && plant.medicinalProperties.length > 0 && (
                    <div className="bg-white rounded-lg p-10 shadow-sm border border-[var(--color-card-stroke-primary)] mb-8">
                        <h2 className="section-title-large mb-6">Medicinal Properties</h2>
                        <ul className="space-y-3">
                            {plant.medicinalProperties.map((property, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-[var(--color-bg-accent)] mr-3 text-xl">•</span>
                                    <span className="body-text-primary">{property}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Traditional Uses */}
                {plant.traditionalUses && plant.traditionalUses.length > 0 && (
                    <div className="bg-white rounded-lg p-10 shadow-sm border border-[var(--color-card-stroke-primary)] mb-8">
                        <h2 className="section-title-large mb-6">Traditional Uses</h2>
                        <ul className="space-y-3">
                            {plant.traditionalUses.map((use, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-[var(--color-bg-accent)] mr-3 text-xl">•</span>
                                    <span className="body-text-primary">{use}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Cultivation Tips */}
                {plant.cultivationTips && plant.cultivationTips.length > 0 && (
                    <div className="bg-white rounded-lg p-10 shadow-sm border border-[var(--color-card-stroke-primary)] mb-8">
                        <h2 className="section-title-large mb-6">Cultivation Guide</h2>
                        <ul className="space-y-3">
                            {plant.cultivationTips.map((tip, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-[var(--color-bg-accent)] mr-3 text-xl">•</span>
                                    <span className="body-text-primary">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Conservation Status */}
                {plant.conservationStatus && (
                    <div className="bg-white rounded-lg p-10 shadow-sm border border-[var(--color-card-stroke-primary)] mb-8">
                        <h2 className="section-title-large mb-6">Conservation Status</h2>
                        <p className="body-text-primary">{plant.conservationStatus}</p>
                    </div>
                )}

                {/* Call to Action */}
                <div className="bg-white rounded-lg p-10 shadow-sm border border-[var(--color-card-stroke-primary)] text-center">
                    <h3 className="section-title mb-4">Share Your Knowledge</h3>
                    <p className="body-text-secondary mb-6 max-w-2xl mx-auto">
                        Have additional information about {plant.name}? Help us preserve plant knowledge by becoming a contributor.
                    </p>
                    <Link
                        href="/user/request-editor"
                        className="button-primary inline-block"
                    >
                        Request Editor Access
                    </Link>
                </div>
            </div>
        </section>
    );
}