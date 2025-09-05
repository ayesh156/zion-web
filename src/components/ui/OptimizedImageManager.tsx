'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { 
  Upload, 
  X, 
  Star,
  Check,
  Loader2,
  AlertCircle,
  ImagePlus,
  GripVertical,
  Eye,
  Zap,
  Info
} from 'lucide-react';
import { compressImages, CompressionProgress, formatFileSize, calculateSavings } from '@/lib/imageCompression';
import { uploadImageToFirebase } from '@/lib/firebase/uploadImageWithCompression';
import { SafeImage } from './SafeImage';

interface UploadingFile {
  file: File;
  id: string;
  progress: number;
  status: 'compressing' | 'uploading' | 'complete' | 'error';
  compressionProgress?: number;
  uploadProgress?: number;
  compressedSize?: number;
  downloadURL?: string;
  error?: string;
  compressionSavings?: {
    savedBytes: number;
    savedPercentage: number;
    ratio: string;
  };
}

interface ImageData {
  id: string;
  url: string;
  isHero?: boolean;
  originalSize?: number;
  compressedSize?: number;
  uploadDate?: Date;
}

interface OptimizedImageManagerProps {
  images: ImageData[];
  onImagesChange: (images: ImageData[]) => void;
  onHeroChange?: (imageId: string) => void;
  maxImages?: number;
  folder: string;
  baseName: string;
  compressionMode?: 'property' | 'hero' | 'thumbnail';
  className?: string;
  allowHeroSelection?: boolean;
  title?: string;
  showCompressionStats?: boolean;
}

