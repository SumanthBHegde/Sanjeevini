import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[var(--color-bg-accent)] text-white py-12 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="section-title-large text-white mb-4">Sanjeevini</h3>
                    <p className="body-text-white opacity-80 text-sm">
                        Discover and learn about the rich plant biodiversity of the Western Ghats and their traditional uses.
                    </p>
                </div>
                <div>
                    <h4 className="title-sm text-white mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><Link href="/plants" className="body-text-white opacity-80 hover:opacity-100 text-sm">All Plants</Link></li>
                        <li><Link href="/medicinal" className="body-text-white opacity-80 hover:opacity-100 text-sm">Medicinal Uses</Link></li>
                        <li><Link href="/cultivation" className="body-text-white opacity-80 hover:opacity-100 text-sm">Cultivation Guide</Link></li>
                        <li><Link href="/about" className="body-text-white opacity-80 hover:opacity-100 text-sm">About Us</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="title-sm text-white mb-4">Resources</h4>
                    <ul className="space-y-2">
                        <li><Link href="/research" className="body-text-white opacity-80 hover:opacity-100 text-sm">Research</Link></li>
                        <li><Link href="/conservation" className="body-text-white opacity-80 hover:opacity-100 text-sm">Conservation</Link></li>
                        <li><Link href="/contributors" className="body-text-white opacity-80 hover:opacity-100 text-sm">Contributors</Link></li>
                        <li><Link href="/contact" className="body-text-white opacity-80 hover:opacity-100 text-sm">Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="title-sm text-white mb-4">Connect With Us</h4>
                    <div className="flex space-x-4 mb-4">
                        <Link href="#" className="text-[var(--color-text-on-accent)] opacity-80 hover:opacity-100">
                            <FaFacebook size={20} />
                        </Link>
                        <Link href="#" className="text-[var(--color-text-on-accent)] opacity-80 hover:opacity-100">
                            <FaInstagram size={20} />
                        </Link>
                        <Link href="#" className="text-[var(--color-text-on-accent)] opacity-80 hover:opacity-100">
                            <FaTwitter size={20} />
                        </Link>
                        <Link href="#" className="text-[var(--color-text-on-accent)] opacity-80 hover:opacity-100">
                            <FaGithub size={20} />
                        </Link>
                    </div>
                    <p className="body-text-white text-xs opacity-70">
                        © {new Date().getFullYear()} Sanjeevini. <br />
                        All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}