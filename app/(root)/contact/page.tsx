import Link from "next/link";
import Image from "next/image";
import { FaEnvelope, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

export default function ContactPage() {
    return (
        <div className="bg-[var(--color-home)] min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full min-h-[500px] flex flex-col items-center justify-center text-white overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero2.webp"
                        alt="Contact backdrop"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col items-center px-4 py-16 text-center max-w-4xl mx-auto">
                    <div className="badge-secondary mb-8">
                        GET IN TOUCH
                    </div>

                    <h1 className="heading text-white mb-5 tracking-tight uppercase">
                        Contact Us
                    </h1>

                    <p className="body-text-white mb-10 max-w-2xl text-lg">
                        Have questions or want to contribute? We'd love to hear from you
                    </p>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="bg-[var(--color-home)] py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
                        <h2 className="section-title-large text-2xl font-bold mb-8 text-center">
                            Connect With Us
                        </h2>

                        <div className="space-y-8">
                            <div className="text-center">
                                <p className="body-text-primary text-base mb-6">
                                    For inquiries about the Sanjeevini project, plant contributions, or collaboration opportunities,
                                    please reach out through our social media channels.
                                </p>
                            </div>

                            {/* Social Links */}
                            <div className="flex justify-center gap-6 py-8">
                                <Link
                                    href="https://www.linkedin.com/in/sumanth-hegde-37805a2b9"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-all duration-200 hover:scale-110"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin size={24} />
                                </Link>
                                <Link
                                    href="https://www.instagram.com/sumanth_hutgar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-all duration-200 hover:scale-110"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram size={24} />
                                </Link>
                                <Link
                                    href="https://github.com/SumanthBHegde"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-all duration-200 hover:scale-110"
                                    aria-label="GitHub"
                                >
                                    <FaGithub size={24} />
                                </Link>
                            </div>

                            <div className="text-center mt-12 space-y-4">
                                <Link
                                    href="/about"
                                    className="button-primary inline-block"
                                >
                                    Learn More About Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
