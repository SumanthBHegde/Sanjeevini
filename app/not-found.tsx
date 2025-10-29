import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <section className="min-h-screen bg-[var(--color-home)] flex items-center justify-center px-5">
            <div className="section_container">
                <div className="flex flex-col items-center justify-center text-center space-y-8 py-20">
                    {/* Illustration or Icon */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-[120px] md:text-[180px] font-black text-[var(--color-bg-accent)] opacity-10">
                                404
                            </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl md:text-8xl">🌿</div>
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="space-y-4">
                        <h1 className="heading-lg">Page Not Found</h1>
                        <p className="body-lg text-[var(--color-text-body-secondary)] max-w-2xl mx-auto">
                            Oops! Looks like this plant has wandered off the beaten path.
                            The page you're looking for doesn't exist or has been moved.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
                        <Link
                            href="/"
                            className="px-8 py-4 bg-[var(--color-bg-accent)] text-[var(--color-text-on-accent)] rounded-full 
                       hover:bg-opacity-90 transition-all duration-200 nav-text font-semibold
                       border-2 border-[var(--color-card-stroke-primary)] shadow-md hover:shadow-lg"
                        >
                            Go Back Home
                        </Link>
                        <Link
                            href="/plants"
                            className="px-8 py-4 bg-white text-[var(--color-text-primary)] rounded-full 
                       hover:bg-[var(--color-bg-card)] transition-all duration-200 nav-text font-semibold
                       border-2 border-[var(--color-card-stroke-primary)] shadow-md hover:shadow-lg"
                        >
                            Browse Plants
                        </Link>
                    </div>

                    {/* Additional Links */}
                    <div className="pt-8">
                        <p className="body-text-secondary mb-4">
                            Or explore these helpful links:
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                href="/about"
                                className="text-[var(--color-bg-accent)] hover:underline body-text"
                            >
                                About Us
                            </Link>
                            <span className="text-[var(--color-divider-stroke)]">•</span>
                            <Link
                                href="/medicinal"
                                className="text-[var(--color-bg-accent)] hover:underline body-text"
                            >
                                Medicinal Plants
                            </Link>
                            <span className="text-[var(--color-divider-stroke)]">•</span>
                            <Link
                                href="/cultivation"
                                className="text-[var(--color-bg-accent)] hover:underline body-text"
                            >
                                Cultivation Tips
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
