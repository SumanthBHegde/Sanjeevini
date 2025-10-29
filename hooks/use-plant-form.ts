"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { createPlant, updatePlant } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

export interface PlantFormData {
  name: string;
  scientificName: string;
  description: string;
  detailedDescription: string;
  category: string;
  region: string;
  mainImage: string;
  medicinalProperties: string;
  cultivationTips: string;
  traditionalUses: string;
  conservationStatus: string;
}

export interface PlantData {
  _id: string;
  name: string;
  scientificName?: string;
  description: string;
  detailedDescription?: string;
  category: string;
  region: string;
  mainImage?: string;
  medicinalProperties?: string[];
  cultivationTips?: string[];
  traditionalUses?: string[];
  conservationStatus?: string;
  slug: { current: string };
}

interface UsePlantFormProps {
  initialData?: PlantData;
  isEditing?: boolean;
}

export const usePlantForm = ({ initialData, isEditing = false }: UsePlantFormProps = {}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialData?.mainImage || "");
  const [detailedDescription, setDetailedDescription] = useState(initialData?.detailedDescription || "");

  // Create action wrapper for edit mode
  const actionWrapper = isEditing && initialData
    ? async (prevState: { error: string; status: string }, formData: FormData) => {
        return updatePlant(initialData._id, prevState, formData);
      }
    : createPlant;

  // Handle form state for server actions
  const [state, formAction] = useFormState(actionWrapper, {
    error: "",
    status: "",
  });

  // Show toast and redirect on successful submission
  useEffect(() => {
    if (state.status === "SUCCESS" && typeof window !== 'undefined') {
      toast({
        title: isEditing ? "✓ Plant updated successfully!" : "✓ Plant created successfully!",
        description: isEditing 
          ? "Your changes have been saved and published." 
          : "Your plant has been added to the database.",
      });
      
      setTimeout(() => {
        if (isEditing && initialData) {
          router.push(`/plant/${initialData.slug.current}`);
        } else {
          router.push("/plants");
        }
      }, 500);
    } else if (state.status === "ERROR" && state.error) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  }, [state.status, state.error, router, isEditing, initialData, toast]);

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
  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const clearImage = () => {
    setImageUrl("");
  };

  return {
    state,
    formAction,
    isSubmitting,
    imageUrl,
    detailedDescription,
    setDetailedDescription,
    handleSubmit,
    handleImageUpload,
    clearImage,
  };
};
