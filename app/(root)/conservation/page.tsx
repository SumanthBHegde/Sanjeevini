import Link from "next/link";
import Image from "next/image";

export default function ConservationPage() {
    return (
        <div className="bg-[var(--color-home)] min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full min-h-[500px] flex flex-col items-center justify-center text-white overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero2.webp"
                        alt="Conservation backdrop"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col items-center px-4 py-16 text-center max-w-4xl mx-auto">
                    <div className="badge-secondary mb-8">
                        CONSERVATION
                    </div>

                    <h1 className="heading text-white mb-5 tracking-tight uppercase">
                        Plant Conservation
                    </h1>

                    <p className="body-text-white mb-10 max-w-2xl text-lg">
                        Learn about conservation efforts for protecting plant biodiversity in the Western Ghats
                    </p>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="bg-[var(--color-home)] py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
                        <h2 className="section-title-large text-2xl font-bold mb-6 text-center">
                            Conservation Initiatives
                        </h2>

                        <div className="prose max-w-none">
                            <p className="body-text-primary text-base text-center mb-8">
                                This section will highlight conservation programs, endangered species, and
                                efforts to preserve the unique plant biodiversity of the Western Ghats ecosystem.
                            </p>

                            <div className="text-center mt-12">
                                <Link
                                    href="/plants"
                                    className="button-primary"
                                >
                                    Explore Plant Species
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
