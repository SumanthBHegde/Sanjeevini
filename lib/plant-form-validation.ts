import { z } from "zod";

export const plantFormSchema = z.object({
  name: z.string()
    .min(2, "Plant name must be at least 2 characters")
    .max(100, "Plant name must be less than 100 characters"),
  
  scientificName: z.string()
    .max(150, "Scientific name must be less than 150 characters")
    .optional(),
  
  description: z.string()
    .min(20, "Brief description must be at least 20 characters")
    .max(500, "Brief description must be less than 500 characters"),
  
  detailedDescription: z.string()
    .min(50, "Detailed description must be at least 50 characters")
    .max(10000, "Detailed description must be less than 10,000 characters"),
  
  category: z.enum(["medicinal", "culinary", "ornamental", "endangered"], {
    required_error: "Please select a category"
  }),
  
  region: z.string()
    .min(2, "Region must be at least 2 characters")
    .max(100, "Region must be less than 100 characters"),
  
  mainImage: z.string()
    .url("Please upload a valid image")
    .optional(),
  
  medicinalProperties: z.string()
    .max(1000, "Medicinal properties must be less than 1000 characters")
    .optional(),
  
  cultivationTips: z.string()
    .max(1000, "Cultivation tips must be less than 1000 characters")
    .optional(),
  
  traditionalUses: z.string()
    .max(1000, "Traditional uses must be less than 1000 characters")
    .optional(),
  
  conservationStatus: z.enum([
    "Not Threatened",
    "Near Threatened", 
    "Vulnerable",
    "Endangered",
    "Critically Endangered"
  ]).optional()
});

export type PlantFormData = z.infer<typeof plantFormSchema>;
