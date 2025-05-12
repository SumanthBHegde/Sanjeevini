"use client";

import Image from "next/image";
import Link from "next/link";
import { PlantType } from "@/types/plants";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

// Helper function to validate image URL
const isValidImageUrl = (url: string | undefined): boolean => {
    if (!url) return false;
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/');
};

// PlantCard component
export default function PlantCard({ plant }: { plant: PlantType }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Check if user is admin
    const isAdmin = session?.user?.role === 'admin' || session?.user?.isAdmin;

    // Format date
    const formattedDate = plant.publishedAt ?
        new Date(plant.publishedAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }) : '';

    // Delete plant handler
    const handleDeletePlant = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAdmin) return;

        setIsDeleting(true);

        try {
            const response = await fetch(`/api/plants/${plant._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete plant');
            }

            toast({
                title: "Plant deleted",
                description: `${plant.name} has been removed successfully.`,
            });

            // Refresh the current page to show updated list
            router.refresh();
        } catch (error) {
            console.error('Error deleting plant:', error);
            toast({
                title: "Error",
                description: "Failed to delete plant. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsDeleting(false);
            setShowDeleteConfirm(false);
        }
    };

    return (
        <div className="group bg-[var(--color-bg-card)] rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-[var(--color-card-active-stroke)] transition-all duration-300 relative">
            {/* Admin Delete Button */}
            {isAdmin && (
                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {showDeleteConfirm ? (
                        <div className="bg-white p-2 rounded-lg shadow-md flex flex-col gap-2 items-center">
                            <p className="text-xs text-red-600 font-medium">Delete plant?</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleDeletePlant}
                                    disabled={isDeleting}
                                    className="text-xs bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 transition-colors"
                                >
                                    {isDeleting ? 'Deleting...' : 'Yes'}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setShowDeleteConfirm(false);
                                    }}
                                    className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 transition-colors"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowDeleteConfirm(true);
                            }}
                            className="bg-white p-1.5 rounded-full shadow-md hover:bg-red-50 transition-colors text-red-500 hover:text-red-600"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                    )}
                </div>
            )}

            <Link href={`/plant/${plant.slug?.current}`} className="block h-full">
                {/* Date Badge */}
                <div className="p-4 pb-0 flex justify-between items-center">
                    <div className="inline-block px-2 py-1 bg-amber-100 text-xs font-bold text-amber-800 rounded-md">
                        {formattedDate || "Unknown date"}
                    </div>

                    <div className="flex items-center gap-1 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                        </svg>
                        <span className="text-xs">{plant.likes || 0}</span>
                    </div>
                </div>

                <div className="p-4">
                    {/* Author Info */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-[var(--color-avatar-card-stroke)] relative">
                            {plant.author?.image && isValidImageUrl(plant.author.image) ? (
                                <Image
                                    src={plant.author.image}
                                    alt={(plant.author?.name || "Author")}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="bg-[var(--color-avatar-card-bg)] w-full h-full flex items-center justify-center">
                                    <span className="text-xs text-[var(--color-bg-accent)]">
                                        {plant.author?.name?.charAt(0) || "A"}
                                    </span>
                                </div>
                            )}
                        </div>
                        <span className="text-sm font-medium">
                            {plant.author?.name || "Unknown author"}
                        </span>
                    </div>

                    {/* Plant Name */}
                    <h3 className="text-base font-bold mb-1 text-[var(--color-text-primary)] group-hover:text-[var(--color-bg-accent)] transition-colors">{plant.name}</h3>

                    {/* Scientific Name */}
                    <p className="text-sm italic text-gray-500 mb-2">{plant.scientificName}</p>

                    {/* Description - Truncated */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {plant.description}
                    </p>

                    {/* Card Image */}
                    <div className="w-full h-[160px] mb-4 relative rounded-md overflow-hidden border border-gray-200 group-hover:border-[var(--color-card-active-stroke)] transition-colors">
                        {plant.mainImage && isValidImageUrl(plant.mainImage) ? (
                            <Image
                                src={plant.mainImage}
                                alt={plant.name || "Plant image"}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <span className="text-gray-500 text-sm">No image</span>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                            {plant.category || "Uncategorized"}
                        </span>
                        <span className="inline-block px-3 py-1 bg-[var(--color-bg-accent)] text-white text-xs font-medium rounded-full group-hover:bg-[var(--color-bg-accent-light)] group-hover:text-[var(--color-bg-accent)] transition-colors">
                            Details
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

// PlantCardSkeleton component for loading states
export function PlantCardSkeleton() {
    return (
        <div className="bg-[var(--color-bg-card)] rounded-lg shadow-sm border border-gray-200 overflow-hidden p-4">
            {/* Date and Likes Counter */}
            <div className="flex justify-between items-center mb-3">
                <Skeleton className="h-5 w-24 rounded-md" />
                <Skeleton className="h-4 w-10" />
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-2 mb-3">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="h-4 w-32" />
            </div>

            {/* Plant Name */}
            <Skeleton className="h-6 w-3/4 mb-1" />

            {/* Scientific Name */}
            <Skeleton className="h-4 w-1/2 mb-2" />

            {/* Description */}
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-4" />

            {/* Card Image */}
            <Skeleton className="w-full h-[160px] mb-4 rounded-md" />

            {/* Footer */}
            <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-16 rounded-full" />
            </div>
        </div>
    );
}