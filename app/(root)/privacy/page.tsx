import Link from "next/link";
import Image from "next/image";

export default function PrivacyPage() {
    return (
        <div className="bg-[var(--color-home)] min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full min-h-[400px] flex flex-col items-center justify-center text-white overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero2.webp"
                        alt="Privacy backdrop"
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
                        Privacy Policy
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
                                <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">Introduction</h2>
                                <p className="body-text-primary text-base">
                                    Sanjeevini is a hobby project created by students of MES Arts and Science College, Sirsi,
                                    to document and share information about plant species in the Western Ghats region.
                                    This privacy policy explains how we handle information when you use our platform.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">Information We Collect</h2>
                                <p className="body-text-primary text-base mb-4">
                                    When you sign in using Google or GitHub, we collect:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-primary)]">
                                    <li>Your name and email address from your OAuth provider</li>
                                    <li>Your profile picture (if available)</li>
                                    <li>Basic account information from Google or GitHub</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">How We Use Your Information</h2>
                                <p className="body-text-primary text-base mb-4">
                                    We use the collected information to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-primary)]">
                                    <li>Provide you with access to the platform</li>
                                    <li>Allow you to contribute plant information (if you're an editor)</li>
                                    <li>Display your contributions and profile</li>
                                    <li>Manage user permissions and roles</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">Data Storage</h2>
                                <p className="body-text-primary text-base">
                                    Your data is stored securely using Sanity CMS. We do not sell or share your personal
                                    information with third parties. This is an educational, non-commercial project.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">Your Rights</h2>
                                <p className="body-text-primary text-base">
                                    You can request to view, update, or delete your account information at any time by
                                    contacting us through our social media channels.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">Contact</h2>
                                <p className="body-text-primary text-base">
                                    If you have any questions about this privacy policy, please{" "}
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
