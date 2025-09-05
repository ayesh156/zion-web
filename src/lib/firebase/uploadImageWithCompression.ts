import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { 
  compressImage, 
  CompressionOptions, 
  validateImageFile,
  getOptimalCompressionOptions
} from '../imageCompression';

export interface UploadResult {
  originalFile: File;
  compressedFile: File;
  downloadURL: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  uploadPath: string;
}

export interface UploadOptions {
  enableCompression?: boolean;
  compressionOptions?: CompressionOptions;
  compressionMode?: 'property' | 'hero' | 'thumbnail';
  onProgress?: (progress: number) => void;
  onCompressionProgress?: (progress: number) => void;
  maxRetries?: number;
}

/**
 * Enhanced Firebase upload with automatic image compression
 */
export async function uploadImageToFirebase(
  file: File, 
  folder: string, 
  baseName: string,
  options: UploadOptions = {}
): Promise<string> {
  const {
    enableCompression = true,
    compressionOptions,
    compressionMode = 'property',
    onProgress,
    onCompressionProgress,
    maxRetries = 3
  } = options;

  // Validate file
  const validation = validateImageFile(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  let fileToUpload = file;
  
  // Compress image if enabled
  if (enableCompression) {
    try {
      onCompressionProgress?.(0);
      
      const compressionOpts = compressionOptions || 
        getOptimalCompressionOptions(file, compressionMode);
      
      const compressionResult = await compressImage(
        file, 
        compressionOpts, 
        onCompressionProgress
      );
      
      fileToUpload = compressionResult.compressedFile;
      console.log(`Image compressed: ${file.name}`, {
        originalSize: compressionResult.originalSize,
        compressedSize: compressionResult.compressedSize,
        ratio: compressionResult.compressionRatio,
      });
    } catch (error) {
      console.warn('Compression failed, uploading original file:', error);
      // Continue with original file if compression fails
    }
  }

  // Upload to Firebase
  const storage = getStorage();
  const fileExtension = fileToUpload.name.split('.').pop() || 'jpg';
  const uniqueName = `${baseName}-${uuidv4()}.${fileExtension}`;
  const storageRef = ref(storage, `${folder}/${uniqueName}`);
  
  let lastError: Error | undefined;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      onProgress?.(0);
      await uploadBytes(storageRef, fileToUpload);
      onProgress?.(100);
      return await getDownloadURL(storageRef);
    } catch (error) {
      lastError = error as Error;
      console.warn(`Upload attempt ${attempt} failed:`, error);
      
      if (attempt < maxRetries) {
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }
  
  if (lastError) {
    throw new Error(`Upload failed after ${maxRetries} attempts: ${lastError.message}`);
  } else {
    throw new Error(`Upload failed after ${maxRetries} attempts: Unknown error`);
  }
}

/**
 * Upload multiple images with compression and progress tracking
 */
export async function uploadMultipleImages(
  files: File[],
  folder: string,
  baseName: string,
  options: UploadOptions & {
    onFileProgress?: (fileIndex: number, progress: number) => void;
    onFileComplete?: (fileIndex: number, result: UploadResult) => void;
    onFileError?: (fileIndex: number, error: Error) => void;
  } = {}
): Promise<UploadResult[]> {
  const {
    onFileProgress,
    onFileComplete,
    onFileError,
    ...uploadOptions
  } = options;

  const results: UploadResult[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    try {
      // Track compression progress
      const compressionStartSize = file.size;
      let compressedFile = file;
      let compressionRatio = 0;
      
      const downloadURL = await uploadImageToFirebase(
        file,
        folder,
        `${baseName}-${i}`,
        {
          ...uploadOptions,
          onProgress: (progress) => onFileProgress?.(i, progress),
          onCompressionProgress: (progress) => {
            // Compression is first 50% of total progress
            onFileProgress?.(i, progress * 0.5);
          }
        }
      );
      
      // If compression was enabled, get the compressed file info
      if (uploadOptions.enableCompression !== false) {
        const compressionOpts = uploadOptions.compressionOptions || 
          getOptimalCompressionOptions(file, uploadOptions.compressionMode || 'property');
        
        try {
          const compressionResult = await compressImage(file, compressionOpts);
          compressedFile = compressionResult.compressedFile;
          compressionRatio = compressionResult.compressionRatio;
        } catch (error) {
          console.warn('Failed to get compression info:', error);
        }
      }
      
      const result: UploadResult = {
        originalFile: file,
        compressedFile,
        downloadURL,
        originalSize: compressionStartSize,
        compressedSize: compressedFile.size,
        compressionRatio,
        uploadPath: `${folder}/${baseName}-${i}`,
      };
      
      results.push(result);
      onFileComplete?.(i, result);
      
    } catch (error) {
      console.error(`Failed to upload file ${i} (${file.name}):`, error);
      onFileError?.(i, error as Error);
      // Continue with other files
    }
  }
  
  return results;
}

/**
 * Get optimized upload options for different use cases
 */
export function getUploadOptions(useCase: 'property' | 'hero' | 'thumbnail' | 'avatar'): UploadOptions {
  const baseOptions: UploadOptions = {
    enableCompression: true,
    maxRetries: 3,
  };

  switch (useCase) {
    case 'property':
      return {
        ...baseOptions,
        compressionMode: 'property',
        compressionOptions: {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          quality: 0.8,
          useWebWorker: true,
        },
      };
      
    case 'hero':
      return {
        ...baseOptions,
        compressionMode: 'hero',
        compressionOptions: {
          maxSizeMB: 2,
          maxWidthOrHeight: 2560,
          quality: 0.85,
          useWebWorker: true,
        },
      };
      
    case 'thumbnail':
      return {
        ...baseOptions,
        compressionMode: 'thumbnail',
        compressionOptions: {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 500,
          quality: 0.7,
          useWebWorker: true,
        },
      };
      
    case 'avatar':
      return {
        ...baseOptions,
        compressionOptions: {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 400,
          quality: 0.8,
          useWebWorker: true,
        },
      };
      
    default:
      return baseOptions;
  }
}

/**
 * Legacy function for backward compatibility
 * Now includes compression by default
 */
export async function uploadImageToFirebaseLegacy(
  file: File, 
  folder: string, 
  baseName: string
): Promise<string> {
  return uploadImageToFirebase(file, folder, baseName, {
    enableCompression: true,
    compressionMode: 'property',
  });
}
