import Link from "next/link";
import Image from "next/image";

export default function ContributorsPage() {
    return (
        <div className="bg-[var(--color-home)] min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full min-h-[500px] flex flex-col items-center justify-center text-white overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero2.webp"
                        alt="Contributors backdrop"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col items-center px-4 py-16 text-center max-w-4xl mx-auto">
                    <div className="badge-secondary mb-8">
                        COMMUNITY
                    </div>

                    <h1 className="heading text-white mb-5 tracking-tight uppercase">
                        Our Contributors
                    </h1>

                    <p className="body-text-white mb-10 max-w-2xl text-lg">
                        Meet the passionate individuals contributing to the Sanjeevini plant database
                    </p>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="bg-[var(--color-home)] py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
                        <h2 className="section-title-large text-2xl font-bold mb-6 text-center">
                            Community Contributors
                        </h2>

                        <div className="prose max-w-none">
                            <p className="body-text-primary text-base text-center mb-8">
                                This section will showcase our community of contributors, editors, and researchers
                                who help document and preserve plant knowledge.
                            </p>

                            <div className="text-center mt-12 space-x-4">
                                <Link
                                    href="/user/request-editor"
                                    className="button-primary"
                                >
                                    Become a Contributor
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
