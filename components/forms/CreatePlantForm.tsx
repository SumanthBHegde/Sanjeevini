"use client";

import { usePlantForm, PlantData } from "@/hooks/use-plant-form";
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

interface CreatePlantFormProps {
  plant?: PlantData;
  isEditing?: boolean;
}

export default function CreatePlantForm({ plant, isEditing = false }: CreatePlantFormProps) {
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
  } = usePlantForm({ initialData: plant, isEditing });

  // Convert arrays back to newline-separated strings for textarea pre-population
  const medicinalPropsString = plant?.medicinalProperties?.join('\n') || '';
  const cultivationTipsString = plant?.cultivationTips?.join('\n') || '';
  const traditionalUsesString = plant?.traditionalUses?.join('\n') || '';

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
          defaultValue={plant?.name}
          required
        />

        <FormInput
          label={FORM_FIELD_LABELS.scientificName}
          id="scientificName"
          placeholder={FORM_PLACEHOLDERS.scientificName}
          defaultValue={plant?.scientificName}
        />

        <FormTextarea
          label={FORM_FIELD_LABELS.description}
          id="description"
          placeholder={FORM_PLACEHOLDERS.description}
          rows={3}
          defaultValue={plant?.description}
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
          defaultValue={plant?.category}
          required
        />

        <FormInput
          label={FORM_FIELD_LABELS.region}
          id="region"
          placeholder={FORM_PLACEHOLDERS.region}
          defaultValue={plant?.region}
          required
        />

        <FormSelect
          label={FORM_FIELD_LABELS.conservationStatus}
          id="conservationStatus"
          options={CONSERVATION_STATUS_OPTIONS}
          defaultValue={plant?.conservationStatus}
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
          defaultValue={medicinalPropsString}
        />

        <FormTextarea
          label={FORM_FIELD_LABELS.cultivationTips}
          id="cultivationTips"
          placeholder={FORM_PLACEHOLDERS.cultivationTips}
          helperText={FORM_HELPER_TEXTS.cultivationTips}
          rows={3}
          defaultValue={cultivationTipsString}
        />

        <FormTextarea
          label={FORM_FIELD_LABELS.traditionalUses}
          id="traditionalUses"
          placeholder={FORM_PLACEHOLDERS.traditionalUses}
          helperText={FORM_HELPER_TEXTS.traditionalUses}
          rows={3}
          defaultValue={traditionalUsesString}
        />
      </section>

      {/* Submit Button */}
      <div className="pt-6 border-t">
        <button
          type="submit"
          className="submit_button w-full"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? (isEditing ? 'Updating...' : 'Submitting...')
            : (isEditing ? 'Update Plant' : 'Submit Plant')
          }
        </button>
      </div>
    </form>
  );
}
