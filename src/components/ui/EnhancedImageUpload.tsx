'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { 
  Upload, 
  X, 
  Star,
  Check,
  Loader2,
  AlertCircle,
  ImagePlus,
  Zap,
  GripVertical,
  Eye
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

interface EnhancedImageUploadProps {
  images: Array<{ id: string; url: string; isHero?: boolean }>;
  onImagesChange: (images: Array<{ id: string; url: string; isHero?: boolean }>) => void;
  onHeroChange?: (imageId: string) => void;
  maxImages?: number;
  folder: string;
  baseName: string;
  compressionMode?: 'property' | 'hero' | 'thumbnail';
  className?: string;
  allowHeroSelection?: boolean;
  title?: string;
}

export const EnhancedImageUpload: React.FC<EnhancedImageUploadProps> = ({
  images,
  onImagesChange,
  onHeroChange,
  maxImages = 10,
  folder,
  baseName,
  compressionMode = 'property',
  className = '',
  allowHeroSelection = true,
  title = 'Upload Images'
}) => {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
              progress: Math.min(50, progress.progress * 0.5), // Compression is first 50%
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
              enableCompression: false, // Already compressed
              onProgress: (uploadProgress) => {
                setUploadingFiles(prev => prev.map(uploadFile => 
                  uploadFile.id === uploadFileId ? {
                    ...uploadFile,
                    uploadProgress,
                    progress: 50 + (uploadProgress * 0.5), // Upload is second 50%
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

          // Add to images list
          const newImage = {
            id: uploadFileId,
            url: downloadURL,
            isHero: images.length === 0 && allowHeroSelection // First image becomes hero
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

  const handleReorder = useCallback((newOrder: Array<{ id: string; url: string; isHero?: boolean }>) => {
    onImagesChange(newOrder);
  }, [onImagesChange]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const openPreview = useCallback((imageUrl: string) => {
    setPreviewImage(imageUrl);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewImage(null);
  }, []);

  const remainingSlots = maxImages - images.length;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
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
                Add Property Images
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
            
            <div className="text-sm text-gray-500">
              <p>• Supports JPEG, PNG, WebP</p>
              <p>• Images will be automatically compressed</p>
              <p>• Maximum {remainingSlots} more image{remainingSlots !== 1 ? 's' : ''}</p>
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
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <motion.div
                      className={`h-2 rounded-full ${
                        uploadFile.status === 'complete' ? 'bg-green-500' :
                        uploadFile.status === 'error' ? 'bg-red-500' :
                        'bg-primary-500'
                      }`}
                      style={{ width: `${uploadFile.progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  {/* Status and Details */}
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-4">
                      {uploadFile.status === 'compressing' && (
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          Compressing...
                        </span>
                      )}
                      {uploadFile.status === 'uploading' && (
                        <span className="flex items-center gap-1">
                          <Upload className="w-3 h-3" />
                          Uploading...
                        </span>
                      )}
                      {uploadFile.status === 'complete' && uploadFile.compressionSavings && (
                        <span className="flex items-center gap-1 text-green-600">
                          <Check className="w-3 h-3" />
                          Saved {Math.round(uploadFile.compressionSavings.savedPercentage)}%
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
                          <span className="text-green-600">
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

      {/* Existing Images Grid */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <span>Uploaded Images</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {images.length}
              </span>
            </h4>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <GripVertical className="w-4 h-4" />
              <span className="hidden sm:inline">Drag to reorder • Click controls to manage</span>
              <span className="sm:hidden">Drag to sort</span>
            </div>
          </div>
          <Reorder.Group 
            axis="x" 
            values={images} 
            onReorder={handleReorder}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            as="div"
            layoutScroll
          >
            {images.map((image, index) => (
              <Reorder.Item
                key={image.id}
                value={image}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileDrag={{ 
                  scale: 1.05, 
                  zIndex: 50,
                  rotate: 2,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                transition={{ duration: 0.2 }}
                className="relative group cursor-grab active:cursor-grabbing"
              >
                <div className={`aspect-square bg-gray-100 rounded-lg overflow-hidden relative border-2 transition-all duration-200 ${
                  isDragging ? 'border-primary-400 shadow-lg' : 'border-transparent group-hover:border-primary-300'
                }`}>
                  <SafeImage
                    src={image.url}
                    alt={`Property image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-200"
                    priority={index === 0 && image.isHero} // Prioritize hero image loading
                    onLoad={() => {
                      console.log('Image loaded successfully:', image.url);
                    }}
                    onError={() => {
                      console.error('Image load error:', image.url);
                    }}
                  />
                  
                  {/* Drag Handle - Always visible for better UX */}
                  <div className="absolute top-2 right-2">
                    <div className="bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-md border border-gray-200/50 cursor-grab active:cursor-grabbing hover:bg-white hover:shadow-lg transition-all duration-200">
                      <GripVertical className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>

                  {/* Top Controls Bar */}
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openPreview(image.url)}
                        className="p-2 bg-white/90 backdrop-blur-sm text-gray-700 rounded-lg shadow-sm border border-gray-200/50 hover:bg-white transition-all duration-200"
                        title="Preview image"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {allowHeroSelection && (
                        <button
                          onClick={() => setAsHero(image.id)}
                          className={`p-2 rounded-lg shadow-sm border transition-all duration-200 ${
                            image.isHero
                              ? 'bg-yellow-500 text-white border-yellow-600'
                              : 'bg-white/90 backdrop-blur-sm text-gray-700 border-gray-200/50 hover:bg-white'
                          }`}
                          title={image.isHero ? 'Hero image' : 'Set as hero image'}
                        >
                          <Star className="w-4 h-4" fill={image.isHero ? 'currentColor' : 'none'} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Remove Button - Bottom Right */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => removeImage(image.id)}
                      className="p-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 transition-all duration-200"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Hero Badge */}
                {image.isHero && (
                  <div className="absolute bottom-2 left-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                    <Star className="w-3 h-3" fill="currentColor" />
                    <span className="font-medium">Hero</span>
                  </div>
                )}
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      )}

      {/* Image Preview Modal */}
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
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {previewImage && (
                <SafeImage
                  src={previewImage}
                  alt="Preview"
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px"
                  className="object-contain max-w-full max-h-full rounded-lg"
                  onError={() => {
                    console.error('Preview image load error:', previewImage);
                  }}
                  priority
                />
              )}
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

export default EnhancedImageUpload;
