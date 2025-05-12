import { client } from '@/sanity/lib/client';
import { sanityConfig } from '@/sanity/env';

/**
 * Tests the connection to Sanity and provides diagnostics
 * @returns Object containing connection status and diagnostic information
 */
export async function testSanityConnection() {
  try {
    // Simple query to test connection
    const result = await client.fetch(`*[_type == "plant"][0...1]`);
    return {
      success: true,
      message: 'Successfully connected to Sanity',
      data: result
    };
  } catch (error: any) {
    console.error('Sanity connection error:', error);
    
    // Provide detailed diagnostics
    let diagnostics = {
      errorType: error?.name || 'Unknown error',
      errorMessage: error?.message || 'No error message available',
      networkIssue: error?.code === 'ENOTFOUND' || 
                   (error?.message && error.message.includes('getaddrinfo')),
      config: {
        projectId: sanityConfig.projectId,
        dataset: sanityConfig.dataset,
        apiVersion: sanityConfig.apiVersion,
        useCdn: false
      },
      recommendations: [] as string[]
    };
    
    // Add specific recommendations based on error type
    if (diagnostics.networkIssue) {
      diagnostics.recommendations.push(
        'Check your internet connection',
        'Verify your Sanity project ID is correct',
        'Try using a direct API endpoint instead of CDN',
        'Check if your network blocks API requests to external services'
      );
    }
    
    if (error?.message?.includes('unauthorized')) {
      diagnostics.recommendations.push(
        'Verify your Sanity token has correct permissions',
        'Check if your token has expired'
      );
    }
    
    return {
      success: false,
      message: 'Failed to connect to Sanity',
      error: error?.message || 'Unknown error',
      diagnostics
    };
  }
}

/**
 * Provides fallback data when Sanity connection fails
 * @returns Fallback data for plants
 */
export function getFallbackPlants() {
  return [
    {
      _id: 'fallback-1',
      _type: 'plant',
      name: 'Tulsi (Holy Basil)',
      scientificName: 'Ocimum sanctum',
      description: 'Tulsi is revered in Ayurvedic medicine for its healing properties.',
      publishedAt: new Date().toISOString(),
      slug: { current: 'tulsi-holy-basil' },
      medicinalProperties: ['Respiratory conditions', 'Stress relief', 'Immune support'],
      cultivationTips: ['Well-draining soil', 'Full sun to partial shade', 'Regular watering']
    },
    {
      _id: 'fallback-2',
      _type: 'plant',
      name: 'Ashwagandha',
      scientificName: 'Withania somnifera',
      description: 'An adaptogenic herb used in traditional Ayurvedic medicine.',
      publishedAt: new Date().toISOString(),
      slug: { current: 'ashwagandha' },
      medicinalProperties: ['Stress relief', 'Energy enhancement', 'Immune support'],
      cultivationTips: ['Well-draining soil', 'Full sun', 'Moderate watering']
    }
  ];
}