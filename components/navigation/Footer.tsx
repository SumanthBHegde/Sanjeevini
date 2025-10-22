import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--color-bg-accent)] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

                    {/* Brand Section */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="mb-4">
                            <Link href="/" className="inline-block">
                                <Image
                                    src="/sanjeevini-favicon.png"
                                    alt="Sanjeevini"
                                    width={60}
                                    height={60}
                                    className="h-12 w-12 md:h-16 md:w-16 object-contain rounded-full"
                                />
                            </Link>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                            Sanjeevini
                        </h3>
                        <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xs">
                            Discover and learn about the rich plant biodiversity of the Western Ghats and their traditional uses.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2 md:space-y-2.5">
                            <li>
                                <Link
                                    href="/plants"
                                    className="text-white/80 hover:text-white text-sm md:text-base transition-colors duration-200 inline-block"
                                >
                                    All Plants
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/medicinal"
                                    className="text-white/80 hover:text-white text-sm md:text-base transition-colors duration-200 inline-block"
                                >
                                    Medicinal Uses
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cultivation"
                                    className="text-white/80 hover:text-white text-sm md:text-base transition-colors duration-200 inline-block"
                                >
                                    Cultivation Guide
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-white/80 hover:text-white text-sm md:text-base transition-colors duration-200 inline-block"
                                >
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">
                            Resources
                        </h4>
                        <ul className="space-y-2 md:space-y-2.5">
                            <li>
                                <Link
                                    href="/research"
                                    className="text-white/80 hover:text-white text-sm md:text-base transition-colors duration-200 inline-block"
                                >
                                    Research
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/conservation"
                                    className="text-white/80 hover:text-white text-sm md:text-base transition-colors duration-200 inline-block"
                                >
                                    Conservation
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contributors"
                                    className="text-white/80 hover:text-white text-sm md:text-base transition-colors duration-200 inline-block"
                                >
                                    Contributors
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-white/80 hover:text-white text-sm md:text-base transition-colors duration-200 inline-block"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Connect Section */}
                    <div>
                        <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">
                            Connect With Us
                        </h4>
                        <div className="flex gap-4 mb-6">
                            <Link
                                href="#"
                                className="text-white/80 hover:text-white hover:scale-110 transition-all duration-200"
                                aria-label="Facebook"
                            >
                                <FaFacebook size={24} />
                            </Link>
                            <Link
                                href="#"
                                className="text-white/80 hover:text-white hover:scale-110 transition-all duration-200"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={24} />
                            </Link>
                            <Link
                                href="#"
                                className="text-white/80 hover:text-white hover:scale-110 transition-all duration-200"
                                aria-label="Twitter"
                            >
                                <FaTwitter size={24} />
                            </Link>
                            <Link
                                href="#"
                                className="text-white/80 hover:text-white hover:scale-110 transition-all duration-200"
                                aria-label="GitHub"
                            >
                                <FaGithub size={24} />
                            </Link>
                        </div>

                        {/* Newsletter Signup - Optional */}
                        <div className="hidden md:block">
                            <p className="text-white/70 text-xs md:text-sm">
                                Stay updated with our latest discoveries
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/20">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-white/70 text-xs md:text-sm text-center sm:text-left">
                            © {currentYear} Sanjeevini. All rights reserved.
                        </p>

                        {/* Additional Links */}
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
                            <Link
                                href="/privacy"
                                className="text-white/70 hover:text-white transition-colors duration-200"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-white/70 hover:text-white transition-colors duration-200"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/sitemap"
                                className="text-white/70 hover:text-white transition-colors duration-200"
                            >
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}