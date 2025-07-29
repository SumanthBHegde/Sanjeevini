import { PLANTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { auth } from "@/auth";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedPlants from "@/components/home/FeaturedPlants";
import { withSanityErrorHandling } from "@/sanity/env";
import { getFallbackPlants, testSanityConnection } from "@/utils/sanity-connection";

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ query?: string }> | { query?: string }
}) {
  // Await the searchParams if it's a Promise
  const resolvedSearchParams = searchParams instanceof Promise
    ? await searchParams
    : searchParams;

  const query = resolvedSearchParams.query;

  try {
    // Test the Sanity connection and handle any issues
    const connectionTest = await testSanityConnection();
    let plants = [];

    // Fetch session for future use if needed
    await auth();

    if (connectionTest.success) {
      // Connection successful, fetch plants from Sanity
      plants = await withSanityErrorHandling(
        async () => {
          if (query) {
            return await client.fetch(
              `*[_type == "plant" && (name match $queryString || scientificName match $queryString || description match $queryString)]{
                _id,
                name,
                scientificName,
                slug,
                description,
                publishedAt,
                medicinalProperties,
                cultivationTips,
                "image": mainImage.asset->url
              }`,
              { queryString: `*${query}*` }
            );
          } else {
            return await client.fetch(PLANTS_QUERY);
          }
        },
        getFallbackPlants() // Use fallback data if fetch fails
      );
    } else {
      // Connection failed, use fallback data
      console.warn("Using fallback plant data due to Sanity connection issues");
      plants = getFallbackPlants();
    }

    return (
      <>
        <HeroSection query={query} />
        <CategoriesSection />
        <FeaturedPlants plants={plants} query={query} />
      </>
    );
  } catch (error) {
    console.error("Error in Home page:", error);
    return (
      <div className="section_container py-16">
        <div className="bg-white p-10 rounded-lg border border-[var(--color-card-stroke-primary)] text-center">
          <h1 className="title-primary text-red-500 mb-6">Connection Issue</h1>
          <p className="body-text-secondary mb-6">
            We encountered an error connecting to our content database.
            This might be due to network issues or temporary service disruption.
          </p>
          <div className="max-w-xl mx-auto p-4 bg-amber-50 border-l-4 border-amber-400 text-left">
            <h3 className="font-medium mb-2">Troubleshooting tips:</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Check your internet connection</li>
              <li>Ensure your firewall isn&apos;t blocking the connection</li>
              <li>Try refreshing the page</li>
              <li>If problems persist, it might be a temporary service outage</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
