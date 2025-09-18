import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';

export async function deleteImageFromFirebase(imageUrl: string) {
  try {
    // Extract the storage path from the URL
    const storagePath = getStoragePathFromUrl(imageUrl);
    if (!storagePath) {
      console.warn('Could not extract storage path from URL:', imageUrl);
      return { success: false, error: 'Invalid storage path' };
    }
    
    console.log(`Attempting to delete image: ${storagePath}`);
    const imageRef = ref(storage, storagePath);
    await deleteObject(imageRef);
    console.log('Image deleted successfully:', storagePath);
    return { success: true };
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: unknown }).code === 'storage/object-not-found'
    ) {
      console.warn('Image already deleted or does not exist:', imageUrl);
      return { success: true }; // Consider this a success since the image is gone
    } else {
      const errorMessage =
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
          ? (error as { message: string }).message
          : 'Unknown error';
      console.error('Error deleting image:', error);
      return { success: false, error: errorMessage };
    }
  }
}

// Helper to check if URL is a Firebase Storage URL
export function isFirebaseStorageUrl(url: string): boolean {
  return url.includes('firebasestorage.googleapis.com') || url.includes('firebase');
}

// Extract storage path from Firebase URL
export function getStoragePathFromUrl(url: string): string | null {
  try {
    console.log('Parsing Firebase URL:', url);
    
    // Handle different Firebase Storage URL formats
    const patterns = [
      // Standard format: https://firebasestorage.googleapis.com/v0/b/bucket/o/path%2Ffile.jpg?alt=media&token=...
      /firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\/([^?]+)/,
      // Alternative format: https://storage.googleapis.com/bucket/path/file.jpg
      /storage\.googleapis\.com\/[^/]+\/(.+?)(?:\?|$)/,
      // Firebase console download format
      /firebasestorage\.googleapis\.com.*\/o\/([^?]+)/,
      // Direct storage format
      /gs:\/\/[^/]+\/(.+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        let path = decodeURIComponent(match[1]);
        // Remove any remaining query parameters
        path = path.split('?')[0];
        console.log('Extracted storage path:', path);
        return path;
      }
    }

    console.warn('Could not extract path from URL:', url);
    return null;
  } catch (error) {
    console.error('Error parsing Firebase URL:', error);
    return null;
  }
}

// Batch delete multiple images
export async function batchDeleteImages(imageUrls: string[]): Promise<{ successful: number; failed: number; errors: string[] }> {
  const errors: string[] = [];
  
  const deletionResults = await Promise.allSettled(
    imageUrls
      .filter(url => isFirebaseStorageUrl(url))
      .map(async url => {
        const result = await deleteImageFromFirebase(url);
        if (!result.success && result.error) {
          errors.push(`Failed to delete ${url}: ${result.error}`);
        }
        return result;
      })
  );

  const successful = deletionResults.filter(r => 
    r.status === 'fulfilled' && r.value.success
  ).length;
  const failed = deletionResults.length - successful;

  if (failed > 0) {
    console.error(`Failed to delete ${failed} out of ${imageUrls.length} images`);
  }

  return { successful, failed, errors };
}

// Clean up all images from a property
export async function cleanupPropertyImages(property: { images: { hero: string; gallery: string[] } }): Promise<{ success: boolean; deletedCount: number; errors: string[] }> {
  const allImages: string[] = [];
  const errors: string[] = [];
  
  // Add hero image if it exists
  if (property.images.hero && isFirebaseStorageUrl(property.images.hero)) {
    allImages.push(property.images.hero);
  }
  
  // Add gallery images if they exist
  if (property.images.gallery && Array.isArray(property.images.gallery)) {
    property.images.gallery.forEach(imageUrl => {
      if (imageUrl && isFirebaseStorageUrl(imageUrl)) {
        allImages.push(imageUrl);
      }
    });
  }
  
  if (allImages.length === 0) {
    console.log('No Firebase Storage images found for cleanup');
    return { success: true, deletedCount: 0, errors: [] };
  }

  console.log(`Cleaning up ${allImages.length} images for property deletion:`, allImages);
  
  try {
    const result = await batchDeleteImages(allImages);
    console.log(`Cleanup completed: ${result.successful} deleted, ${result.failed} failed`);
    
    if (result.failed > 0) {
      errors.push(`Failed to delete ${result.failed} out of ${allImages.length} images`);
      errors.push(...result.errors);
    }
    
    return {
      success: result.failed === 0,
      deletedCount: result.successful,
      errors
    };
  } catch (error) {
    const errorMessage = `Failed to cleanup property images: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(errorMessage);
    errors.push(errorMessage);
    
    return {
      success: false,
      deletedCount: 0,
      errors
    };
  }
}

// Compare and cleanup changed images between old and new property data
export async function cleanupChangedImages(
  oldProperty: { images: { hero: string; gallery: string[] } },
  newProperty: { images: { hero: string; gallery: string[] } }
): Promise<{ success: boolean; deletedCount: number; errors: string[] }> {
  const imagesToDelete: string[] = [];
  const errors: string[] = [];
  
  // Check hero image change
  if (oldProperty.images.hero && 
      oldProperty.images.hero !== newProperty.images.hero && 
      isFirebaseStorageUrl(oldProperty.images.hero)) {
    imagesToDelete.push(oldProperty.images.hero);
  }
  
  // Check gallery images that were removed
  if (oldProperty.images.gallery && Array.isArray(oldProperty.images.gallery)) {
    oldProperty.images.gallery.forEach(oldImageUrl => {
      if (oldImageUrl && 
          isFirebaseStorageUrl(oldImageUrl) && 
          (!newProperty.images.gallery || !newProperty.images.gallery.includes(oldImageUrl))) {
        imagesToDelete.push(oldImageUrl);
      }
    });
  }
  
  if (imagesToDelete.length === 0) {
    console.log('No changed images found for cleanup');
    return { success: true, deletedCount: 0, errors: [] };
  }

  console.log(`Cleaning up ${imagesToDelete.length} changed images:`, imagesToDelete);
  
  try {
    const result = await batchDeleteImages(imagesToDelete);
    console.log(`Changed images cleanup completed: ${result.successful} deleted, ${result.failed} failed`);
    
    if (result.failed > 0) {
      errors.push(`Failed to delete ${result.failed} out of ${imagesToDelete.length} changed images`);
      errors.push(...result.errors);
    }
    
    return {
      success: result.failed === 0,
      deletedCount: result.successful,
      errors
    };
  } catch (error) {
    const errorMessage = `Failed to cleanup changed images: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(errorMessage);
    errors.push(errorMessage);
    
    return {
      success: false,
      deletedCount: 0,
      errors
    };
  }
}