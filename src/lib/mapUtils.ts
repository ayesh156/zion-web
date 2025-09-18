/**
 * Utility functions for handling Google Maps embed URLs and iframe codes
 */

export interface MapEmbedResult {
  success: boolean;
  embedUrl?: string;
  error?: string;
  originalInput?: string;
}

/**
 * Extract and validate Google Maps embed URL from various input formats
 * Supports: iframe code, direct embed URLs, regular Google Maps URLs
 */
export function processMapInput(input: string): MapEmbedResult {
  if (!input || !input.trim()) {
    return {
      success: false,
      error: 'Please provide a Google Maps URL or embed code',
      originalInput: input
    };
  }

  const trimmedInput = input.trim();

  // 1. Check if it's an iframe embed code and extract the src
  if (trimmedInput.includes('<iframe') && trimmedInput.includes('src=')) {
    const srcMatch = trimmedInput.match(/src=["']([^"']+)["']/);
    if (srcMatch && srcMatch[1]) {
      const extractedSrc = srcMatch[1];
      if (isValidGoogleMapsEmbedUrl(extractedSrc)) {
        return {
          success: true,
          embedUrl: extractedSrc,
          originalInput: input
        };
      }
    }
    return {
      success: false,
      error: 'Invalid iframe code. Please make sure it\'s from Google Maps.',
      originalInput: input
    };
  }

  // 2. Check if it's already a Google Maps embed URL
  if (trimmedInput.includes('www.google.com/maps/embed')) {
    if (isValidGoogleMapsEmbedUrl(trimmedInput)) {
      return {
        success: true,
        embedUrl: trimmedInput,
        originalInput: input
      };
    }
    return {
      success: false,
      error: 'Invalid Google Maps embed URL format.',
      originalInput: input
    };
  }

  // 3. Check if it's a regular Google Maps URL (convert to embed)
  if (trimmedInput.includes('google.com/maps') || trimmedInput.includes('maps.app.goo.gl')) {
    const convertedUrl = convertToEmbedUrl(trimmedInput);
    if (convertedUrl) {
      return {
        success: true,
        embedUrl: convertedUrl,
        originalInput: input
      };
    }
    return {
      success: false,
      error: 'Could not convert this Google Maps URL to embed format.',
      originalInput: input
    };
  }

  return {
    success: false,
    error: 'Please provide a valid Google Maps URL or embed code.',
    originalInput: input
  };
}

/**
 * Validate if a URL is a proper Google Maps embed URL
 */
function isValidGoogleMapsEmbedUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'www.google.com' && 
           urlObj.pathname.startsWith('/maps/embed');
  } catch {
    return false;
  }
}

/**
 * Convert regular Google Maps URLs to embed format
 */
function convertToEmbedUrl(url: string): string | null {
  try {
    // Handle coordinates in URL (@lat,lng format)
    const coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      const [, lat, lng] = coordMatch;
      return `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1000!2d${lng}!3d${lat}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM${encodeURIComponent(lat)}N%20${encodeURIComponent(lng)}E!5e0!3m2!1sen!2s!4v${Date.now()}!5m2!1sen!2s`;
    }

    // Handle place URLs
    const placeMatch = url.match(/\/place\/([^\/\?]+)/);
    if (placeMatch) {
      const place = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
      return `https://www.google.com/maps/embed/v1/place?key=&q=${encodeURIComponent(place)}`;
    }

    // Handle short URLs (maps.app.goo.gl)
    if (url.includes('maps.app.goo.gl') || url.includes('goo.gl')) {
      return `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1000!2d0!3d0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(url)}!5e0!3m2!1sen!2s!4v${Date.now()}!5m2!1sen!2s`;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Extract meaningful location info from Google Maps URL for display
 */
export function extractLocationInfo(url: string): { 
  name?: string; 
  coordinates?: { lat: number; lng: number }; 
  address?: string 
} {
  if (!url) return {};

  // Extract coordinates
  const coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (coordMatch) {
    const [, lat, lng] = coordMatch;
    return {
      coordinates: { lat: parseFloat(lat), lng: parseFloat(lng) }
    };
  }

  // Extract place name
  const placeMatch = url.match(/\/place\/([^\/\?]+)/);
  if (placeMatch) {
    const place = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
    return {
      name: place,
      address: place
    };
  }

  return {};
}

/**
 * Generate user-friendly instructions for getting Google Maps embed code
 */
export const MAP_EMBED_INSTRUCTIONS = {
  title: "How to add your location:",
  steps: [
    "Go to Google Maps (maps.google.com)",
    "Search for your property location",
    "Click 'Share' → 'Embed a map'",
    "Copy the iframe code or just the src URL",
    "Paste it in the field below"
  ],
  tip: "You can paste either the full iframe code or just the src URL - both work!",
  examples: {
    iframe: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12..." width="600" height="450"></iframe>`,
    url: `https://www.google.com/maps/embed?pb=!1m18!1m12...`
  }
};
