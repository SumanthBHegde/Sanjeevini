"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { createPlant } from "@/lib/actions";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";

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

export const usePlantForm = () => {
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
  const handleImageUpload = (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
      const url = result.info.secure_url as string;
      setImageUrl(url);
    }
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
