'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import Image from 'next/image';
import { 
  X, 
  GripVertical, 
  Star,
  ImagePlus,
  AlertCircle,
  Check,
  Loader2
} from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  alt?: string;
  isHero?: boolean;
  isUploading?: boolean;
  uploadProgress?: number;
}

interface UltimateDragGalleryProps {
  images: GalleryImage[];
  onImagesReorder: (reorderedImages: GalleryImage[]) => void;
  onImageRemove?: (imageId: string) => void;
  onImageUpload?: (files: FileList) => Promise<void>;
  onHeroChange?: (imageId: string) => void;
  maxImages?: number;
  allowUpload?: boolean;
  allowRemove?: boolean;
  allowHeroSelection?: boolean;
  className?: string;
  aspectRatio?: 'square' | 'landscape' | 'portrait';
  gridCols?: number;
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  title?: string;
}

// Individual draggable image item with Framer Motion Reorder
function DraggableImageItem({
  image,
  index,
  onRemove,
  onHeroToggle,
  allowRemove = true,
  allowHeroSelection = true,
  aspectRatio = 'landscape',
}: {
  image: GalleryImage;
  index: number;
  onRemove?: (id: string) => void;
  onHeroToggle?: (id: string) => void;
  allowRemove?: boolean;
  allowHeroSelection?: boolean;
  aspectRatio?: 'square' | 'landscape' | 'portrait';
}) {
  const aspectRatioClasses = {
    square: 'aspect-square',
    landscape: 'aspect-[4/3]',
    portrait: 'aspect-[3/4]',
  };

  return (
    <Reorder.Item
      value={image}
      id={image.id}
      dragControls={undefined}
      dragListener={!image.isUploading}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileDrag={{ scale: 1.05, rotate: 5, zIndex: 1000 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`
        relative group rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer
        ${image.isUploading
          ? 'border-primary-500 shadow-2xl' 
          : 'border-neutral-200 hover:border-primary-300 hover:shadow-lg'
        }
        ${image.isHero ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}
        ${image.isUploading ? 'pointer-events-none' : ''}
      `}
      style={{
        touchAction: 'none', // Prevent touch scroll interference
      }}
      role="listitem"
      aria-label={`${image.alt || `Gallery image ${index + 1}`}${image.isHero ? ' (Hero image)' : ''}`}
    >
      {/* Image Container */}
      <div className={`relative ${aspectRatioClasses[aspectRatio]} bg-neutral-100 select-none`}>
        <Image
          src={image.url}
          alt={image.alt || `Gallery image ${index + 1}`}
          fill
          className={`object-cover transition-all duration-300 select-none ${
            image.isUploading 
              ? 'opacity-50 blur-sm' 
              : 'group-hover:scale-105'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />

        {/* Upload Progress Overlay */}
        {image.isUploading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/30 backdrop-blur-sm flex items-center justify-center z-10"
          >
            <div className="text-center text-white">
              {/* Circular Progress Ring */}
              <div className="relative w-20 h-20 mx-auto mb-3">
                <svg 
                  className="w-20 h-20 transform -rotate-90" 
                  viewBox="0 0 100 100"
                >
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="6"
                    fill="none"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - (image.uploadProgress || 0) / 100)}`}
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
                {/* Percentage Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {image.uploadProgress === 100 ? (
                    <Check className="w-6 h-6 text-green-400" />
                  ) : (
                    <span className="text-lg font-bold text-white drop-shadow-lg">
                      {Math.round(image.uploadProgress || 0)}%
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold drop-shadow">
                  {image.uploadProgress === 100 ? 'Upload Complete!' : 'Uploading...'}
                </p>
                <div className="w-32 bg-white/30 rounded-full h-1 mx-auto">
                  <div 
                    className="bg-white h-1 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${image.uploadProgress || 0}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Drag Handle - Always visible for better UX */}
        {!image.isUploading && (
          <div className="absolute top-2 left-2 p-2 bg-black/60 backdrop-blur-sm rounded-lg cursor-grab active:cursor-grabbing transition-all duration-200 opacity-70 group-hover:opacity-100">
            <GripVertical className="w-4 h-4 text-white" />
          </div>
        )}

        {/* Hero Badge */}
        {image.isHero && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg"
          >
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-900 fill-current" />
              <span className="text-xs font-bold text-yellow-900">HERO</span>
            </div>
          </motion.div>
        )}

        {/* Action Controls Overlay */}
        {!image.isUploading && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
              {/* Image Index */}
              <div className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs font-medium text-white">
                #{index + 1}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                {allowHeroSelection && !image.isHero && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onHeroToggle?.(image.id);
                    }}
                    className="p-1.5 bg-white/20 backdrop-blur-sm hover:bg-yellow-400/90 rounded-lg 
                             transition-all duration-200 group/btn focus-visible:outline-none 
                             focus-visible:ring-2 focus-visible:ring-white/50"
                    title="Set as hero image"
                    aria-label="Set as hero image"
                  >
                    <Star className="w-3 h-3 text-white group-hover/btn:text-yellow-900 transition-colors" />
                  </button>
                )}
                
                {allowRemove && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove?.(image.id);
                    }}
                    className="p-1.5 bg-white/20 backdrop-blur-sm hover:bg-red-500/90 rounded-lg 
                             transition-all duration-200 group/btn focus-visible:outline-none 
                             focus-visible:ring-2 focus-visible:ring-white/50"
                    title="Remove image"
                    aria-label="Remove image"
                  >
                    <X className="w-3 h-3 text-white group-hover/btn:text-red-100 transition-colors" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Reorder.Item>
  );
}

