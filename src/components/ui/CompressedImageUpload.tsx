'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Upload,
  Check,
  X,
  AlertCircle,
  Zap,
  FileImage,
  Trash2,
  Settings,
  Loader2,
} from 'lucide-react';
import {
  compressImages,
  CompressionResult,
  CompressionProgress,
  CompressionOptions,
  DEFAULT_COMPRESSION_OPTIONS,
  formatFileSize,
  calculateSavings,
  validateImageFile,
  getOptimalCompressionOptions,
} from '@/lib/imageCompression';

interface CompressedImageUploadProps {
  onImagesCompressed?: (results: CompressionResult[]) => void;
  onUpload?: (compressedFiles: File[]) => Promise<void>;
  maxImages?: number;
  compressionMode?: 'property' | 'hero' | 'thumbnail' | 'custom';
  customCompressionOptions?: CompressionOptions;
  allowedFormats?: string[];
  className?: string;
  showCompressionStats?: boolean;
  showPreview?: boolean;
  allowRemove?: boolean;
  onError?: (errors: string[]) => void;
  onUploadSuccess?: () => void;
}

interface CompressedImageItem extends CompressionResult {
  id: string;
  previewUrl: string;
  status: 'pending' | 'compressing' | 'compressed' | 'error';
  progress: number;
  error?: string;
}

interface ErrorState {
  id: string;
  message: string;
  timestamp: number;
}

