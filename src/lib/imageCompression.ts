import imageCompression from 'browser-image-compression';

// Cache for transparency check results to avoid repeated processing
const transparencyCache = new Map<string, boolean>();

// Minimum file size threshold for transparency checking (100KB)
// Below this size, the conversion savings would be minimal
const TRANSPARENCY_CHECK_THRESHOLD = 100 * 1024;

export interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  quality?: number;
  fileType?: string;
  preserveExif?: boolean;
}

export interface CompressionResult {
  originalFile: File;
  compressedFile: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  timeTaken: number;
}

export interface CompressionProgress {
  file: File;
  progress: number;
  stage: 'analyzing' | 'compressing' | 'complete' | 'error';
  originalSize: number;
  compressedSize?: number;
  error?: string;
}

/**
 * Default compression options optimized for property photos
 */
export const DEFAULT_COMPRESSION_OPTIONS: CompressionOptions = {
  maxSizeMB: 1, // 1MB max file size
  maxWidthOrHeight: 1920, // Max dimension for high-quality display
  useWebWorker: true, // Use web worker for better performance (handled internally by browser-image-compression)
  quality: 0.8, // 80% quality - good balance
  preserveExif: false, // Remove EXIF data to save space
};

/**
 * Aggressive compression for thumbnails or previews
 */
export const THUMBNAIL_COMPRESSION_OPTIONS: CompressionOptions = {
  maxSizeMB: 0.2, // 200KB max
  maxWidthOrHeight: 500,
  useWebWorker: true,
  quality: 0.7,
  preserveExif: false,
};

/**
 * High quality compression for hero images
 */
export const HERO_COMPRESSION_OPTIONS: CompressionOptions = {
  maxSizeMB: 2, // 2MB max for hero images
  maxWidthOrHeight: 2560,
  useWebWorker: true,
  quality: 0.85, // Higher quality for hero images
  preserveExif: false,
};

/**
 * Compress a single image file
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = DEFAULT_COMPRESSION_OPTIONS,
  onProgress?: (progress: number) => void
): Promise<CompressionResult> {
  const startTime = Date.now();
  const originalSize = file.size;

  try {
    // Determine optimal file type
    let targetFileType = options.fileType;
    if (!targetFileType) {
      // Convert PNG to JPEG for better compression unless transparency is needed
      if (file.type === 'image/png' && !await hasTransparencyOptimized(file)) {
        targetFileType = 'image/jpeg';
      } else if (file.type === 'image/webp') {
        targetFileType = 'image/webp';
      } else {
        targetFileType = 'image/jpeg';
      }
    }

    const compressionOptions = {
      ...options,
      fileType: targetFileType,
      onProgress: (progress: number) => {
        onProgress?.(progress);
      },
    };

    const compressedFile = await imageCompression(file, compressionOptions);
    const compressedSize = compressedFile.size;
    const timeTaken = Date.now() - startTime;
    const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;

    return {
      originalFile: file,
      compressedFile,
      originalSize,
      compressedSize,
      compressionRatio,
      timeTaken,
    };
  } catch (error) {
    throw new Error(`Compression failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Compress multiple images with progress tracking
 */
export async function compressImages(
  files: File[],
  options: CompressionOptions = DEFAULT_COMPRESSION_OPTIONS,
  onProgress?: (fileIndex: number, progress: CompressionProgress) => void
): Promise<CompressionResult[]> {
  const results: CompressionResult[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    try {
      // Notify start of compression
      onProgress?.(i, {
        file,
        progress: 0,
        stage: 'analyzing',
        originalSize: file.size,
      });

      const result = await compressImage(
        file,
        options,
        (progress) => {
          onProgress?.(i, {
            file,
            progress,
            stage: 'compressing',
            originalSize: file.size,
          });
        }
      );

      // Notify completion
      onProgress?.(i, {
        file,
        progress: 100,
        stage: 'complete',
        originalSize: result.originalSize,
        compressedSize: result.compressedSize,
      });

      results.push(result);
    } catch (error) {
      // Notify error
      onProgress?.(i, {
        file,
        progress: 0,
        stage: 'error',
        originalSize: file.size,
        error: error instanceof Error ? error.message : 'Compression failed',
      });
      
      // Continue with other files even if one fails
      console.error(`Failed to compress ${file.name}:`, error);
    }
  }

  return results;
}

