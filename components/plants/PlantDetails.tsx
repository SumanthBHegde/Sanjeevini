import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { auth } from "@/auth";

type PlantDetailsProps = {
    plant: {
        _id: string;
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
        slug?: { current: string };
        [key: string]: unknown;
    };
};

export default async function PlantDetails({ plant }: PlantDetailsProps) {
    const session = await auth();
    const canEdit = session?.user && (session.user.role === 'admin' || session.user.role === 'editor');

    return (
        <section className="py-16 bg-[var(--color-home)]">
            <div className="max-w-5xl mx-auto px-4">

                {/* Edit Button for Editors/Admins */}
                {canEdit && plant.slug?.current && (
                    <div className="mb-6 flex justify-end">
                        <Link
                            href={`/plant/${plant.slug.current}/edit`}
                            className="bg-[var(--color-bg-accent)] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium inline-flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Edit Plant
                        </Link>
                    </div>
                )}

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
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-10 shadow-sm border-2 border-green-200 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-bg-accent)] rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Contribute Your Knowledge</h3>
                    <p className="body-text-secondary mb-6 max-w-2xl mx-auto text-gray-700">
                        Have additional information about {plant.name}? Join our community of plant experts and help preserve valuable botanical knowledge.
                    </p>
                    <Link
                        href="/user/request-editor"
                        className="inline-flex items-center gap-2 bg-[var(--color-bg-accent)] text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold shadow-md hover:shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <line x1="19" y1="8" x2="19" y2="14" />
                            <line x1="22" y1="11" x2="16" y2="11" />
                        </svg>
                        Become a Contributor
                    </Link>
                </div>
            </div>
        </section>
    );
}