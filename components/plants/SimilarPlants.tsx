import Link from "next/link";
import PlantCard from "@/components/plants/PlantCard";
import { PlantType } from "@/types/plants";

type SimilarPlantsProps = {
    plants: PlantType[];
};

const SimilarPlants = ({ plants }: SimilarPlantsProps) => {
    if (!plants || plants.length === 0) {
        return null;
    }

    return (
        <section className="bg-[var(--color-home)] py-12">
            <div className="section_container">
                <h2 className="section-title-large mb-8">Similar Plants</h2>
                <div className="card_grid">
                    {plants.map((plant) => (
                        <PlantCard key={plant._id} plant={plant} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SimilarPlants;