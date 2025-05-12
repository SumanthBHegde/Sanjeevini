"use client";

import { client } from "@/sanity/lib/client";
import { PLANTS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import { useEffect, useState } from "react";
import PlantCard from "@/components/plants/PlantCard";
import { PlantType } from "@/types/plants";
import Link from "next/link";

interface UserPlantsProps {
    id: string;
    showAddButton?: boolean;
}

const UserPlants = ({ id, showAddButton = false }: UserPlantsProps) => {
    const [userPlants, setUserPlants] = useState<PlantType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserPlants = async () => {
            try {
                const plants = await client.fetch(PLANTS_BY_AUTHOR_QUERY, { id });
                setUserPlants(plants || []);
            } catch (error) {
                console.error("Error fetching user plants:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPlants();
    }, [id]);

    // Loading state
    if (loading) {
        return (
            <div className="col-span-full flex items-center justify-center py-10">
                <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border-4 border-[var(--color-bg-accent)] border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-3 body-text-secondary">Loading plants...</p>
                </div>
            </div>
        );
    }

    // Empty state
    if (userPlants.length === 0) {
        return (
            <div className="col-span-full bg-white rounded-lg border border-[var(--color-card-stroke-primary)] p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-bg-accent)] mx-auto mb-4">
                    <path d="M12 22a9 9 0 0 0 9-9c0-1.1-.23-2.2-.68-3.2a9.6 9.6 0 0 0-5.5-5.3A10 10 0 0 0 12 4V2"></path>
                    <path d="M12 4a6.9 6.9 0 0 0-4.07 1.33A7 7 0 0 0 5 11"></path>
                    <path d="m9 11 3 3 3-3"></path>
                    <path d="M12 14v8"></path>
                </svg>
                <h3 className="title-sm mb-2">No plant contributions yet</h3>
                <p className="body-text-secondary max-w-sm mx-auto mb-6">
                    {showAddButton
                        ? "You haven't added any plants to the collection yet. Start by adding your first plant!"
                        : "This user hasn't added any plants to the collection yet. Plants will appear here once they're published."
                    }
                </p>
                {showAddButton && (
                    <Link href="/plant/create" className="submit_button inline-block max-w-fit mx-auto px-6 py-2">
                        Add a Plant
                    </Link>
                )}
            </div>
        );
    }

    // Plants list
    return (
        <>
            {userPlants.map((plant) => (
                <PlantCard key={plant._id} plant={plant} />
            ))}
        </>
    );
};

export default UserPlants;