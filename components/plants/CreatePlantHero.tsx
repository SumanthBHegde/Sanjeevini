import Image from "next/image";

export default function CreatePlantHero() {
    return (
        <section className="relative w-full min-h-[200px] flex flex-col items-center justify-center text-white overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero3.webp"
                    alt="Western Ghats plants backdrop"
                    fill
                    className="object-cover brightness-[0.6]"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full text-center">
                <h1 className="heading text-white mb-4">Add New Plant</h1>
                <p className="text-white text-lg max-w-2xl mx-auto">
                    Share your knowledge about medicinal plants from the Western Ghats
                </p>
            </div>
        </section>
    );
}