import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false to bypass CDN for more reliable connections during development
  perspective: "published",
  // Add retry logic and longer timeout
  token: process.env.SANITY_TOKEN,
  // Additional configuration for better error handling
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
});
