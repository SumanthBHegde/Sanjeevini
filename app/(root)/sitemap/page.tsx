import Link from "next/link";
import Image from "next/image";

export default function SitemapPage() {
    return (
        <div className="bg-[var(--color-home)] min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full min-h-[400px] flex flex-col items-center justify-center text-white overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero2.webp"
                        alt="Sitemap backdrop"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col items-center px-4 py-16 text-center max-w-4xl mx-auto">
                    <div className="badge-secondary mb-8">
                        NAVIGATION
                    </div>

                    <h1 className="heading text-white mb-5 tracking-tight uppercase">
                        Sitemap
                    </h1>

                    <p className="body-text-white mb-10 max-w-2xl text-lg">
                        Explore all pages and sections of Sanjeevini
                    </p>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="bg-[var(--color-home)] py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {/* Main Pages */}
                            <div>
                                <h2 className="text-xl font-bold mb-4 text-[var(--color-text-primary)]">Main Pages</h2>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/" className="text-[var(--color-primary)] hover:underline">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about" className="text-[var(--color-primary)] hover:underline">
                                            About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/plants" className="text-[var(--color-primary)] hover:underline">
                                            All Plants
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/medicinal" className="text-[var(--color-primary)] hover:underline">
                                            Medicinal Uses
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/cultivation" className="text-[var(--color-primary)] hover:underline">
                                            Cultivation Guide
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Resources */}
                            <div>
                                <h2 className="text-xl font-bold mb-4 text-[var(--color-text-primary)]">Resources</h2>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/research" className="text-[var(--color-primary)] hover:underline">
                                            Research
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/conservation" className="text-[var(--color-primary)] hover:underline">
                                            Conservation
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contributors" className="text-[var(--color-primary)] hover:underline">
                                            Contributors
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="text-[var(--color-primary)] hover:underline">
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* User Pages */}
                            <div>
                                <h2 className="text-xl font-bold mb-4 text-[var(--color-text-primary)]">User Area</h2>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/sign-in" className="text-[var(--color-primary)] hover:underline">
                                            Sign In
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/user/profile" className="text-[var(--color-primary)] hover:underline">
                                            My Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/user/plants" className="text-[var(--color-primary)] hover:underline">
                                            My Plants
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/user/request-editor" className="text-[var(--color-primary)] hover:underline">
                                            Request Editor Access
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/plant/create" className="text-[var(--color-primary)] hover:underline">
                                            Add Plant (Editors)
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Admin Pages */}
                            <div>
                                <h2 className="text-xl font-bold mb-4 text-[var(--color-text-primary)]">Admin</h2>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/admin" className="text-[var(--color-primary)] hover:underline">
                                            Admin Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/editor-requests" className="text-[var(--color-primary)] hover:underline">
                                            Editor Requests
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/studio" className="text-[var(--color-primary)] hover:underline">
                                            Sanity Studio
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Legal */}
                            <div>
                                <h2 className="text-xl font-bold mb-4 text-[var(--color-text-primary)]">Legal</h2>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/privacy" className="text-[var(--color-primary)] hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/terms" className="text-[var(--color-primary)] hover:underline">
                                            Terms of Service
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/sitemap" className="text-[var(--color-primary)] hover:underline">
                                            Sitemap
                                        </Link>
                                    </li>
                                </ul>
                            </div>
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
            </section>
        </div>
    );
}