/**
 * Optimized transparency check with caching and size threshold
 */
async function hasTransparencyOptimized(file: File): Promise<boolean> {
  // PERFORMANCE vs ACCURACY TRADE-OFF:
  // For small files, we skip the transparency check to improve performance.
  // This means small PNG files with transparency may be incorrectly converted to JPEG,
  // resulting in loss of transparency data. This optimization favors speed over accuracy.
  if (file.size < TRANSPARENCY_CHECK_THRESHOLD) {
    return false; // Assume no transparency for small files to enable JPEG conversion
  }

  // Create cache key based on file name, size, and last modified date
  const cacheKey = `${file.name}-${file.size}-${file.lastModified}`;
  
  // Check cache first
  if (transparencyCache.has(cacheKey)) {
    return transparencyCache.get(cacheKey)!;
  }

  // Perform transparency check
  const hasAlpha = await hasTransparency(file);
  
  // Cache the result
  transparencyCache.set(cacheKey, hasAlpha);
  
  // Clean up cache if it gets too large (keep last 100 entries)
  while (transparencyCache.size > 100) {
    const firstKey = transparencyCache.keys().next().value;
    if (firstKey) {
      transparencyCache.delete(firstKey);
    } else {
      break;
    }
  }
  
  return hasAlpha;
}

/**
 * Check if a PNG image has transparency
 */
async function hasTransparency(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData?.data;
      
      // Clean up the object URL
      URL.revokeObjectURL(url);
      
      if (!data) {
        resolve(false);
        return;
      }

      // Check alpha channel (every 4th value)
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] < 255) {
          resolve(true);
          return;
        }
      }
      resolve(false);
    };

    img.onerror = () => {
      // Clean up the object URL on error
      URL.revokeObjectURL(url);
      resolve(false);
    };
    
    img.src = url;
  });
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Calculate compression savings
 */
export function calculateSavings(originalSize: number, compressedSize: number): {
  savedBytes: number;
  savedPercentage: number;
  ratio: string;
} {
  const savedBytes = originalSize - compressedSize;
  const savedPercentage = (savedBytes / originalSize) * 100;
  const ratio = `${(originalSize / compressedSize).toFixed(1)}:1`;

  return {
    savedBytes,
    savedPercentage,
    ratio,
  };
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): {
  isValid: boolean;
  error?: string;
} {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxFileSize = 50 * 1024 * 1024; // 50MB

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Please upload a JPEG, PNG, or WebP image file.',
    };
  }

  if (file.size > maxFileSize) {
    return {
      isValid: false,
      error: 'File size must be less than 50MB.',
    };
  }

  return { isValid: true };
}

/**
 * Get optimal compression options based on image type and use case
 */
export function getOptimalCompressionOptions(
  file: File,
  useCase: 'property' | 'hero' | 'thumbnail' = 'property'
): CompressionOptions {
  const baseOptions = {
    property: DEFAULT_COMPRESSION_OPTIONS,
    hero: HERO_COMPRESSION_OPTIONS,
    thumbnail: THUMBNAIL_COMPRESSION_OPTIONS,
  }[useCase];

  // Adjust based on file type
  if (file.type === 'image/png') {
    return {
      ...baseOptions,
      quality: Math.min((baseOptions.quality || 0.8) + 0.1, 0.95), // Slightly higher quality for PNG
    };
  }

  if (file.type === 'image/webp') {
    return {
      ...baseOptions,
      fileType: 'image/webp', // Keep WebP format
      quality: (baseOptions.quality || 0.8) - 0.05, // WebP can handle slightly lower quality
    };
  }

  return baseOptions;
}

/**
 * Clear the transparency cache for memory management
 * Useful when processing is complete or memory needs to be freed
 */
export function clearTransparencyCache(): void {
  transparencyCache.clear();
}

/**
 * Get transparency cache statistics for monitoring
 */
export function getTransparencyCacheStats(): {
  size: number;
  memoryEstimate: string;
} {
  const entriesCount = transparencyCache.size;
  // Rough estimate: each cache entry is approximately 50-100 bytes
  const memoryBytes = entriesCount * 75;
  const memoryKB = memoryBytes / 1024;
  
  return {
    size: entriesCount,
    memoryEstimate: memoryKB > 1 ? `${memoryKB.toFixed(1)} KB` : `${memoryBytes} bytes`
  };
}
