import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="bg-[var(--color-home)] min-h-screen">
            {/* Hero Section with Dark Overlay - Matched to Home page styling */}
            <section className="relative w-full min-h-[500px] flex flex-col items-center justify-center text-white overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero2.webp"
                        alt="Western Ghats plants backdrop"
                        fill
                        className="object-cover "
                        priority
                    />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col items-center px-4 py-16 text-center max-w-4xl mx-auto">
                    {/* Badge - Matches the yellow banner in the Home page */}
                    <div className="badge-secondary mb-8">
                        LEARN ABOUT US
                    </div>

                    {/* Main Heading */}
                    <h1 className="heading text-white mb-5 tracking-tight uppercase">
                        About Sanjeevini
                    </h1>

                    {/* Subtitle */}
                    <p className="body-text-white mb-10 max-w-2xl text-lg">
                        Discover the team and mission behind our effort to document and preserve plant knowledge
                    </p>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="bg-[var(--color-home)] py-16">
                <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
                    {/* Mission Section - Styled to match Featured Plants on homepage */}
                    <h2 className="section-title-large text-2xl font-bold mb-10 text-center w-full">Our Mission</h2>

                    <div className="flex flex-col md:flex-row gap-10 items-center mb-16 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-8 w-full">
                        <div className="w-full md:w-1/2">
                            <p className="body-text-primary text-base mb-5">
                                The Sanjeevini project is an educational initiative founded by like-minded friends from MES Arts and Science College of Sirsi. Our mission is to document local plant varieties and create an accessible resource for plant enthusiasts, researchers, and the general public.
                            </p>
                            <p className="body-text-primary text-base">
                                Named after the mythical healing herb from Indian mythology, Sanjeevini serves as a bridge between traditional botanical knowledge and modern conservation efforts, aiming to preserve the rich heritage of medicinal plants from the Western Ghats.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 relative h-[300px] rounded-lg overflow-hidden shadow-sm border border-gray-200">
                            <Image
                                src="/hero5.webp"
                                alt="Western Ghats landscape"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    </div>

                    {/* Western Ghats Section */}
                    <h2 className="section-title-large text-2xl font-bold mb-10 text-center w-full">The Western Ghats: A Biodiversity Hotspot</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 w-full">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-8">
                            <h3 className="text-xl font-bold mb-4 text-[var(--color-bg-accent)] text-center">Remarkable Biodiversity</h3>
                            <p className="text-base text-gray-700 mb-4">
                                The Western Ghats, a UNESCO World Heritage site, is one of the world&apos;s eight &quot;hottest hotspots&quot; of biological diversity. Stretching along the western coast of India, this ancient mountain range is home to over 7,402 species of flowering plants, 1,814 species of non-flowering plants, 139 mammal species, 508 bird species, and countless other life forms.
                            </p>
                            <p className="text-base text-gray-700">
                                Remarkably, about 325 globally threatened species occur in the Western Ghats. The region shows exceptionally high levels of endemism with approximately 2,253 endemic plant species.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-8">
                            <h3 className="text-xl font-bold mb-4 text-[var(--color-bg-accent)] text-center">Medicinal Plant Treasury</h3>
                            <p className="text-base text-gray-700 mb-4">
                                The Western Ghats is a living pharmacy, with thousands of plant species possessing medicinal properties. This region has been the source of traditional medicine for millennia, with many plant species used in Ayurveda, Siddha, and folk medicine.
                            </p>
                            <p className="text-base text-gray-700">
                                Despite this wealth of knowledge, many of these plant species and their traditional uses remain undocumented or are at risk of being lost. Climate change, habitat destruction, and overexploitation threaten both the plants and the knowledge associated with them.
                            </p>
                        </div>
                    </div>

                    {/* What We Do Section */}
                    <h2 className="section-title-large text-2xl font-bold mb-10 text-center w-full">What We Do</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                            <div className="p-8 text-center">
                                <div className="p-4 mb-5 bg-[var(--color-bg-card)] rounded-full inline-flex mx-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-bg-accent)]">
                                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                        <path d="M9 2h6a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
                                        <path d="M12 11h4" />
                                        <path d="M12 16h4" />
                                        <path d="M8 11h.01" />
                                        <path d="M8 16h.01" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-[var(--color-text-primary)]">Documentation</h3>
                                <p className="text-base text-gray-700">
                                    We document traditional knowledge about medicinal plants, including their uses, preparation methods, and cultural significance, creating a comprehensive digital repository accessible to all.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                            <div className="p-8 text-center">
                                <div className="p-4 mb-5 bg-[var(--color-bg-card)] rounded-full inline-flex mx-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-bg-accent)]">
                                        <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
                                        <path d="M16.5 9.4 7.55 4.24" />
                                        <polyline points="3.29 7 12 12 20.71 7" />
                                        <line x1="12" x2="12" y1="22" y2="12" />
                                        <circle cx="18.5" cy="15.5" r="2.5" />
                                        <path d="M20.27 17.27 22 19" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-[var(--color-text-primary)]">Education</h3>
                                <p className="text-base text-gray-700">
                                    We develop educational resources about the medicinal plants of the Western Ghats, fostering awareness and encouraging sustainable practices among students and enthusiasts.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                            <div className="p-8 text-center">
                                <div className="p-4 mb-5 bg-[var(--color-bg-card)] rounded-full inline-flex mx-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-bg-accent)]">
                                        <circle cx="18" cy="18" r="3" />
                                        <circle cx="6" cy="6" r="3" />
                                        <path d="M6 21V9a9 9 0 0 0 9 9" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-[var(--color-text-primary)]">Community Collaboration</h3>
                                <p className="text-base text-gray-700">
                                    We collaborate with local communities, botanists, and students to gather knowledge and document plant species, creating a participatory model for conservation and education.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Our Team Section */}
                    <h2 className="section-title-large text-2xl font-bold mb-10 text-center w-full">Our Team</h2>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-8 mb-16 w-full">
                        <p className="text-base text-gray-700 mb-4 text-center">
                            The Sanjeevini project is maintained by a passionate group of friends from MES Arts and Science College of Sirsi, Karnataka. Our team brings together diverse expertise in botany, traditional medicine, conservation biology, and digital technology.
                        </p>
                        <p className="text-base text-gray-700 mb-4 text-center">
                            United by our shared love for the unique biodiversity of the Western Ghats and a commitment to preserving traditional knowledge, we work collaboratively to document and promote awareness about medicinal plants in this extraordinary region.
                        </p>
                        <p className="text-base text-gray-700 text-center">
                            We welcome contributions from fellow enthusiasts, researchers, and anyone interested in the preservation of botanical knowledge and biodiversity conservation.
                        </p>
                    </div>

                    {/* Call to Action Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-8 w-full">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="w-full md:w-2/3 pr-0 md:pr-8 text-center md:text-left">
                                <h2 className="text-xl font-bold mb-4 text-[var(--color-text-primary)]">Join Our Community</h2>
                                <p className="text-base text-gray-700 mb-6">
                                    Become part of our initiative to document and preserve the medicinal plant knowledge of the Western Ghats. Share your expertise, learn from others, and help build a valuable resource for future generations.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                    <Link
                                        href="/sign-in?isRegister=true"
                                        className="inline-block px-6 py-3 bg-[var(--color-bg-accent)] text-white text-base font-medium rounded-full text-center"
                                    >
                                        Register Now
                                    </Link>
                                    <Link
                                        href="/plants"
                                        className="inline-block px-6 py-3 border border-[var(--color-bg-accent)] text-[var(--color-bg-accent)] text-base font-medium rounded-full text-center"
                                    >
                                        Explore Plants
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden md:block w-1/3 relative h-[250px] mt-6 md:mt-0">
                                <Image
                                    src="/hero7.webp"
                                    alt="Western Ghats plants"
                                    fill
                                    className="object-cover rounded-lg"
                                    sizes="33vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}