// Enhanced upload zone
function UploadZone({ 
  onUpload, 
  maxImages, 
  currentCount,
  aspectRatio = 'landscape',
  isUploading = false
}: { 
  onUpload: (files: FileList) => void;
  maxImages: number;
  currentCount: number;
  aspectRatio?: 'square' | 'landscape' | 'portrait';
  isUploading?: boolean;
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canUpload = currentCount < maxImages && !isUploading;

  const aspectRatioClasses = {
    square: 'aspect-square',
    landscape: 'aspect-[4/3]',
    portrait: 'aspect-[3/4]',
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (canUpload) setIsDragOver(true);
  }, [canUpload]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (canUpload && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
    }
  }, [canUpload, onUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (canUpload && e.target.files?.length) {
      onUpload(e.target.files);
      // Reset input for consecutive uploads
      e.target.value = '';
    }
  }, [canUpload, onUpload]);

  const handleClick = useCallback(() => {
    if (canUpload) {
      fileInputRef.current?.click();
    }
  }, [canUpload]);

  if (!canUpload && currentCount >= maxImages) {
    return (
      <div className={`
        relative ${aspectRatioClasses[aspectRatio]} bg-neutral-50 border-2 border-dashed 
        border-neutral-200 rounded-xl flex items-center justify-center
      `}>
        <div className="text-center text-neutral-400">
          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm font-medium">Maximum {maxImages} images</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: canUpload ? 1.02 : 1 }}
      whileTap={{ scale: canUpload ? 0.98 : 1 }}
      onClick={handleClick}
      className={`
        relative ${aspectRatioClasses[aspectRatio]} border-2 border-dashed rounded-xl 
        transition-all duration-300 cursor-pointer overflow-hidden select-none
        ${canUpload
          ? isDragOver
            ? 'border-primary-500 bg-primary-50 scale-105 shadow-lg'
            : 'border-neutral-300 hover:border-primary-400 hover:bg-primary-25 hover:shadow-md'
          : 'border-neutral-200 bg-neutral-50 cursor-not-allowed'
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInput}
        className="hidden"
        aria-label="Upload new images"
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        {isUploading ? (
          <div className="text-center">
            <Loader2 className="w-8 h-8 mx-auto mb-2 text-primary-500 animate-spin" />
            <p className="text-sm text-primary-600 font-medium">Processing...</p>
          </div>
        ) : (
          <div className={`text-center transition-colors duration-300 ${
            canUpload ? 'text-neutral-500' : 'text-neutral-400'
          }`}>
            <ImagePlus className={`w-8 h-8 mx-auto mb-2 transition-all duration-300 ${
              isDragOver ? 'scale-110 text-primary-500' : ''
            }`} />
            <p className="text-sm font-medium">
              {isDragOver ? 'Drop images here' : 'Upload images'}
            </p>
            <p className="text-xs opacity-75 mt-1">
              {maxImages - currentCount} remaining
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Main Ultimate Drag Gallery Component
export default function UltimateDragGallery({
  images,
  onImagesReorder,
  onImageRemove,
  onImageUpload,
  onHeroChange,
  maxImages = 10,
  allowUpload = true,
  allowRemove = true,
  allowHeroSelection = false,
  className = '',
  aspectRatio = 'landscape',
  gridCols = 3,
  headingLevel = 'h3',
  title = 'Image Gallery',
}: UltimateDragGalleryProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleReorder = useCallback((newOrder: GalleryImage[]) => {
    // Ensure we only reorder non-uploading images
    onImagesReorder(newOrder);
  }, [onImagesReorder]);

  const handleUpload = useCallback(async (files: FileList) => {
    if (!onImageUpload || isUploading) return;
    
    setUploadError(null); // Clear previous error
    setIsUploading(true);
    try {
      await onImageUpload(files);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadError(
        "Image upload failed. Please check your connection and try again. If the problem persists, contact support."
      );
    } finally {
      setIsUploading(false);
    }
  }, [onImageUpload, isUploading]);

  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  } as const;

  const normalizedGridCols = Math.max(1, Math.min(gridCols, 6)) as keyof typeof gridColsClass;

  // Dynamic heading component
  const HeadingComponent = headingLevel;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <HeadingComponent className="text-lg font-semibold text-neutral-900">
            {title}
          </HeadingComponent>
          <p className="text-sm text-neutral-600">
            {images.filter(img => !img.isUploading).length} of {maxImages} images • Drag to reorder
          </p>
        </div>
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">{uploadError}</p>
          <button
            onClick={() => setUploadError(null)}
            className="ml-auto p-1 hover:bg-red-100 rounded-full transition-colors"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4 text-red-500" />
          </button>
        </div>
      )}

      {/* Gallery Grid with Framer Motion Reorder */}
      <div className="relative">
        <Reorder.Group 
          values={images} 
          onReorder={handleReorder}
          className={`
            grid gap-4 
            ${gridColsClass[normalizedGridCols]}
          `}
          as="div"
          role="list"
          aria-label="Image gallery"
        >
          <AnimatePresence mode="popLayout">
            {images.map((image, index) => (
              <DraggableImageItem
                key={image.id}
                image={image}
                index={index}
                onRemove={onImageRemove}
                onHeroToggle={onHeroChange}
                allowRemove={allowRemove}
                allowHeroSelection={allowHeroSelection}
                aspectRatio={aspectRatio}
              />
            ))}
            
            {/* Upload Zone */}
            {allowUpload && (
              <UploadZone
                key="upload-zone"
                onUpload={handleUpload}
                maxImages={maxImages}
                currentCount={images.filter(img => !img.isUploading).length}
                aspectRatio={aspectRatio}
                isUploading={isUploading}
              />
            )}
          </AnimatePresence>
        </Reorder.Group>
      </div>

      {/* Empty State */}
      {images.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 border-2 border-dashed border-neutral-200 rounded-xl"
        >
          <ImagePlus className="w-12 h-12 mx-auto text-neutral-400 mb-3" />
          <h4 className="text-lg font-medium text-neutral-600 mb-2">No images yet</h4>
          <p className="text-sm text-neutral-500">
            Upload your first image to get started
          </p>
        </motion.div>
      )}

      {/* Accessibility Instructions */}
      <div className="sr-only" aria-live="polite">
        {images.length > 0 && (
          <span>
            Image gallery with {images.length} images. Use mouse or touch to drag and reorder images.
          </span>
        )}
      </div>
    </div>
  );
}
