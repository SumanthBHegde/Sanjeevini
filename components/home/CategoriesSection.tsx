import Link from "next/link";

export default function CategoriesSection() {
    const categories = [
        {
            title: "Medicinal",
            description: "Healing properties of Western Ghats flora",
            href: "/category/medicinal",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20" />
                    <path d="M5 9h14" />
                    <circle cx="12" cy="12" r="8" />
                </svg>
            )
        },
        {
            title: "Culinary",
            description: "Edible plants and spices",
            href: "/category/culinary",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
                    <path d="M7 2v20"></path>
                    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
                </svg>
            )
        },
        {
            title: "Ornamental",
            description: "Decorative garden plants",
            href: "/category/ornamental",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15"></path>
                </svg>
            )
        },
        {
            title: "Endangered",
            description: "Plants in need of protection",
            href: "/category/endangered",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
            )
        }
    ];

    return (
        <section className="pink_container">
            <div className="section_container py-8">
                <h2 className="section-title-large mb-8">Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            href={category.href}
                            className="card hover:card-active group"
                        >
                            <div className="p-6 text-center">
                                <div className="bg-[var(--color-avatar-card-bg)] w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-[var(--color-bg-accent)] transition-colors">
                                    <div className="text-[var(--color-bg-accent)] group-hover:text-white transition-colors">
                                        {category.icon}
                                    </div>
                                </div>
                                <h3 className="title-sm">{category.title}</h3>
                                <p className="body-text-secondary mt-2">{category.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}