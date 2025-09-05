'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
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
  Upload, 
  Star, 
  Eye,
  Move,
  ImageIcon,
  RotateCcw
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

// Individual draggable image item
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
  } = useSortable({ id: image.id });

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
      `}
    >
      {/* Image Container */}
      <div className={`relative ${aspectRatioClasses[aspectRatio]} bg-neutral-100`}>
        <Image
          src={image.url}
          alt={image.alt || `Gallery image ${index + 1}`}
          fill
          className={`
            object-cover transition-all duration-300
            ${isDragging ? 'opacity-70' : 'group-hover:scale-105'}
          `}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className={`
            absolute top-2 left-2 p-1.5 bg-black/50 backdrop-blur-sm rounded-lg
            cursor-grab active:cursor-grabbing transition-all duration-200
            ${isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
          `}
        >
          <Move className="w-4 h-4 text-white" />
        </div>

        {/* Hero Badge */}
        {image.isHero && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg shadow-lg">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-900 fill-current" />
              <span className="text-xs font-bold text-yellow-900">HERO</span>
            </div>
          </div>
        )}

        {/* Overlay Controls */}
        <div className={`
          absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
          transition-opacity duration-300
          ${isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
        `}>
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
            {/* Index Number */}
            <div className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs font-medium text-white">
              #{index + 1}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              {allowHeroSelection && !image.isHero && (
                <button
                  onClick={() => onHeroToggle?.(image.id)}
                  className="p-1.5 bg-white/20 backdrop-blur-sm hover:bg-yellow-400/80 rounded-lg transition-colors"
                  title="Set as hero image"
                >
                  <Star className="w-3 h-3 text-white hover:text-yellow-900" />
                </button>
              )}
              
              {allowRemove && (
                <button
                  onClick={() => onRemove?.(image.id)}
                  className="p-1.5 bg-white/20 backdrop-blur-sm hover:bg-red-500/80 rounded-lg transition-colors"
                  title="Remove image"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dragging State Overlay */}
        {isDragging && (
          <div className="absolute inset-0 bg-primary-500/20 border-2 border-dashed border-primary-500 rounded-lg flex items-center justify-center">
            <div className="p-3 bg-primary-500 rounded-full shadow-lg">
              <Move className="w-5 h-5 text-white" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Drag overlay component
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
    <div className="relative w-48 rounded-xl overflow-hidden border-2 border-primary-500 shadow-2xl rotate-6 scale-110">
      <div className={`relative ${aspectRatioClasses[aspectRatio]} bg-neutral-100`}>
        <Image
          src={image.url}
          alt={image.alt || 'Dragging image'}
          fill
          className="object-cover opacity-90"
          sizes="192px"
        />
        <div className="absolute inset-0 bg-primary-500/20 border-2 border-dashed border-primary-500" />
      </div>
    </div>
  );
}

// Upload zone component
function UploadZone({ 
  onUpload, 
  maxImages, 
  currentCount,
  aspectRatio = 'landscape' 
}: { 
  onUpload: (files: FileList) => void;
  maxImages: number;
  currentCount: number;
  aspectRatio?: 'square' | 'landscape' | 'portrait';
}) {
  const canUpload = currentCount < maxImages;

  const aspectRatioClasses = {
    square: 'aspect-square',
    landscape: 'aspect-[4/3]',
    portrait: 'aspect-[3/4]',
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
    }
  };

  if (!canUpload) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        relative ${aspectRatioClasses[aspectRatio]} 
        border-2 border-dashed border-neutral-300 rounded-xl
        hover:border-primary-400 hover:bg-primary-50/50
        transition-all duration-300 group cursor-pointer
      `}
    >
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 group-hover:text-primary-600 transition-colors">
        <div className="p-3 bg-neutral-100 group-hover:bg-primary-100 rounded-full mb-3 transition-colors">
          <Upload className="w-6 h-6" />
        </div>
        <span className="text-sm font-medium mb-1">Upload Images</span>
        <span className="text-xs text-neutral-400">
          {maxImages - currentCount} more allowed
        </span>
      </div>
    </motion.div>
  );
}

// Main gallery component
export default function DraggableImageGallery({
  images,
  onImagesReorder,
  onImageRemove,
  onImageUpload,
  onHeroChange,
  maxImages = 10,
  allowUpload = true,
  allowRemove = true,
  allowHeroSelection = true,
  className = '',
  aspectRatio = 'landscape',
  gridCols = 3,
}: DraggableImageGalleryProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

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
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = images.findIndex((item) => item.id === active.id);
      const newIndex = images.findIndex((item) => item.id === over?.id);

      const reorderedImages = arrayMove(images, oldIndex, newIndex);
      onImagesReorder(reorderedImages);
    }

    setActiveId(null);
  }, [images, onImagesReorder]);

  const handleImageRemove = useCallback((imageId: string) => {
    onImageRemove?.(imageId);
  }, [onImageRemove]);

  const handleHeroToggle = useCallback((imageId: string) => {
    onHeroChange?.(imageId);
  }, [onHeroChange]);

  const activeImage = images.find((image) => image.id === activeId);

  const gridColsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Gallery Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-800">
            Image Gallery ({images.length}/{maxImages})
          </h3>
          <p className="text-sm text-neutral-600">
            Drag and drop to reorder images. The first image will be used as the main property image.
          </p>
        </div>
        
        {images.length > 0 && (
          <button
            onClick={() => onImagesReorder([...images].reverse())}
            className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            title="Reverse order"
          >
            <RotateCcw className="w-4 h-4" />
            Reverse
          </button>
        )}
      </div>

      {/* Drag and Drop Context */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={images.map(img => img.id)} strategy={rectSortingStrategy}>
          <div className={`grid gap-4 ${gridColsClasses[gridCols as keyof typeof gridColsClasses] || gridColsClasses[3]}`}>
            {/* Existing Images */}
            {images.map((image, index) => (
              <DraggableImageItem
                key={image.id}
                image={image}
                index={index}
                onRemove={allowRemove ? handleImageRemove : undefined}
                onHeroToggle={allowHeroSelection ? handleHeroToggle : undefined}
                allowRemove={allowRemove}
                allowHeroSelection={allowHeroSelection}
                aspectRatio={aspectRatio}
              />
            ))}

            {/* Upload Zone */}
            {allowUpload && onImageUpload && (
              <UploadZone
                onUpload={onImageUpload}
                maxImages={maxImages}
                currentCount={images.length}
                aspectRatio={aspectRatio}
              />
            )}
          </div>
        </SortableContext>

        {/* Drag Overlay */}
        <DragOverlay>
          <DragOverlayComponent image={activeImage || null} aspectRatio={aspectRatio} />
        </DragOverlay>
      </DndContext>

      {/* Empty State */}
      {images.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 border-2 border-dashed border-neutral-200 rounded-xl"
        >
          <div className="mx-auto w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
            <ImageIcon className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-800 mb-2">No images yet</h3>
          <p className="text-neutral-600 mb-4">
            Upload your first image to get started
          </p>
          {allowUpload && onImageUpload && (
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors cursor-pointer">
              <Upload className="w-4 h-4" />
              Upload Images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => e.target.files && onImageUpload(e.target.files)}
                className="hidden"
              />
            </label>
          )}
        </motion.div>
      )}

      {/* Instructions */}
      {images.length > 1 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-blue-100 rounded">
              <Eye className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Gallery Tips</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Drag images to reorder them</li>
                <li>• Click the star to set a hero image</li>
                <li>• The first image is used as the main property photo</li>
                {allowRemove && <li>• Click <FaTimes className="inline w-3 h-3" /> to remove unwanted images</li>}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
