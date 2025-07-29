export const PLANT_CATEGORIES = [
  { value: "medicinal", label: "Medicinal" },
  { value: "culinary", label: "Culinary" },
  { value: "ornamental", label: "Ornamental" },
  { value: "endangered", label: "Endangered" }
];

export const CONSERVATION_STATUS_OPTIONS = [
  { value: "Not Threatened", label: "Not Threatened" },
  { value: "Near Threatened", label: "Near Threatened" },
  { value: "Vulnerable", label: "Vulnerable" },
  { value: "Endangered", label: "Endangered" },
  { value: "Critically Endangered", label: "Critically Endangered" }
];

export const FORM_FIELD_LABELS = {
  name: "NAME",
  scientificName: "SCIENTIFIC NAME",
  description: "BRIEF DESCRIPTION",
  detailedDescription: "DETAILED DESCRIPTION (MARKDOWN)",
  category: "CATEGORY",
  region: "REGION",
  medicinalProperties: "MEDICINAL PROPERTIES",
  cultivationTips: "CULTIVATION TIPS",
  traditionalUses: "TRADITIONAL USES",
  conservationStatus: "CONSERVATION STATUS"
} as const;

export const FORM_PLACEHOLDERS = {
  name: "Enter plant name",
  scientificName: "Enter scientific name (e.g., Mangifera indica)",
  description: "Brief description of the plant (This will appear in cards and previews)",
  region: "Region where plant is found",
  medicinalProperties: "Enter medicinal properties (each property on a new line)",
  cultivationTips: "Enter cultivation tips (each tip on a new line)",
  traditionalUses: "Enter traditional uses (each use on a new line)"
} as const;

export const FORM_HELPER_TEXTS = {
  medicinalProperties: "Example: Anti-inflammatory, Antioxidant, etc.",
  cultivationTips: "Example: Requires full sun, Water moderately, etc.",
  traditionalUses: "Example: Used in Ayurvedic medicine, Tribal remedies, etc."
} as const;
