import Link from "next/link";
import Image from "next/image";

export default function TermsPage() {
    return (
        <div className="bg-[var(--color-home)] min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full min-h-[400px] flex flex-col items-center justify-center text-white overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero2.webp"
                        alt="Terms backdrop"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col items-center px-4 py-16 text-center max-w-4xl mx-auto">
                    <div className="badge-secondary mb-8">
                        LEGAL
                    </div>

                    <h1 className="heading text-white mb-5 tracking-tight uppercase">
                        Terms of Service
                    </h1>

                    <p className="body-text-white mb-10 max-w-2xl text-lg">
                        Last updated: October 29, 2025
                    </p>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="bg-[var(--color-home)] py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
                        <div className="prose max-w-none space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">About This Project</h2>
                                <p className="body-text-primary text-base">
                                    Sanjeevini is a non-commercial, educational hobby project created to document
                                    plant species in the Western Ghats region. By using this platform, you agree
                                    to these terms of service.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">Use of the Platform</h2>
                                <p className="body-text-primary text-base mb-4">
                                    You may use Sanjeevini to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-primary)]">
                                    <li>Browse and learn about plant species</li>
                                    <li>Create an account to save your preferences</li>
                                    <li>Apply to become a contributor/editor</li>
                                    <li>Submit plant information (if approved as an editor)</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">Content Guidelines</h2>
                                <p className="body-text-primary text-base mb-4">
                                    If you contribute content, you agree to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-primary)]">
                                    <li>Provide accurate and factual information about plants</li>
                                    <li>Only upload images you have the right to use</li>
                                    <li>Not submit misleading, harmful, or inappropriate content</li>
                                    <li>Respect the educational purpose of this platform</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">Disclaimer</h2>
                                <p className="body-text-primary text-base">
                                    This platform is provided "as is" for educational purposes only. While we strive
                                    for accuracy, we cannot guarantee that all plant information is complete or error-free.
                                    Always consult professional sources before using any plant for medicinal or consumption purposes.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">Intellectual Property</h2>
                                <p className="body-text-primary text-base">
                                    Content you contribute to Sanjeevini is made available for educational purposes.
                                    By submitting content, you grant us permission to display and share it on the platform
                                    for educational and documentation purposes.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">Account Termination</h2>
                                <p className="body-text-primary text-base">
                                    We reserve the right to suspend or terminate accounts that violate these terms
                                    or misuse the platform.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">Changes to Terms</h2>
                                <p className="body-text-primary text-base">
                                    We may update these terms as the project evolves. Continued use of the platform
                                    after changes constitutes acceptance of the updated terms.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">Contact</h2>
                                <p className="body-text-primary text-base">
                                    Questions about these terms? Please{" "}
                                    <Link href="/contact" className="text-[var(--color-primary)] hover:underline">
                                        contact us
                                    </Link>.
                                </p>
                            </div>

                            <div className="text-center mt-12 pt-8 border-t border-gray-200">
                                <Link
                                    href="/"
                                    className="button-primary"
                                >
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
