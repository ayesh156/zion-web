'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Upload, 
  Camera, 
  X, 
  Loader, 
  Check, 
  AlertTriangle,
} from 'lucide-react';
import { 
  compressImage, 
  formatFileSize, 
  validateImageFile,
  getOptimalCompressionOptions,
  CompressionResult
} from '@/lib/imageCompression';

interface UserProfileImageUploadProps {
  currentImageUrl?: string;
  onImageUploaded: (imageUrl: string) => void;
  onImageRemoved: () => void;
  disabled?: boolean;
  className?: string;
}

interface UploadState {
  stage: 'idle' | 'selecting' | 'compressing' | 'uploading' | 'success' | 'error';
  progress: number;
  message: string;
  error?: string;
}

export default function UserProfileImageUpload({
  currentImageUrl,
  onImageUploaded,
  onImageRemoved,
  disabled = false,
  className = ''
}: UserProfileImageUploadProps) {
  const [uploadState, setUploadState] = useState<UploadState>({
    stage: 'idle',
    progress: 0,
    message: ''
  });
  const [previewUrl, setPreviewUrl] = useState<string>(currentImageUrl || '');
  const [compressionResult, setCompressionResult] = useState<CompressionResult | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetUploadState = () => {
    setUploadState({
      stage: 'idle',
      progress: 0,
      message: ''
    });
    setCompressionResult(null);
  };

  const handleFileSelect = async (file: File) => {
    if (disabled) return;

    try {
      setUploadState({
        stage: 'selecting',
        progress: 10,
        message: 'Validating image...'
      });

      // Validate file
      const validation = validateImageFile(file);
      if (!validation.isValid) {
        setUploadState({
          stage: 'error',
          progress: 0,
          message: '',
          error: validation.error
        });
        return;
      }

      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);

      // Compress image
      setUploadState({
        stage: 'compressing',
        progress: 30,
        message: 'Optimizing image...'
      });

      const compressionOptions = getOptimalCompressionOptions(file, 'property');
      const result = await compressImage(
        file,
        compressionOptions,
        (progress) => {
          setUploadState(prev => ({
            ...prev,
            progress: 30 + (progress * 0.4), // 30-70% for compression
            message: `Optimizing image... ${Math.round(progress)}%`
          }));
        }
      );

      setCompressionResult(result);

      // Upload to server
      setUploadState({
        stage: 'uploading',
        progress: 70,
        message: 'Uploading image...'
      });

      await uploadImage(result.compressedFile);

    } catch (error) {
      console.error('Error processing image:', error);
      setUploadState({
        stage: 'error',
        progress: 0,
        message: '',
        error: error instanceof Error ? error.message : 'Failed to process image'
      });
    }
  };

  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      // We'll need the user ID from context or props
      // For now, using a placeholder - this should be passed from the parent component
      const userId = 'user-id'; // This should come from props or context

      const response = await fetch(`/api/users/firestore/${userId}/profile-image`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();

      setUploadState({
        stage: 'success',
        progress: 100,
        message: 'Image uploaded successfully!'
      });

      // Notify parent component
      onImageUploaded(data.imageUrl);

      // Reset after success
      setTimeout(() => {
        resetUploadState();
      }, 2000);

    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadState({
        stage: 'error',
        progress: 0,
        message: '',
        error: error instanceof Error ? error.message : 'Upload failed'
      });
    }
  };

  const handleRemoveImage = async () => {
    if (disabled) return;

    try {
      setUploadState({
        stage: 'uploading',
        progress: 50,
        message: 'Removing image...'
      });

      const userId = 'user-id'; // This should come from props or context
      const response = await fetch(`/api/users/firestore/${userId}/profile-image`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove image');
      }

      setPreviewUrl('');
      setUploadState({
        stage: 'success',
        progress: 100,
        message: 'Image removed successfully!'
      });

      onImageRemoved();

      setTimeout(() => {
        resetUploadState();
      }, 2000);

    } catch (error) {
      console.error('Error removing image:', error);
      setUploadState({
        stage: 'error',
        progress: 0,
        message: '',
        error: error instanceof Error ? error.message : 'Failed to remove image'
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleFileSelect(imageFile);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const triggerFileSelect = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Upload Area */}
      <div className="relative">
        {/* Image Preview or Upload Area */}
        <motion.div
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileSelect}
          className={`relative w-32 h-32 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
            disabled ? 'cursor-not-allowed opacity-50' : ''
          } ${
            isDragOver 
              ? 'border-2 border-primary-400 bg-primary-50 scale-105' 
              : 'border-2 border-gray-300 hover:border-primary-400'
          }`}
        >
          {previewUrl ? (
            <>
              <Image
                src={previewUrl}
                alt="Profile preview"
                fill
                className="object-cover"
              />
              {!disabled && (
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center">
              <Upload className="w-6 h-6 text-gray-400 mb-2" />
              <span className="text-xs text-gray-500 text-center px-2">
                {isDragOver ? 'Drop image here' : 'Upload Image'}
              </span>
            </div>
          )}

          {/* Upload Progress Overlay */}
          <AnimatePresence>
            {uploadState.stage !== 'idle' && uploadState.stage !== 'success' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 flex items-center justify-center"
              >
                {uploadState.stage === 'error' ? (
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                ) : (
                  <Loader className="w-6 h-6 text-white animate-spin" />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Overlay */}
          <AnimatePresence>
            {uploadState.stage === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 bg-green-500/80 flex items-center justify-center"
              >
                <Check className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Remove Button */}
        {previewUrl && !disabled && uploadState.stage === 'idle' && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveImage();
            }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />

      {/* Upload Instructions */}
      <div className="text-sm text-gray-600">
        <p className="font-medium mb-1">Profile Image</p>
        <p>JPG, PNG or WebP. Max size 5MB.</p>
        <p className="text-xs text-gray-500 mt-1">
          Images will be automatically optimized for best performance.
        </p>
      </div>

      {/* Progress Bar */}
      <AnimatePresence>
        {uploadState.stage !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${uploadState.progress}%` }}
                transition={{ duration: 0.3 }}
                className={`h-full rounded-full ${
                  uploadState.stage === 'error' 
                    ? 'bg-red-500' 
                    : uploadState.stage === 'success'
                    ? 'bg-green-500'
                    : 'bg-primary-500'
                }`}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className={`${
                uploadState.stage === 'error' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {uploadState.error || uploadState.message}
              </span>
              <span className="text-gray-500">
                {Math.round(uploadState.progress)}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compression Stats */}
      <AnimatePresence>
        {compressionResult && uploadState.stage === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-50 border border-green-200 rounded-xl p-3"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Image Optimized
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-green-700">
              <div>
                <span className="text-green-600">Original:</span> {formatFileSize(compressionResult.originalSize)}
              </div>
              <div>
                <span className="text-green-600">Compressed:</span> {formatFileSize(compressionResult.compressedSize)}
              </div>
              <div className="col-span-2">
                <span className="text-green-600">Saved:</span> {compressionResult.compressionRatio.toFixed(1)}% 
                ({formatFileSize(compressionResult.originalSize - compressionResult.compressedSize)})
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {uploadState.stage === 'error' && uploadState.error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border border-red-200 rounded-xl p-3"
          >
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span className="text-sm text-red-700">{uploadState.error}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetUploadState}
              className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
            >
              Try again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}