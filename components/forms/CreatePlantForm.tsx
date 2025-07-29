"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createPlant } from "@/lib/actions";
import { useFormState } from "react-dom";
import dynamic from "next/dynamic";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

// Import the markdown editor dynamically to prevent SSR issues
const SimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), {
    ssr: false
});

// Import the styles for the markdown editor
import "easymde/dist/easymde.min.css";

export default function CreatePlantForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [detailedDescription, setDetailedDescription] = useState("");

    // Handle form state for server actions
    const [state, formAction] = useFormState(createPlant, {
        error: "",
        status: "",
    });

    // Redirect on successful submission
    useEffect(() => {
        if (state.status === "SUCCESS") {
            router.push("/plants");
        }
    }, [state.status, router]);

    // Handle form submission with the detailed markdown description
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        // Prevent default form submission (which will be handled by formAction)
        event.preventDefault();

        // Get form data from the form element
        const formData = new FormData(event.currentTarget);

        // Add the markdown content and image URL to the form data
        formData.set("detailedDescription", detailedDescription);
        formData.set("mainImage", imageUrl);

        // Set submitting state
        setIsSubmitting(true);

        // Submit the form with formAction
        formAction(formData);
    };

    // Handle successful image upload
    const handleImageUpload = (result: any) => {
        const url = result.info.secure_url;
        setImageUrl(url);
    };

    return (
        <form action={formAction} className="space-y-6" onSubmit={handleSubmit}>
            {state.error && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md">
                    {state.error}
                </div>
            )}

            {/* Plant Name */}
            <div>
                <label htmlFor="name" className="form_label">NAME</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter plant name"
                    className="form_input"
                    required
                />
            </div>

            {/* Scientific Name */}
            <div>
                <label htmlFor="scientificName" className="form_label">SCIENTIFIC NAME</label>
                <input
                    type="text"
                    id="scientificName"
                    name="scientificName"
                    placeholder="Enter scientific name (e.g., Mangifera indica)"
                    className="form_input"
                />
            </div>

            {/* Basic Description */}
            <div>
                <label htmlFor="description" className="form_label">BRIEF DESCRIPTION</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Brief description of the plant (This will appear in cards and previews)"
                    className="form_textarea"
                    rows={3}
                    required
                ></textarea>
            </div>

            {/* Detailed Description with Markdown */}
            <div>
                <label htmlFor="detailedDescription" className="form_label">DETAILED DESCRIPTION (MARKDOWN)</label>
                <div className="border border-gray-300 rounded-md overflow-hidden">
                    <SimpleMdeEditor
                        value={detailedDescription}
                        onChange={setDetailedDescription}
                        options={{
                            placeholder: "Write a detailed description with markdown formatting...",
                            spellChecker: true,
                            autofocus: false,
                            status: ["lines", "words", "cursor"],
                            autosave: {
                                enabled: true,
                                delay: 1000,
                                uniqueId: "plantDetailedDescription"
                            }
                        }}
                    />
                </div>
                <p className="body-text-secondary text-xs mt-1">
                    Use markdown formatting for rich text. Support for headings (#), bold (**), italic (*), lists, etc.
                </p>
            </div>

            {/* Image Upload */}
            <div>
                <label className="form_label">PLANT IMAGE</label>
                <div className="mt-2 flex flex-col items-center space-y-4">
                    {imageUrl ? (
                        <div className="w-full max-w-md relative h-64 mb-4">
                            <Image
                                src={imageUrl}
                                alt="Plant image"
                                fill
                                className="object-cover rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => setImageUrl("")}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center"
                            >
                                ×
                            </button>
                        </div>
                    ) : (
                        <div className="w-full max-w-md border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <p className="mt-2 text-sm text-gray-600">Upload a high-quality image of the plant</p>
                        </div>
                    )}

                    <CldUploadWidget
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "sanjeevini_plants"}
                        onSuccess={handleImageUpload}
                    >
                        {({ open }) => (
                            <button
                                type="button"
                                onClick={() => open()}
                                className="bg-[var(--color-bg-accent-light)] text-[var(--color-bg-accent)] font-medium py-2 px-4 rounded-md hover:bg-[var(--color-bg-accent)] hover:text-white transition-colors"
                            >
                                {imageUrl ? "Replace Image" : "Upload Image"}
                            </button>
                        )}
                    </CldUploadWidget>
                </div>

                {/* Hidden input field to store the image URL */}
                <input
                    type="hidden"
                    id="mainImage"
                    name="mainImage"
                    value={imageUrl}
                />
            </div>

            {/* Categories */}
            <div>
                <label htmlFor="category" className="form_label">CATEGORY</label>
                <select id="category" name="category" className="form_input" required>
                    <option value="">Select a category</option>
                    <option value="medicinal">Medicinal</option>
                    <option value="culinary">Culinary</option>
                    <option value="ornamental">Ornamental</option>
                    <option value="endangered">Endangered</option>
                </select>
            </div>

            {/* Region */}
            <div>
                <label htmlFor="region" className="form_label">REGION</label>
                <input
                    type="text"
                    id="region"
                    name="region"
                    placeholder="Region where plant is found"
                    className="form_input"
                    required
                />
            </div>

            {/* Medicinal Properties */}
            <div>
                <label htmlFor="medicinalProperties" className="form_label">MEDICINAL PROPERTIES</label>
                <textarea
                    id="medicinalProperties"
                    name="medicinalProperties"
                    placeholder="Enter medicinal properties (each property on a new line)"
                    className="form_textarea"
                    rows={3}
                ></textarea>
                <p className="body-text-secondary text-xs mt-1">Example: Anti-inflammatory, Antioxidant, etc.</p>
            </div>

            {/* Cultivation Tips */}
            <div>
                <label htmlFor="cultivationTips" className="form_label">CULTIVATION TIPS</label>
                <textarea
                    id="cultivationTips"
                    name="cultivationTips"
                    placeholder="Enter cultivation tips (each tip on a new line)"
                    className="form_textarea"
                    rows={3}
                ></textarea>
                <p className="body-text-secondary text-xs mt-1">Example: Requires full sun, Water moderately, etc.</p>
            </div>

            {/* Traditional Uses */}
            <div>
                <label htmlFor="traditionalUses" className="form_label">TRADITIONAL USES</label>
                <textarea
                    id="traditionalUses"
                    name="traditionalUses"
                    placeholder="Enter traditional uses (each use on a new line)"
                    className="form_textarea"
                    rows={3}
                ></textarea>
                <p className="body-text-secondary text-xs mt-1">Example: Used in Ayurvedic medicine, Tribal remedies, etc.</p>
            </div>

            {/* Conservation Status */}
            <div>
                <label htmlFor="conservationStatus" className="form_label">CONSERVATION STATUS</label>
                <select id="conservationStatus" name="conservationStatus" className="form_input">
                    <option value="">Select conservation status</option>
                    <option value="Not Threatened">Not Threatened</option>
                    <option value="Near Threatened">Near Threatened</option>
                    <option value="Vulnerable">Vulnerable</option>
                    <option value="Endangered">Endangered</option>
                    <option value="Critically Endangered">Critically Endangered</option>
                </select>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="submit_button w-full"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Plant'}
            </button>
        </form>
    );
}