'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Grid3X3,
  ZoomIn,
  Share2,
  Check,
  ImageIcon
} from 'lucide-react';

interface PropertyImageGalleryProps {
  images: string[];
  title: string;
  className?: string;
  showCount?: number; // Number of images to show in main view
}

export const PropertyImageGallery: React.FC<PropertyImageGalleryProps> = ({
  images,
  title,
  className = '',
  showCount = 3 // Changed default to 3 for cleaner preview
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Ensure we have at least one image
  const safeImages = images.filter(img => img && img.trim() !== '');

  const openModal = useCallback((imageIndex = 0) => {
    setCurrentImageIndex(imageIndex);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % safeImages.length);
  }, [safeImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  }, [safeImages.length]);

  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  // Touch gesture handlers for mobile swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(0); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && safeImages.length > 1) {
      nextImage();
    }
    if (isRightSwipe && safeImages.length > 1) {
      prevImage();
    }
  }, [touchStart, touchEnd, nextImage, prevImage, safeImages.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeModal, prevImage, nextImage]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleShare = useCallback(async () => {
    const currentImageUrl = safeImages[currentImageIndex];
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} - Image ${currentImageIndex + 1}`,
          url: currentImageUrl,
        });
      } catch (error) {
        console.log('Share cancelled or failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(currentImageUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
      }
    }
  }, [safeImages, currentImageIndex, title]);

  // Early return after all hooks are defined
  if (safeImages.length === 0) {
    return null;
  }

  return (
    <>
      {/* Main Gallery Grid */}
      <div className={`mb-8 ${className}`}>
        {/* Desktop Grid Layout - Clean Preview with Limited Images */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-3 h-[400px] rounded-xl overflow-hidden">
          {/* Main Hero Image - Left Half */}
          <motion.div 
            className="col-span-2 row-span-2 relative cursor-pointer group rounded-lg overflow-hidden shadow-lg"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            onClick={() => openModal(0)}
          >
            <Image
              src={safeImages[0]}
              alt={`${title} - Main view`}
              fill
              className="object-cover transition-all duration-300 group-hover:brightness-110"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
              <motion.div 
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
              >
                <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg">
                  <ZoomIn className="w-6 h-6 text-gray-700" />
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right side: Show limited images with overlay on last visible image */}
          {safeImages.slice(1, showCount).map((image, index) => {
            const imageIndex = index + 1;
            const isLastVisibleImage = imageIndex === showCount - 1 && safeImages.length > showCount;
            
            return (
              <motion.div 
                key={imageIndex}
                className="relative cursor-pointer group rounded-lg overflow-hidden shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => openModal(isLastVisibleImage ? 0 : imageIndex)}
              >
                <Image
                  src={image}
                  alt={`${title} - View ${imageIndex + 1}`}
                  fill
                  className="object-cover transition-all duration-300 group-hover:brightness-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                
                {/* Show More Photos Overlay on Last Visible Image */}
                {isLastVisibleImage && (
                  <motion.div 
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-white transition-all duration-300 hover:bg-black/80"
                    initial={{ opacity: 0.85 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.div
                      className="text-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Grid3X3 className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-lg font-bold mb-1">
                        +{safeImages.length - showCount + 1}
                      </div>
                      <div className="text-sm font-medium opacity-90">
                        more photo{safeImages.length - showCount + 1 !== 1 ? 's' : ''}
                      </div>
                    </motion.div>
                    
                    {/* Enhanced border on hover */}
                    <motion.div 
                      className="absolute inset-0 border-2 border-white/30 rounded-lg pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                )}
                
                {/* Regular hover effect for non-overlay images */}
                {!isLastVisibleImage && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <motion.div 
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                    >
                      <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
                        <ZoomIn className="w-4 h-4 text-gray-700" />
                      </div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Fill remaining grid spaces if we have fewer images than showCount */}
          {safeImages.length < showCount && Array.from({ length: showCount - safeImages.length }).map((_, index) => (
            <div 
              key={`placeholder-${index}`}
              className="relative bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center"
            >
              <div className="text-center text-gray-400">
                <ImageIcon className="w-5 h-5 mx-auto mb-1 opacity-40" />
                <div className="text-xs font-medium opacity-60">More photos</div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Single Image with Dynamic Overlay */}
        <div className="md:hidden">
          <motion.div 
            className="relative h-64 rounded-xl overflow-hidden cursor-pointer group"
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal(0)}
          >
            <Image
              src={safeImages[0]}
              alt={title}
              fill
              className="object-cover transition-all duration-300 group-active:brightness-110"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Dynamic photo count overlay */}
            <div className="absolute bottom-4 right-4">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(0);
                }}
                className="bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2.5 rounded-xl font-medium shadow-lg flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid3X3 className="w-4 h-4" />
                <span>
                  {safeImages.length > 1 
                    ? `View all ${safeImages.length}` 
                    : 'View photo'
                  }
                </span>
              </motion.button>
            </div>

            {/* Photo count indicator */}
            <div className="absolute top-4 right-4">
              <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
                1 / {safeImages.length}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-Screen Modal Gallery */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.button
                    onClick={closeModal}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.button>
                  <div className="text-white">
                    <h3 className="font-semibold text-lg">{title}</h3>
                    <p className="text-sm text-white/70">
                      {currentImageIndex + 1} of {safeImages.length}
                      <span className="hidden sm:inline"> • Use arrow keys or swipe to navigate</span>
                      <span className="sm:hidden"> • Swipe to navigate</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={handleShare}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Share image"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Share2 className="w-5 h-5 text-white" />
                    )}
                  </motion.button>
                  {/* Mobile: Show current image counter */}
                  <div className="md:hidden ml-2 px-3 py-1 bg-black/20 rounded-full">
                    <span className="text-white text-sm font-medium">
                      {currentImageIndex + 1}/{safeImages.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Image Display */}
            <div 
              className="flex items-center justify-center h-full pt-20 pb-24 px-4"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <motion.div
                key={currentImageIndex}
                className="relative max-w-full max-h-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={safeImages[currentImageIndex]}
                  alt={`${title} - Image ${currentImageIndex + 1}`}
                  width={1200}
                  height={800}
                  className="object-contain max-w-full max-h-full rounded-lg"
                  priority
                  sizes="100vw"
                  onLoadStart={() => setIsLoading(true)}
                  onLoad={() => setIsLoading(false)}
                />
                
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-lg">
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            {safeImages.length > 1 && (
              <>
                <motion.button
                  onClick={prevImage}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full transition-all duration-200 group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-white" />
                </motion.button>

                <motion.button
                  onClick={nextImage}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full transition-all duration-200 group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-white" />
                </motion.button>
              </>
            )}

            {/* Bottom Thumbnail Strip */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex justify-center">
                <div className="flex gap-2 max-w-full overflow-x-auto pb-2 scrollbar-hide">
                  {safeImages.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 cursor-pointer ${
                        index === currentImageIndex 
                          ? 'border-white shadow-lg' 
                          : 'border-transparent hover:border-white/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className={`object-cover transition-all duration-200 ${
                          index === currentImageIndex ? 'opacity-100' : 'opacity-70 hover:opacity-90'
                        }`}
                        sizes="64px"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Click outside to close */}
            <div 
              className="absolute inset-0 -z-10"
              onClick={closeModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PropertyImageGallery;
