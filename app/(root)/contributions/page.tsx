import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

export const dynamic = 'force-dynamic';

export default async function ContributionsPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/sign-in");
    }

    // Fetch user's contributed plants
    const userPlants = await client.fetch(
        `*[_type == "plant" && author._ref == $userId] | order(publishedAt desc) {
            _id,
            name,
            scientificName,
            category,
            mainImage,
            publishedAt,
            slug,
            "views": 0,
            "likes": coalesce(likes, 0)
        }`,
        { userId: session.user.id }
    );

    const canContribute = session.user.role === 'admin' || session.user.role === 'editor';

    return (
        <div className="min-h-screen bg-[var(--color-home)]">
            {/* Header */}
            <section className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Contributions</h1>
                            <p className="text-gray-600">Manage your plant entries and track your impact</p>
                        </div>
                        {canContribute && (
                            <Link
                                href="/plant/create"
                                className="bg-[var(--color-bg-accent)] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium inline-flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                Add New Plant
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-500">Total Plants</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{userPlants.length}</p>
                        <p className="text-xs text-gray-500 mt-1">Contributions made</p>
                    </div>
                    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-500">Role</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <p className="text-xl font-semibold text-gray-900 capitalize">{session.user.role || 'Viewer'}</p>
                        <p className="text-xs text-gray-500 mt-1">Access level</p>
                    </div>
                    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-500">Total Likes</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-600">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">
                            {userPlants.reduce((sum: number, plant: any) => sum + (plant.likes || 0), 0)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Community appreciation</p>
                    </div>
                    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-500">Recent Activity</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-600">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </div>
                        <p className="text-xl font-semibold text-gray-900">
                            {userPlants.length > 0
                                ? new Date(userPlants[0].publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                : 'None'
                            }
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Last contribution</p>
                    </div>
                </div>

                {/* Contribution Status */}
                {!canContribute && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-yellow-100 rounded-full p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-700">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-1">Want to contribute?</h3>
                                <p className="text-gray-700 text-sm mb-3">
                                    Request editor access to add and edit plant information in our database.
                                </p>
                                <Link
                                    href="/user/request-editor"
                                    className="inline-block bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
                                >
                                    Request Editor Access
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Plants List */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Your Plants ({userPlants.length})</h2>
                    </div>

                    {userPlants.length === 0 ? (
                        <div className="p-12 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-4 text-gray-400">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No plants yet</h3>
                            <p className="text-gray-600 mb-6">
                                {canContribute
                                    ? "Start contributing by adding your first plant to the database."
                                    : "Request editor access to start contributing plant information."}
                            </p>
                            {canContribute && (
                                <Link
                                    href="/plant/create"
                                    className="button-primary inline-block"
                                >
                                    Add Your First Plant
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {userPlants.map((plant: any) => (
                                <div key={plant._id} className="p-6 hover:bg-gray-50 transition-colors group">
                                    <div className="flex items-start gap-4">
                                        {plant.mainImage ? (
                                            <img
                                                src={plant.mainImage}
                                                alt={plant.name}
                                                className="w-24 h-24 object-cover rounded-lg flex-shrink-0 border border-gray-200"
                                            />
                                        ) : (
                                            <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 border border-gray-200 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <Link
                                                        href={`/plant/${plant.slug?.current}`}
                                                        className="text-lg font-semibold text-gray-900 hover:text-[var(--color-bg-accent)] transition-colors inline-flex items-center gap-2 group/link"
                                                    >
                                                        {plant.name}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-0 group-hover/link:opacity-100 transition-opacity">
                                                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                                                        </svg>
                                                    </Link>
                                                    {plant.scientificName && (
                                                        <p className="text-sm text-gray-600 italic mt-1">{plant.scientificName}</p>
                                                    )}
                                                    <div className="flex items-center gap-3 mt-3 text-sm">
                                                        <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                                                <line x1="7" y1="7" x2="7.01" y2="7" />
                                                            </svg>
                                                            {plant.category}
                                                        </span>
                                                        <span className="text-gray-500 flex items-center gap-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                                <line x1="16" y1="2" x2="16" y2="6" />
                                                                <line x1="8" y1="2" x2="8" y2="6" />
                                                                <line x1="3" y1="10" x2="21" y2="10" />
                                                            </svg>
                                                            {new Date(plant.publishedAt).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                        <span className="text-gray-500 flex items-center gap-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                                            </svg>
                                                            {plant.likes}
                                                        </span>
                                                    </div>
                                                </div>
                                                {canContribute && plant.slug?.current && (
                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Link
                                                            href={`/plant/${plant.slug.current}/edit`}
                                                            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                            </svg>
                                                            Edit
                                                        </Link>
                                                        <Link
                                                            href={`/plant/${plant.slug.current}`}
                                                            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                                <circle cx="12" cy="12" r="3" />
                                                            </svg>
                                                            View
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
