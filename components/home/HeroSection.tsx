import Image from "next/image";
import { FiSearch } from "react-icons/fi";

type HeroSectionProps = {
    query?: string;
};

export default function HeroSection({ query }: HeroSectionProps) {
    return (
        <section className="relative w-full min-h-[500px] flex flex-col items-center justify-center text-white overflow-hidden">
            {/* Hero Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/sanjivini_hero.webp"
                    alt="Western Ghats plants backdrop"
                    fill
                    className="object-cover brightness-[0.5]"
                    priority
                />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-center px-4 py-16 text-center max-w-4xl mx-auto">
                {/* Badge - Matches the yellow banner in the image */}
                <div className="badge-secondary mb-8">
                    CREATE, EDIT, AND LEARN
                </div>

                {/* Main Heading */}
                <h1 className="heading text-white mb-5 tracking-tight">
                    NATURE'S BACKPACK
                </h1>

                {/* Subtitle */}
                <p className="body-text-white mb-10 max-w-2xl text-lg">
                    Explore the medicinal plants of the Western Ghats, learn about their traditional uses and cultivation techniques, and contribute to the preservation of this rich biodiversity.
                </p>

                {/* Search Form */}
                <div className="w-full max-w-md">
                    <form action="/" method="GET" className="flex w-full">
                        <input
                            type="text"
                            name="query"
                            placeholder="SEARCH SPECIES"
                            className="w-full py-3 px-5 rounded-l-full text-black outline-none border-2 border-[var(--color-bg-accent)] border-r-0"
                            defaultValue={query || ""}
                        />
                        <button
                            type="submit"
                            className="bg-[var(--color-bg-accent)] text-white p-3 rounded-r-full hover:bg-opacity-90 transition-colors duration-200 flex items-center justify-center border-2 border-[var(--color-bg-accent)]"
                        >
                            <FiSearch size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}