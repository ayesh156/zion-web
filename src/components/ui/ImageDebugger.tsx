'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SafeImage } from './SafeImage';
import { CheckCircle, AlertCircle, Clock, Info } from 'lucide-react';

interface ImageDebuggerProps {
  imageUrl: string;
  title?: string;
}

export const ImageDebugger: React.FC<ImageDebuggerProps> = ({
  imageUrl,
  title = 'Image Debug Info'
}) => {
  const [urlValid, setUrlValid] = useState<boolean | null>(null);
  const [imageExists, setImageExists] = useState<boolean | null>(null);
  const [loadTime, setLoadTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startTime = Date.now();
    
    // Test URL validity
    try {
      setUrlValid(true);
      
      // Test if image exists and is accessible
      const img = new Image();
      img.onload = () => {
        setImageExists(true);
        setLoadTime(Date.now() - startTime);
        setError(null);
      };
      img.onerror = () => {
        setImageExists(false);
        setError('Failed to load image');
        console.error('Image load error');
      };
      img.src = imageUrl;
      
    } catch {
      setUrlValid(false);
      setError('Invalid URL format');
    }
  }, [imageUrl]);

  const getStatusIcon = (status: boolean | null) => {
    if (status === null) return <Clock className="w-4 h-4 text-yellow-500" />;
    if (status === true) return <CheckCircle className="w-4 h-4 text-green-500" />;
    return <AlertCircle className="w-4 h-4 text-red-500" />;
  };

  const getStatusText = (status: boolean | null, successText: string, failText: string) => {
    if (status === null) return 'Checking...';
    return status ? successText : failText;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-4 space-y-4"
    >
      <div className="flex items-center gap-2">
        <Info className="w-5 h-5 text-blue-500" />
        <h3 className="font-medium text-gray-900">{title}</h3>
      </div>
      
      {/* URL Display */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Image URL:</p>
        <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded break-all">
          {imageUrl}
        </p>
      </div>
      
      {/* Status Checks */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">URL Valid:</span>
          <div className="flex items-center gap-2">
            {getStatusIcon(urlValid)}
            <span className="text-sm">
              {getStatusText(urlValid, 'Valid', 'Invalid')}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Image Accessible:</span>
          <div className="flex items-center gap-2">
            {getStatusIcon(imageExists)}
            <span className="text-sm">
              {getStatusText(imageExists, 'Accessible', 'Not accessible')}
            </span>
          </div>
        </div>
        
        {loadTime && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Load Time:</span>
            <span className="text-sm text-gray-600">{loadTime}ms</span>
          </div>
        )}
        
        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            Error: {error}
          </div>
        )}
      </div>
      
      {/* Image Preview */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Preview:</p>
        <div className="w-32 h-32 border border-gray-200 rounded">
          <SafeImage
            src={imageUrl}
            alt="Debug preview"
            width={128}
            height={128}
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ImageDebugger;
