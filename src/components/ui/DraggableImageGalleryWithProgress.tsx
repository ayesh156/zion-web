'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import { 
  X, 
  GripVertical, 
  Upload,
  Star,
  Move,
  ImagePlus,
  AlertCircle,
} from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  alt?: string;
  isHero?: boolean;
  isUploading?: boolean;
  uploadProgress?: number;
}

interface DraggableImageGalleryProps {
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
}

// Enhanced draggable image item with upload progress
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: image.id,
    disabled: image.isUploading
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const aspectRatioClasses = {
    square: 'aspect-square',
    landscape: 'aspect-[4/3]',
    portrait: 'aspect-[3/4]',
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`
        relative group rounded-xl overflow-hidden border-2 transition-all duration-300
        ${isDragging 
          ? 'border-primary-500 shadow-2xl scale-105 rotate-3 z-50' 
          : 'border-neutral-200 hover:border-primary-300 hover:shadow-lg'
        }
        ${image.isHero ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}
        ${image.isUploading ? 'pointer-events-none' : ''}
      `}
    >
      {/* Image Container */}
      <div className={`relative ${aspectRatioClasses[aspectRatio]} bg-neutral-100`}>
        <Image
          src={image.url}
          alt={image.alt || `Gallery image ${index + 1}`}
          fill
          className={`object-cover transition-all duration-300 ${
            image.isUploading 
              ? 'opacity-50 blur-sm' 
              : isDragging 
                ? 'opacity-70' 
                : 'group-hover:scale-105'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                  <span className="text-lg font-bold text-white drop-shadow-lg">
                    {Math.round(image.uploadProgress || 0)}%
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold drop-shadow">Uploading image</p>
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

        {/* Drag Handle */}
        {!image.isUploading && (
          <div
            {...attributes}
            {...listeners}
            className={`
              absolute top-2 left-2 p-2 bg-black/50 backdrop-blur-sm rounded-lg
              cursor-grab active:cursor-grabbing transition-all duration-200
              ${isDragging ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100'}
              hover:bg-black/70 focus-visible:opacity-100 focus-visible:outline-none 
              focus-visible:ring-2 focus-visible:ring-white/50
            `}
            tabIndex={0}
            role="button"
            aria-label={`Drag to reorder image ${index + 1}`}
          >
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
          <div className={`
            absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
            transition-opacity duration-300
            ${isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
          `}>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
              {/* Image Index */}
              <div className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs font-medium text-white">
                #{index + 1}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                {allowHeroSelection && !image.isHero && (
                  <button
                    onClick={() => onHeroToggle?.(image.id)}
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
                    onClick={() => onRemove?.(image.id)}
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

        {/* Dragging State Overlay */}
        {isDragging && (
          <div className="absolute inset-0 bg-primary-500/30 border-2 border-dashed border-primary-400 rounded-lg flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="p-3 bg-primary-500 rounded-full shadow-xl"
            >
              <Move className="w-5 h-5 text-white" />
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Enhanced drag overlay with better visual feedback
function DragOverlayComponent({ 
  image, 
  aspectRatio = 'landscape' 
}: { 
  image: GalleryImage | null;
  aspectRatio?: 'square' | 'landscape' | 'portrait';
}) {
  if (!image) return null;

  const aspectRatioClasses = {
    square: 'aspect-square',
    landscape: 'aspect-[4/3]',
    portrait: 'aspect-[3/4]',
  };

  return (
    <motion.div 
      initial={{ scale: 1.1, rotate: 5 }}
      animate={{ scale: 1.15, rotate: 8 }}
      className="relative w-48 rounded-xl overflow-hidden border-2 border-primary-500 shadow-2xl"
    >
      <div className={`relative ${aspectRatioClasses[aspectRatio]} bg-neutral-100`}>
        <Image
          src={image.url}
          alt={image.alt || 'Dragging image'}
          fill
          className="object-cover opacity-90"
          sizes="192px"
        />
        <div className="absolute inset-0 bg-primary-500/20 border-2 border-dashed border-primary-400" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-2 bg-primary-500/80 rounded-full">
            <Move className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced upload zone with better UX
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
  const canUpload = currentCount < maxImages && !isUploading;

  const aspectRatioClasses = {
    square: 'aspect-square',
    landscape: 'aspect-[4/3]',
    portrait: 'aspect-[3/4]',
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (canUpload) setIsDragOver(true);
  }, [canUpload]);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (canUpload && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
    }
  }, [canUpload, onUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (canUpload && e.target.files?.length) {
      onUpload(e.target.files);
    }
  }, [canUpload, onUpload]);

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
      className={`
        relative ${aspectRatioClasses[aspectRatio]} border-2 border-dashed rounded-xl 
        transition-all duration-300 cursor-pointer overflow-hidden
        ${canUpload
          ? isDragOver
            ? 'border-primary-500 bg-primary-50 scale-105'
            : 'border-neutral-300 hover:border-primary-400 hover:bg-primary-25'
          : 'border-neutral-200 bg-neutral-50 cursor-not-allowed'
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInput}
        disabled={!canUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        aria-label="Upload new images"
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        {isUploading ? (
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 mx-auto mb-2"
            >
              <Upload className="w-8 h-8 text-primary-500" />
            </motion.div>
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

// Main component
export default function DraggableImageGallery({
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
}: DraggableImageGalleryProps) {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const activeItem = images.find(img => img.id === event.active.id);
    setActiveImage(activeItem || null);
  }, [images]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveImage(null);

    if (active.id !== over?.id) {
      const oldIndex = images.findIndex(img => img.id === active.id);
      const newIndex = images.findIndex(img => img.id === over?.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const reorderedImages = arrayMove(images, oldIndex, newIndex);
        onImagesReorder(reorderedImages);
      }
    }
  }, [images, onImagesReorder]);

  const handleUpload = useCallback(async (files: FileList) => {
    if (!onImageUpload || isUploading) return;
    
    setIsUploading(true);
    try {
      await onImageUpload(files);
    } catch (error) {
      console.error('Upload failed:', error);
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
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">
            Image Gallery
          </h3>
          <p className="text-sm text-neutral-600">
            {images.length} of {maxImages} images • Drag to reorder
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className={`
          grid gap-4 
          ${gridColsClass[Math.min(gridCols, 6) as keyof typeof gridColsClass]}
        `}>
          <SortableContext items={images.map(img => img.id)} strategy={rectSortingStrategy}>
            <AnimatePresence>
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
            </AnimatePresence>
          </SortableContext>

          {/* Upload Zone */}
          {allowUpload && (
            <UploadZone
              onUpload={handleUpload}
              maxImages={maxImages}
              currentCount={images.length}
              aspectRatio={aspectRatio}
              isUploading={isUploading}
            />
          )}
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          <DragOverlayComponent image={activeImage} aspectRatio={aspectRatio} />
        </DragOverlay>
      </DndContext>

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
    </div>
  );
}
