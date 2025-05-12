export type PlantType = {
  _id: string;
  name: string;
  scientificName?: string;
  slug: { current: string };
  author?: { 
    name?: string;
    expertise?: string;
    image?: string;
  };
  mainImage?: string;
  description?: string;
  category?: string;
  region?: string;
  likes?: number;
  publishedAt?: string;
  medicinalProperties?: string[];
  cultivationTips?: string[];
  traditionalUses?: string[];
  conservationStatus?: string;
};