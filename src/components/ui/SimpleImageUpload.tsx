'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, AlertCircle, ImagePlus, Zap } from 'lucide-react';
import { compressImage, formatFileSize, calculateSavings } from '@/lib/imageCompression';
import { uploadImageToFirebase } from '@/lib/firebase/uploadImageWithCompression';

interface SimpleImageUploadProps {
  onUploadComplete: (url: string) => void;
  folder: string;
  baseName: string;
  compressionMode?: 'property' | 'hero' | 'thumbnail';
  className?: string;
  placeholder?: string;
  accept?: string;
  maxSizeMB?: number;
}

export const SimpleImageUpload: React.FC<SimpleImageUploadProps> = ({
  onUploadComplete,
  folder,
  baseName,
  compressionMode = 'property',
  className = '',
  placeholder = 'Click to upload image',
  accept = 'image/*',
  maxSizeMB = 10
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'compressing' | 'uploading' | 'complete' | 'error'>('idle');
  const [error, setError] = useState<string>('');
  const [compressionInfo, setCompressionInfo] = useState<{
    originalSize: number;
    compressedSize: number;
    savings: { savedBytes: number; savedPercentage: number; ratio: string };
  } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      setStatus('error');
      return;
    }

    setIsUploading(true);
    setStatus('compressing');
    setError('');
    setProgress(0);

    try {
      // Step 1: Compress image
      const compressionOptions = 
        compressionMode === 'hero' ? { maxSizeMB: 2, maxWidthOrHeight: 2560, quality: 0.85 } :
        compressionMode === 'thumbnail' ? { maxSizeMB: 0.2, maxWidthOrHeight: 500, quality: 0.7 } :
        { maxSizeMB: 1, maxWidthOrHeight: 1920, quality: 0.8 };

      const compressionResult = await compressImage(
        file,
        compressionOptions,
        (progressValue) => {
          setProgress(progressValue * 0.5); // Compression is first 50%
        }
      );

      // Calculate compression savings
      const savings = calculateSavings(compressionResult.originalSize, compressionResult.compressedSize);
      setCompressionInfo({
        originalSize: compressionResult.originalSize,
        compressedSize: compressionResult.compressedSize,
        savings
      });

      setStatus('uploading');

      // Step 2: Upload to Firebase
      const downloadURL = await uploadImageToFirebase(
        compressionResult.compressedFile,
        folder,
        `${baseName}-${Date.now()}`,
        {
          enableCompression: false, // Already compressed
          onProgress: (uploadProgress) => {
            setProgress(50 + (uploadProgress * 0.5)); // Upload is second 50%
          }
        }
      );

      setStatus('complete');
      setProgress(100);
      onUploadComplete(downloadURL);

      // Reset after delay
      setTimeout(() => {
        setStatus('idle');
        setProgress(0);
        setCompressionInfo(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 3000);

    } catch (error) {
      console.error('Upload failed:', error);
      setStatus('error');
      setError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'complete':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'compressing':
      case 'uploading':
        return <Loader2 className="w-5 h-5 text-primary-600 animate-spin" />;
      default:
        return <ImagePlus className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'compressing':
        return 'Compressing image...';
      case 'uploading':
        return 'Uploading to cloud...';
      case 'complete':
        return 'Upload complete!';
      case 'error':
        return error || 'Upload failed';
      default:
        return placeholder;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'complete':
        return 'border-green-500 bg-green-50';
      case 'error':
        return 'border-red-500 bg-red-50';
      case 'compressing':
      case 'uploading':
        return 'border-primary-500 bg-primary-50';
      default:
        return 'border-gray-300 bg-gray-50 hover:border-gray-400';
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer
          ${getStatusColor()}
          ${isUploading ? 'pointer-events-none' : ''}
        `}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />
        
        <div className="space-y-3">
          <div className="flex justify-center">
            {getStatusIcon()}
          </div>
          
          <div>
            <p className={`text-sm font-medium ${
              status === 'complete' ? 'text-green-800' :
              status === 'error' ? 'text-red-800' :
              status === 'compressing' || status === 'uploading' ? 'text-primary-800' :
              'text-gray-700'
            }`}>
              {getStatusText()}
            </p>
            
            {(status === 'compressing' || status === 'uploading') && (
              <div className="mt-3 space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full bg-primary-500"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>
                    {status === 'compressing' ? 'Compressing...' : 'Uploading...'}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compression Info */}
      {compressionInfo && status === 'complete' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-lg p-3"
        >
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Compression Applied
            </span>
          </div>
          <div className="text-xs text-green-700 space-y-1">
            <div className="flex justify-between">
              <span>Original:</span>
              <span>{formatFileSize(compressionInfo.originalSize)}</span>
            </div>
            <div className="flex justify-between">
              <span>Compressed:</span>
              <span>{formatFileSize(compressionInfo.compressedSize)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Saved:</span>
              <span>{Math.round(compressionInfo.savings.savedPercentage)}% ({compressionInfo.savings.ratio})</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error Display */}
      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-3"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-800">Upload Failed</span>
          </div>
          <p className="text-xs text-red-700 mt-1">{error}</p>
          <button
            onClick={() => {
              setStatus('idle');
              setError('');
              setProgress(0);
            }}
            className="text-xs text-red-600 hover:text-red-800 mt-2 underline"
          >
            Try again
          </button>
        </motion.div>
      )}

      {/* Upload Guidelines */}
      {status === 'idle' && (
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex items-center justify-between">
            <span>• Supports JPEG, PNG, WebP</span>
            <span>Max: {maxSizeMB}MB</span>
          </div>
          <div>• Auto-compressed for optimal loading</div>
        </div>
      )}
    </div>
  );
};

export default SimpleImageUpload;
