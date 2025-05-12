export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-14";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

export const token = process.env.SANITY_TOKEN;

// Add better error handling for Sanity connection issues
export const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
};

// Helper to handle Sanity connection errors
export async function withSanityErrorHandling<T>(
  fetchFunction: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await fetchFunction();
  } catch (error: any) {
    console.error("Sanity fetch error:", error?.message || "Unknown error");
    if (error?.code === "ENOTFOUND" || error?.message?.includes("getaddrinfo")) {
      console.warn("Network issue connecting to Sanity API. Using fallback data.");
    }
    return fallback;
  }
}

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