export const OptimizedImageManager: React.FC<OptimizedImageManagerProps> = ({
  images,
  onImagesChange,
  onHeroChange,
  maxImages = 10,
  folder,
  baseName,
  compressionMode = 'property',
  className = '',
  allowHeroSelection = true,
  title = 'Image Manager',
  showCompressionStats = true
}) => {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewImage, setPreviewImage] = useState<ImageData | null>(null);
  const [totalCompressionSavings, setTotalCompressionSavings] = useState({ bytes: 0, percentage: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate total compression savings
  useEffect(() => {
    if (!showCompressionStats) return;
    
    const savings = images.reduce((acc, img) => {
      if (img.originalSize && img.compressedSize) {
        acc.bytes += (img.originalSize - img.compressedSize);
      }
      return acc;
    }, { bytes: 0, percentage: 0 });

    const totalOriginal = images.reduce((acc, img) => acc + (img.originalSize || 0), 0);
    if (totalOriginal > 0) {
      savings.percentage = (savings.bytes / totalOriginal) * 100;
    }

    setTotalCompressionSavings(savings);
  }, [images, showCompressionStats]);

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const remainingSlots = maxImages - images.length;
    const filesToProcess = fileArray.slice(0, remainingSlots);

    if (filesToProcess.length === 0) return;

    // Initialize uploading files state
    const initialUploadingFiles: UploadingFile[] = filesToProcess.map(file => ({
      file,
      id: `upload-${Date.now()}-${Math.random()}`,
      progress: 0,
      status: 'compressing',
      compressionProgress: 0,
      uploadProgress: 0,
    }));

    setUploadingFiles(initialUploadingFiles);

    try {
      // Step 1: Compress all images with progress tracking
      const compressionResults = await compressImages(
        filesToProcess,
        compressionMode === 'hero' ? { maxSizeMB: 2, maxWidthOrHeight: 2560, quality: 0.85 } :
        compressionMode === 'thumbnail' ? { maxSizeMB: 0.2, maxWidthOrHeight: 500, quality: 0.7 } :
        { maxSizeMB: 1, maxWidthOrHeight: 1920, quality: 0.8 },
        (fileIndex: number, progress: CompressionProgress) => {
          setUploadingFiles(prev => prev.map((uploadFile, index) => 
            index === fileIndex ? {
              ...uploadFile,
              compressionProgress: progress.progress,
              progress: Math.min(50, progress.progress * 0.5),
              status: progress.stage === 'complete' ? 'uploading' : 'compressing',
              compressedSize: progress.compressedSize,
              error: progress.error
            } : uploadFile
          ));
        }
      );

      // Step 2: Upload compressed images to Firebase
      for (let i = 0; i < compressionResults.length; i++) {
        const result = compressionResults[i];
        const uploadFileId = initialUploadingFiles[i].id;

        try {
          const downloadURL = await uploadImageToFirebase(
            result.compressedFile,
            folder,
            `${baseName}-${Date.now()}-${i}`,
            {
              enableCompression: false,
              onProgress: (uploadProgress) => {
                setUploadingFiles(prev => prev.map(uploadFile => 
                  uploadFile.id === uploadFileId ? {
                    ...uploadFile,
                    uploadProgress,
                    progress: 50 + (uploadProgress * 0.5),
                    status: uploadProgress === 100 ? 'complete' : 'uploading'
                  } : uploadFile
                ));
              }
            }
          );

          // Calculate compression savings
          const savings = calculateSavings(result.originalSize, result.compressedSize);

          // Update state with completion
          setUploadingFiles(prev => prev.map(uploadFile => 
            uploadFile.id === uploadFileId ? {
              ...uploadFile,
              downloadURL,
              progress: 100,
              status: 'complete',
              compressionSavings: savings
            } : uploadFile
          ));

          // Add to images list with additional metadata
          const newImage: ImageData = {
            id: uploadFileId,
            url: downloadURL,
            isHero: images.length === 0 && allowHeroSelection,
            originalSize: result.originalSize,
            compressedSize: result.compressedSize,
            uploadDate: new Date()
          };

          onImagesChange([...images, newImage]);

        } catch (error) {
          console.error('Upload failed:', error);
          setUploadingFiles(prev => prev.map(uploadFile => 
            uploadFile.id === uploadFileId ? {
              ...uploadFile,
              status: 'error',
              error: error instanceof Error ? error.message : 'Upload failed'
            } : uploadFile
          ));
        }
      }

    } catch (error) {
      console.error('Compression failed:', error);
      setUploadingFiles(prev => prev.map(uploadFile => ({
        ...uploadFile,
        status: 'error',
        error: error instanceof Error ? error.message : 'Compression failed'
      })));
    }

    // Clear completed uploads after a delay
    setTimeout(() => {
      setUploadingFiles(prev => prev.filter(file => file.status !== 'complete'));
    }, 3000);
  }, [images, maxImages, folder, baseName, compressionMode, allowHeroSelection, onImagesChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeImage = useCallback((imageId: string) => {
    const updatedImages = images.filter(img => img.id !== imageId);
    onImagesChange(updatedImages);
  }, [images, onImagesChange]);

  const setAsHero = useCallback((imageId: string) => {
    if (!allowHeroSelection) return;
    
    const updatedImages = images.map(img => ({
      ...img,
      isHero: img.id === imageId
    }));
    onImagesChange(updatedImages);
    onHeroChange?.(imageId);
  }, [images, allowHeroSelection, onImagesChange, onHeroChange]);

  const handleReorder = useCallback((newOrder: ImageData[]) => {
    onImagesChange(newOrder);
  }, [onImagesChange]);

  const openPreview = useCallback((image: ImageData) => {
    setPreviewImage(image);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewImage(null);
  }, []);

  const remainingSlots = maxImages - images.length;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {showCompressionStats && totalCompressionSavings.bytes > 0 && (
            <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
              <Zap className="w-4 h-4" />
              Saved {formatFileSize(totalCompressionSavings.bytes)} ({Math.round(totalCompressionSavings.percentage)}%)
            </p>
          )}
        </div>
        <div className="text-sm text-gray-600">
          {images.length} / {maxImages} images
        </div>
      </div>

      {/* Upload Area */}
      {remainingSlots > 0 && (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            isDragOver
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <ImagePlus className="w-8 h-8 text-gray-600" />
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Upload Images
              </h4>
              <p className="text-gray-600 mb-4">
                Drag and drop images here, or click to browse
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Browse Files
              </button>
            </div>
            
            <div className="text-sm text-gray-500 space-y-1">
              <p>• Auto-compressed for optimal performance</p>
              <p>• Supports JPEG, PNG, WebP formats</p>
              <p>• {remainingSlots} more image{remainingSlots !== 1 ? 's' : ''} allowed</p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {uploadingFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Processing Images</h4>
          {uploadingFiles.map((uploadFile) => (
            <motion.div
              key={uploadFile.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {uploadFile.status === 'complete' ? (
                    <Check className="w-6 h-6 text-green-600" />
                  ) : uploadFile.status === 'error' ? (
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  ) : (
                    <Loader2 className="w-6 h-6 text-primary-600 animate-spin" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {uploadFile.file.name}
                    </p>
                    <span className="text-sm text-gray-600">
                      {Math.round(uploadFile.progress)}%
                    </span>
                  </div>
                  
                  {/* Enhanced Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <motion.div
                      className={`h-3 rounded-full ${
                        uploadFile.status === 'complete' ? 'bg-green-500' :
                        uploadFile.status === 'error' ? 'bg-red-500' :
                        'bg-gradient-to-r from-primary-500 to-primary-600'
                      }`}
                      style={{ width: `${uploadFile.progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  {/* Detailed Status */}
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-4">
                      {uploadFile.status === 'compressing' && (
                        <span className="flex items-center gap-1 text-blue-600">
                          <Zap className="w-3 h-3" />
                          Optimizing image quality...
                        </span>
                      )}
                      {uploadFile.status === 'uploading' && (
                        <span className="flex items-center gap-1 text-purple-600">
                          <Upload className="w-3 h-3" />
                          Uploading to cloud...
                        </span>
                      )}
                      {uploadFile.status === 'complete' && uploadFile.compressionSavings && (
                        <span className="flex items-center gap-1 text-green-600">
                          <Check className="w-3 h-3" />
                          Optimized • {Math.round(uploadFile.compressionSavings.savedPercentage)}% smaller
                        </span>
                      )}
                      {uploadFile.status === 'error' && (
                        <span className="text-red-600">
                          {uploadFile.error}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span>{formatFileSize(uploadFile.file.size)}</span>
                      {uploadFile.compressedSize && (
                        <>
                          <span>→</span>
                          <span className="text-green-600 font-medium">
                            {formatFileSize(uploadFile.compressedSize)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Image Gallery with Reordering */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Image Gallery</h4>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <GripVertical className="w-4 h-4" />
              Drag to reorder
            </span>
          </div>
          
          <Reorder.Group 
            axis="x" 
            values={images} 
            onReorder={handleReorder}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {images.map((image, index) => (
              <Reorder.Item
                key={image.id}
                value={image}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                className="relative group cursor-grab active:cursor-grabbing"
              >
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                  <SafeImage
                    src={image.url}
                    alt={`Image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                    onLoad={() => {
                      console.log('Image loaded successfully:', image.url);
                    }}
                    onError={() => {
                      console.error('Image load error:', image.url);
                    }}
                  />
                  
                  {/* Drag Handle */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-black bg-opacity-50 p-1 rounded">
                      <GripVertical className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                    <button
                      onClick={() => openPreview(image)}
                      className="p-2 bg-white text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                      title="Preview image"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {allowHeroSelection && (
                      <button
                        onClick={() => setAsHero(image.id)}
                        className={`p-2 rounded-full transition-colors ${
                          image.isHero
                            ? 'bg-yellow-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                        title={image.isHero ? 'Hero image' : 'Set as hero image'}
                      >
                        <Star className="w-4 h-4" fill={image.isHero ? 'currentColor' : 'none'} />
                      </button>
                    )}
                    <button
                      onClick={() => removeImage(image.id)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Hero Badge */}
                {image.isHero && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" fill="currentColor" />
                    Hero
                  </div>
                )}

                {/* Compression Info Badge */}
                {showCompressionStats && image.originalSize && image.compressedSize && (
                  <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    -{Math.round(((image.originalSize - image.compressedSize) / image.originalSize) * 100)}%
                  </div>
                )}
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      )}

      {/* Enhanced Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={closePreview}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-full bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {previewImage?.url && (
                  <SafeImage
                    src={previewImage.url}
                    alt="Preview"
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px"
                    className="object-contain max-w-full max-h-[70vh]"
                    onError={() => {
                      console.error('Preview image load error:', previewImage.url);
                    }}
                    priority
                  />
                )}
                
                {/* Image Info Overlay */}
                {showCompressionStats && (previewImage.originalSize || previewImage.compressedSize) && (
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white p-3 rounded-lg text-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4" />
                      <span className="font-medium">Image Info</span>
                    </div>
                    {previewImage.originalSize && (
                      <div>Original: {formatFileSize(previewImage.originalSize)}</div>
                    )}
                    {previewImage.compressedSize && (
                      <div>Compressed: {formatFileSize(previewImage.compressedSize)}</div>
                    )}
                    {previewImage.originalSize && previewImage.compressedSize && (
                      <div className="text-green-400">
                        Saved: {Math.round(((previewImage.originalSize - previewImage.compressedSize) / previewImage.originalSize) * 100)}%
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <button
                onClick={closePreview}
                className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OptimizedImageManager;
