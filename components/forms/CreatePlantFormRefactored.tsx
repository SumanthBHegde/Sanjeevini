"use client";

import { usePlantForm } from "@/hooks/use-plant-form";
import { FormInput, FormTextarea, FormSelect, ErrorMessage } from "@/components/ui/form-fields";
import { ImageUpload } from "@/components/forms/ImageUpload";
import { MarkdownEditor } from "@/components/forms/MarkdownEditor";
import {
    PLANT_CATEGORIES,
    CONSERVATION_STATUS_OPTIONS,
    FORM_FIELD_LABELS,
    FORM_PLACEHOLDERS,
    FORM_HELPER_TEXTS
} from "@/components/forms/plant-form-config";

export default function CreatePlantForm() {
    const {
        state,
        formAction,
        isSubmitting,
        imageUrl,
        detailedDescription,
        setDetailedDescription,
        handleSubmit,
        handleImageUpload,
        clearImage,
    } = usePlantForm();

    return (
        <form action={formAction} className="space-y-6" onSubmit={handleSubmit}>
            <ErrorMessage message={state.error} />

            {/* Basic Plant Information */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Basic Information
                </h3>

                <FormInput
                    label={FORM_FIELD_LABELS.name}
                    id="name"
                    placeholder={FORM_PLACEHOLDERS.name}
                    required
                />

                <FormInput
                    label={FORM_FIELD_LABELS.scientificName}
                    id="scientificName"
                    placeholder={FORM_PLACEHOLDERS.scientificName}
                />

                <FormTextarea
                    label={FORM_FIELD_LABELS.description}
                    id="description"
                    placeholder={FORM_PLACEHOLDERS.description}
                    rows={3}
                    required
                />
            </section>

            {/* Detailed Description */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Detailed Content
                </h3>

                <MarkdownEditor
                    value={detailedDescription}
                    onChange={setDetailedDescription}
                />
            </section>

            {/* Image Upload */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Image
                </h3>

                <ImageUpload
                    imageUrl={imageUrl}
                    onImageUpload={handleImageUpload}
                    onClearImage={clearImage}
                />
            </section>

            {/* Classification and Location */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Classification & Location
                </h3>

                <FormSelect
                    label={FORM_FIELD_LABELS.category}
                    id="category"
                    options={PLANT_CATEGORIES}
                    required
                />

                <FormInput
                    label={FORM_FIELD_LABELS.region}
                    id="region"
                    placeholder={FORM_PLACEHOLDERS.region}
                    required
                />

                <FormSelect
                    label={FORM_FIELD_LABELS.conservationStatus}
                    id="conservationStatus"
                    options={CONSERVATION_STATUS_OPTIONS}
                />
            </section>

            {/* Properties and Uses */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Properties & Uses
                </h3>

                <FormTextarea
                    label={FORM_FIELD_LABELS.medicinalProperties}
                    id="medicinalProperties"
                    placeholder={FORM_PLACEHOLDERS.medicinalProperties}
                    helperText={FORM_HELPER_TEXTS.medicinalProperties}
                    rows={3}
                />

                <FormTextarea
                    label={FORM_FIELD_LABELS.cultivationTips}
                    id="cultivationTips"
                    placeholder={FORM_PLACEHOLDERS.cultivationTips}
                    helperText={FORM_HELPER_TEXTS.cultivationTips}
                    rows={3}
                />

                <FormTextarea
                    label={FORM_FIELD_LABELS.traditionalUses}
                    id="traditionalUses"
                    placeholder={FORM_PLACEHOLDERS.traditionalUses}
                    helperText={FORM_HELPER_TEXTS.traditionalUses}
                    rows={3}
                />
            </section>

            {/* Submit Button */}
            <div className="pt-6 border-t">
                <button
                    type="submit"
                    className="submit_button w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Plant'}
                </button>
            </div>
        </form>
    );
}
