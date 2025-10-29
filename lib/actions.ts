"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPlant = async (
  state: { error: string; status: string },
  form: FormData,
) => {
  try {
    // Early return if we're in a build context where auth might not be available
    if (typeof window === 'undefined' && process.env.NODE_ENV === 'production' && !process.env.VERCEL_URL) {
      return parseServerActionResponse({
        error: "Build context - skipping authentication",
        status: "ERROR",
      });
    }

    const session = await auth();

    if (!session)
      return parseServerActionResponse({
        error: "Not signed in",
        status: "ERROR",
      });

    const { 
      name, 
      scientificName, 
      description, 
      detailedDescription, 
      category, 
      region, 
      mainImage, 
      medicinalProperties, 
      cultivationTips, 
      traditionalUses,
      conservationStatus
    } = Object.fromEntries(form);

    const slug = slugify(name as string, { lower: true, strict: true });

    // Process array fields from form data
    const processMedicinalProperties = medicinalProperties ? (medicinalProperties as string).split('\n').filter(item => item.trim() !== '') : [];
    const processCultivationTips = cultivationTips ? (cultivationTips as string).split('\n').filter(item => item.trim() !== '') : [];
    const processTraditionalUses = traditionalUses ? (traditionalUses as string).split('\n').filter(item => item.trim() !== '') : [];

    const plant = {
      name,
      scientificName,
      description,
      detailedDescription, // Add detailed markdown content
      category,
      region,
      mainImage,
      medicinalProperties: processMedicinalProperties,
      cultivationTips: processCultivationTips,
      traditionalUses: processTraditionalUses,
      conservationStatus,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.user?.id,
      },
      publishedAt: new Date().toISOString(),
      likes: 0
    };

    const result = await writeClient.create({ _type: "plant", ...plant });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