export default function CompressedImageUpload({
  onImagesCompressed,
  onUpload,
  maxImages = 10,
  compressionMode = 'property',
  customCompressionOptions,
  allowedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  className = '',
  showCompressionStats = true,
  showPreview = true,
  allowRemove = true,
  onError,
  onUploadSuccess,
}: CompressedImageUploadProps) {
  const [images, setImages] = useState<CompressedImageItem[]>([]);
  const [errors, setErrors] = useState<ErrorState[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [compressionSettings, setCompressionSettings] = useState(
    customCompressionOptions || DEFAULT_COMPRESSION_OPTIONS
  );
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addError = useCallback((message: string) => {
    const error: ErrorState = {
      id: `error-${Date.now()}-${Math.random()}`,
      message,
      timestamp: Date.now(),
    };
    setErrors(prev => [...prev, error]);
    onError?.([message]);
    
    // Auto-remove error after 5 seconds
    setTimeout(() => {
      setErrors(prev => prev.filter(e => e.id !== error.id));
    }, 5000);
  }, [onError]);

  const removeError = useCallback((id: string) => {
    setErrors(prev => prev.filter(e => e.id !== id));
  }, []);

  const getCompressionOptions = useCallback((file: File): CompressionOptions => {
    if (customCompressionOptions) return customCompressionOptions;

    return getOptimalCompressionOptions(file, compressionMode === 'custom' ? 'property' : compressionMode);
  }, [compressionMode, customCompressionOptions]);

  const handleFileSelection = useCallback(async (files: FileList) => {
    const fileArray = Array.from(files);
    
    // Validate files
    const validFiles: File[] = [];
    const fileErrors: string[] = [];

    for (const file of fileArray) {
      const validation = validateImageFile(file);
      if (validation.isValid) {
        validFiles.push(file);
      } else {
        fileErrors.push(`${file.name}: ${validation.error}`);
      }
    }

    if (fileErrors.length > 0) {
      addError(`Some files were rejected: ${fileErrors.join(', ')}`);
    }

    if (validFiles.length === 0) return;

    // Check max images limit
    if (images.length + validFiles.length > maxImages) {
      addError(`Cannot upload more than ${maxImages} images. Please remove some images first.`);
      return;
    }

    // Create pending items
    const pendingItems: CompressedImageItem[] = validFiles.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      originalFile: file,
      compressedFile: file, // Temporarily set to original
      originalSize: file.size,
      compressedSize: file.size,
      compressionRatio: 0,
      timeTaken: 0,
      previewUrl: URL.createObjectURL(file),
      status: 'pending',
      progress: 0,
    }));

    setImages(prev => [...prev, ...pendingItems]);

    // Start compression
    try {
      const results = await compressImages(
        validFiles,
        getCompressionOptions(validFiles[0]),
        (fileIndex: number, progress: CompressionProgress) => {
          const targetItem = pendingItems[fileIndex];
          if (!targetItem) return;

          setImages(prev => prev.map(item => 
            item.id === targetItem.id
              ? {
                  ...item,
                  status: progress.stage === 'error' ? 'error' : 
                          progress.stage === 'complete' ? 'compressed' : 'compressing',
                  progress: progress.progress,
                  error: progress.error,
                  compressedSize: progress.compressedSize || item.compressedSize,
                }
              : item
          ));
        }
      );

      // Update with compression results
      setImages(prev => prev.map(item => {
        const result = results.find(r => r.originalFile.name === item.originalFile.name);
        if (result) {
          return {
            ...item,
            ...result,
            status: 'compressed',
            progress: 100,
          };
        }
        return item;
      }));

      onImagesCompressed?.(results);
    } catch (error) {
      console.error('Compression failed:', error);
      addError('Compression failed. Please try again.');
      
      // Mark failed items
      setImages(prev => prev.map(item => 
        pendingItems.some(p => p.id === item.id)
          ? { ...item, status: 'error', error: 'Compression failed' }
          : item
      ));
    }
  }, [images.length, maxImages, getCompressionOptions, onImagesCompressed, addError]);

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files);
    }
  }, [handleFileSelection]);

  const handleRemoveImage = useCallback((id: string) => {
    setImages(prev => {
      const item = prev.find(img => img.id === id);
      if (item) {
        URL.revokeObjectURL(item.previewUrl);
      }
      return prev.filter(img => img.id !== id);
    });
  }, []);

  const handleUpload = useCallback(async () => {
    if (!onUpload) return;
    
    const compressedFiles = images
      .filter(img => img.status === 'compressed')
      .map(img => img.compressedFile);

    if (compressedFiles.length === 0) {
      addError('No compressed images to upload');
      return;
    }

    setIsUploading(true);
    try {
      await onUpload(compressedFiles);
      // Clear images after successful upload
      images.forEach(img => URL.revokeObjectURL(img.previewUrl));
      setImages([]);
      onUploadSuccess?.();
    } catch (error) {
      console.error('Upload failed:', error);
      addError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }, [images, onUpload, addError, onUploadSuccess]);

  const totalOriginalSize = images.reduce((sum, img) => sum + img.originalSize, 0);
  const totalCompressedSize = images.reduce((sum, img) => sum + img.compressedSize, 0);
  const totalSavings = calculateSavings(totalOriginalSize, totalCompressedSize);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Inline Error Messages */}
      {errors.length > 0 && (
        <div className="space-y-2">
          <AnimatePresence>
            {errors.map((error) => (
              <motion.div
                key={error.id}
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start justify-between"
                role="alert"
                aria-live="polite"
              >
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error.message}</p>
                </div>
                <button
                  onClick={() => removeError(error.id)}
                  className="text-red-400 hover:text-red-600 transition-colors ml-2"
                  aria-label="Dismiss error"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Header with Settings */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary-500" />
            Smart Image Upload
          </h3>
          <p className="text-sm text-neutral-600">
            Auto-compress images for optimal storage • {images.length}/{maxImages} images
          </p>
        </div>
        {compressionMode === 'custom' && (
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
            title="Compression Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Compression Settings */}
      {showSettings && compressionMode === 'custom' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-neutral-50 rounded-xl p-4 border"
        >
          <h4 className="font-medium text-neutral-900 mb-3">Compression Settings</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Max File Size (MB)
              </label>
              <input
                type="number"
                value={compressionSettings.maxSizeMB || 1}
                onChange={(e) => {
                  const value = Math.max(0.1, Math.min(10, parseFloat(e.target.value) || 1));
                  setCompressionSettings(prev => ({
                    ...prev,
                    maxSizeMB: value
                  }));
                }}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                min="0.1"
                max="10"
                step="0.1"
                aria-describedby="max-size-help"
              />
              <p id="max-size-help" className="text-xs text-neutral-500 mt-1">
                Recommended: 1-2MB for properties, 0.2MB for thumbnails
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Max Dimension (px)
              </label>
              <input
                type="number"
                value={compressionSettings.maxWidthOrHeight || 1920}
                onChange={(e) => {
                  const value = Math.max(100, Math.min(4000, parseInt(e.target.value) || 1920));
                  setCompressionSettings(prev => ({
                    ...prev,
                    maxWidthOrHeight: value
                  }));
                }}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                min="100"
                max="4000"
                step="100"
                aria-describedby="max-dimension-help"
              />
              <p id="max-dimension-help" className="text-xs text-neutral-500 mt-1">
                1920px for properties, 500px for thumbnails
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Quality (0.1-1.0)
              </label>
              <input
                type="number"
                value={compressionSettings.quality || 0.8}
                onChange={(e) => {
                  const value = Math.max(0.1, Math.min(1, parseFloat(e.target.value) || 0.8));
                  setCompressionSettings(prev => ({
                    ...prev,
                    quality: value
                  }));
                }}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                min="0.1"
                max="1"
                step="0.05"
                aria-describedby="quality-help"
              />
              <p id="quality-help" className="text-xs text-neutral-500 mt-1">
                0.8-0.9 recommended for good quality/size balance
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Upload Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer 
          transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 
          focus-visible:ring-primary-500 focus-visible:ring-offset-2
          ${isDragOver 
            ? 'border-primary-500 bg-primary-50 scale-105 shadow-lg' 
            : 'border-neutral-300 hover:border-primary-400 hover:bg-primary-25'
          }
        `}
        tabIndex={0}
        role="button"
        aria-label="Upload images by clicking or dragging files here"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={allowedFormats.join(',')}
          multiple
          onChange={(e) => {
            if (e.target.files) {
              handleFileSelection(e.target.files);
              // Reset input for consecutive uploads
              e.target.value = '';
            }
          }}
          className="hidden"
          aria-describedby="upload-instructions"
        />
        
        <div className="space-y-4">
          <div className={`
            w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-colors
            ${isDragOver 
              ? 'bg-primary-200 text-primary-600' 
              : 'bg-neutral-100 group-hover:bg-primary-100 text-neutral-400 group-hover:text-primary-500'
            }
          `}>
            <Upload className="w-8 h-8 transition-colors" />
          </div>
          <div id="upload-instructions">
            <h4 className="text-lg font-medium text-neutral-900">
              {isDragOver ? 'Drop images here' : 'Drop images here or click to browse'}
            </h4>
            <p className="text-sm text-neutral-600 mt-1">
              Supports JPEG, PNG, WebP • Auto-compression enabled • Max {maxImages} images
            </p>
          </div>
        </div>
      </div>

      {/* Compression Stats */}
      {showCompressionStats && images.length > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
          <h4 className="font-medium text-neutral-900 mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-green-500" />
            Compression Summary
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-neutral-600">Original Size</p>
              <p className="font-semibold text-neutral-900">{formatFileSize(totalOriginalSize)}</p>
            </div>
            <div>
              <p className="text-neutral-600">Compressed Size</p>
              <p className="font-semibold text-green-600">{formatFileSize(totalCompressedSize)}</p>
            </div>
            <div>
              <p className="text-neutral-600">Space Saved</p>
              <p className="font-semibold text-blue-600">
                {formatFileSize(totalSavings.savedBytes)} ({totalSavings.savedPercentage.toFixed(1)}%)
              </p>
            </div>
            <div>
              <p className="text-neutral-600">Compression Ratio</p>
              <p className="font-semibold text-purple-600">{totalSavings.ratio}</p>
            </div>
          </div>
        </div>
      )}

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {images.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image Preview */}
                {showPreview && (
                  <div className="relative aspect-video bg-neutral-100">
                    <Image
                      src={image.previewUrl}
                      alt={image.originalFile.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Status Overlay */}
                    {image.status === 'compressing' && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Loader2 className="w-6 h-6 mx-auto mb-2 animate-spin" />
                          <p className="text-sm">Compressing... {image.progress}%</p>
                        </div>
                      </div>
                    )}
                    
                    {image.status === 'compressed' && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                    
                    {image.status === 'error' && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                        <X className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                )}

                {/* Image Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="min-w-0 flex-1">
                      <h5 className="font-medium text-neutral-900 truncate">
                        {image.originalFile.name}
                      </h5>
                      {image.status === 'error' && image.error && (
                        <p className="text-sm text-red-600 mt-1">{image.error}</p>
                      )}
                    </div>
                    {allowRemove && (
                      <button
                        onClick={() => handleRemoveImage(image.id)}
                        className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                        title="Remove image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Compression Details */}
                  {showCompressionStats && image.status === 'compressed' && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Original:</span>
                        <span className="font-medium">{formatFileSize(image.originalSize)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Compressed:</span>
                        <span className="font-medium text-green-600">
                          {formatFileSize(image.compressedSize)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Saved:</span>
                        <span className="font-medium text-blue-600">
                          {image.compressionRatio.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Progress Bar */}
                  {image.status === 'compressing' && (
                    <div className="mt-3">
                      <div className="bg-neutral-200 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${image.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Upload Button */}
      {onUpload && images.some(img => img.status === 'compressed') && (
        <div className="flex justify-center">
          <button
            onClick={handleUpload}
            disabled={isUploading || !images.some(img => img.status === 'compressed')}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white rounded-xl transition-colors font-medium flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            aria-describedby="upload-button-help"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading {images.filter(img => img.status === 'compressed').length} images...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload {images.filter(img => img.status === 'compressed').length} Compressed Images
              </>
            )}
          </button>
          {!isUploading && (
            <p id="upload-button-help" className="sr-only">
              Upload {images.filter(img => img.status === 'compressed').length} compressed images to server
            </p>
          )}
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="text-center py-8 text-neutral-500">
          <FileImage className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No images uploaded yet</p>
        </div>
      )}
    </div>
  );
}
