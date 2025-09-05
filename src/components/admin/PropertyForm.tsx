'use client';

import { useState, useEffect } from 'react';
import Select, { components, OptionProps, SingleValueProps } from 'react-select';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { X, Save, Globe, Star, Home, Building2, Waves, MessageCircle, Users, Calendar as CalendarIcon, ThumbsUp, CheckCircle, Info, BookOpen, Airplay } from 'lucide-react';
import ModernDatePicker from '../ui/ModernDatePicker';
import { Property } from '../../data/properties';
import AmenitiesSelector from './AmenitiesSelector';
import UltimateDragGallery from '../ui/UltimateDragGallery';
import { uploadImageToFirebase } from '@/lib/firebase/uploadImageWithCompression';
import { deleteImageFromFirebase, isFirebaseStorageUrl } from '@/lib/firebase/deleteImage';

interface PropertyFormProps {
  property?: Property | null;
  onSave: (property: Property | Omit<Property, 'id'>) => void;
  onCancel: () => void;
}

// Select options and custom components (move outside component)
const propertyTypeOptions = [
  { value: 'villa', label: 'Villa', icon: <Home className="w-4 h-4 text-green-600" /> },
  { value: 'apartment', label: 'Apartment', icon: <Building2 className="w-4 h-4 text-blue-600" /> },
  { value: 'house', label: 'House', icon: <Building2 className="w-4 h-4 text-yellow-600" /> },
  { value: 'resort', label: 'Resort', icon: <Waves className="w-4 h-4 text-cyan-600" /> },
];

const currencyOptions = [
  { value: 'USD', label: 'USD', icon: <span className="font-bold">$</span> },
  { value: 'LKR', label: 'LKR', icon: <span className="font-bold">₨</span> },
  { value: 'EUR', label: 'EUR', icon: <span className="font-bold">€</span> },
  { value: 'GBP', label: 'GBP', icon: <span className="font-bold">£</span> },
];

const reviewSourceOptions = [
  { value: 'Globe', label: 'Google', icon: <Globe className="w-4 h-4 text-blue-500" /> },
  { value: 'Star', label: 'Airbnb', icon: <Star className="w-4 h-4 text-pink-500" /> },
  { value: 'MessageCircle', label: 'TripAdvisor', icon: <MessageCircle className="w-4 h-4 text-green-500" /> },
  { value: 'Building2', label: 'Booking.com', icon: <Building2 className="w-4 h-4 text-indigo-500" /> },
  { value: 'ThumbsUp', label: 'Facebook', icon: <ThumbsUp className="w-4 h-4 text-blue-700" /> },
  { value: 'CheckCircle', label: 'Other', icon: <CheckCircle className="w-4 h-4 text-gray-500" /> },
];

// Enhanced custom components for react-select with proper typing
interface OptionType {
  value: string;
  label: string;
  icon: React.ReactElement;
}

const Option = (props: OptionProps<OptionType>) => (
  <components.Option {...props}>
    <div className="flex items-center gap-3 py-1">
      <div className="flex-shrink-0">
        {props.data.icon}
      </div>
      <span className="font-medium text-neutral-700">{props.data.label}</span>
    </div>
  </components.Option>
);

const SingleValue = (props: SingleValueProps<OptionType>) => (
  <components.SingleValue {...props}>
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0">
        {props.data.icon}
      </div>
      <span className="font-medium text-neutral-700">{props.data.label}</span>
    </div>
  </components.SingleValue>
);

// Enhanced dropdown styles with glassmorphism theme
const getSelectStyles = () => ({
  control: (base: Record<string, unknown>, state: { isFocused: boolean }) => ({
    ...base,
    minHeight: '48px',
    borderRadius: '0.75rem',
    borderColor: state.isFocused ? '#3b82f6' : '#e5e7eb',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)',
    boxShadow: state.isFocused 
      ? '0 0 0 3px rgba(59, 130, 246, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.1)' 
      : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    },
  }),
  menu: (base: Record<string, unknown>) => ({
    ...base,
    zIndex: 9999,
    borderRadius: '0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    marginTop: '4px',
  }),
  menuPortal: (base: Record<string, unknown>) => ({
    ...base,
    zIndex: 9999,
  }),
  option: (base: Record<string, unknown>, state: { isSelected: boolean; isFocused: boolean }) => ({
    ...base,
    backgroundColor: state.isSelected 
      ? 'rgba(59, 130, 246, 0.12)' 
      : state.isFocused 
        ? 'rgba(59, 130, 246, 0.06)' 
        : 'transparent',
    color: state.isSelected ? '#1e40af' : '#374151',
    padding: '14px 16px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    fontSize: '14px',
    fontWeight: state.isSelected ? '500' : '400',
    '&:active': {
      backgroundColor: 'rgba(59, 130, 246, 0.18)',
    },
  }),
  singleValue: (base: Record<string, unknown>) => ({
    ...base,
    color: '#374151',
    fontSize: '14px',
    fontWeight: '500',
  }),
  placeholder: (base: Record<string, unknown>) => ({
    ...base,
    color: '#9ca3af',
    fontWeight: '400',
    fontSize: '14px',
  }),
  dropdownIndicator: (base: Record<string, unknown>, state: { isFocused: boolean }) => ({
    ...base,
    color: state.isFocused ? '#3b82f6' : '#9ca3af',
    transition: 'all 0.2s ease',
    padding: '8px',
    '&:hover': {
      color: '#3b82f6',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  valueContainer: (base: Record<string, unknown>) => ({
    ...base,
    padding: '8px 12px',
  }),
});

const PropertyForm = ({ property, onSave, onCancel }: PropertyFormProps) => {
    const [formData, setFormData] = useState<Property | Omit<Property, 'id'>>({
      title: '',
      slug: '',
      address: '',
      locationUrl: '',
      type: 'villa',
      maxGuests: 1,
      bedrooms: 1,
      bathrooms: 1,
      pricing: {
        currency: 'USD',
        defaultPrice: 0,
        rules: []
      },
      rating: 4.0,
      reviewCount: 0,
      images: {
        hero: '',
        gallery: []
      },
      amenities: [],
      features: [],
      description: '',
      reviews: [],
      rules: [],
      otherRules: '',
      policies: {
        checkIn: "From 2:00 PM\n\nGuests are required to show a photo ID and credit card at check-in.\nYou need to let the property know what time you'll be arriving in advance.",
        checkOut: '12:00 PM (Noon). Late check-out may be available for an additional fee, subject to availability.',
        cancellationPrepayment: 'Cancellation and prepayment policies vary according to accommodation type. Check what conditions apply to each option when making your selection.'
      }
    });

  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string>('');
  const [uploadingHero, setUploadingHero] = useState(false);

  useEffect(() => {
    if (property) {
      setFormData(prev => ({
        ...prev,
        ...property,
        reviews: property.reviews || [],
  otherRules: property.otherRules || '',
  policies: property.policies || prev.policies
      }));
    }
  }, [property]);

  const [newReview, setNewReview] = useState({
    username: '',
    date: '',
    description: '',
    source: '', // will be auto-filled
    sourceIcon: ''
  });

  // For rules
  const [newRule, setNewRule] = useState('');

  const handleAddReview = () => {
    if (
      newReview.username.trim() &&
      newReview.date.trim() &&
      newReview.description.trim() &&
      newReview.sourceIcon.trim()
    ) {
      setFormData(prev => {
        const updatedReviews = [...(prev.reviews || []), newReview];
        return {
          ...prev,
          reviews: updatedReviews,
          reviewCount: updatedReviews.length
        };
      });
      setNewReview({ username: '', date: '', description: '', source: '', sourceIcon: '' });
    }
  };

  const handleRemoveRule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rules: (prev.rules || []).filter((_, i) => i !== index)
    }));
  };

  const handleAddRule = () => {
    if (newRule.trim()) {
      setFormData(prev => ({
        ...prev,
        rules: [...(prev.rules || []), newRule]
      }));
      setNewRule('');
    }
  };

  const handleRemoveReview = (index: number) => {
    setFormData(prev => {
      const updatedReviews = (prev.reviews || []).filter((_, i) => i !== index);
      return {
        ...prev,
        reviews: updatedReviews,
        reviewCount: updatedReviews.length
      };
    });
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handlePricingChange = (field: 'currency' | 'defaultPrice', value: string | number) => {
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [field]: value
      }
    }));
  };

  // Handle file selection and preview
  const handleHeroFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeroFile(file);
      setHeroPreview(URL.createObjectURL(file)); // Show preview immediately
    }
  };

  // Upload image to Firebase and update formData
  const handleHeroUpload = async () => {
    if (!heroFile) return;
    setUploadingHero(true); // Show uploading status
    
    // Store reference to old image for safe cleanup
    const oldHeroUrl = property && formData.images.hero && isFirebaseStorageUrl(formData.images.hero)
      ? formData.images.hero
      : null;
    
    try {
      // Phase 1: Upload new image first
      const url = await uploadImageToFirebase(
        heroFile,
        'property-hero',
        formData.slug || formData.title.replace(/\s+/g, '-').toLowerCase(),
        {
          enableCompression: true,
          compressionMode: 'hero', // Use hero compression settings for higher quality
          onCompressionProgress: (progress) => {
            console.log(`Hero compression progress: ${progress}%`);
          },
          onProgress: (progress) => {
            console.log(`Hero upload progress: ${progress}%`);
          }
        }
      );
      
      // Phase 2: Update form data with new image
      setFormData(prev => ({
        ...prev,
        images: { ...prev.images, hero: url }
      }));
      setHeroPreview(url); // Show uploaded image preview
      
      // Phase 3: Only delete old image after new upload succeeds
      if (oldHeroUrl) {
        try {
          await deleteImageFromFirebase(oldHeroUrl);
        } catch (deleteError) {
          console.warn('Failed to delete old hero image, but new image uploaded successfully:', deleteError);
        }
      }
    } catch (error) {
      console.error('Error uploading hero image:', error);
      // Handle error (show toast notification, etc.)
    } finally {
      setUploadingHero(false); // Hide uploading status
    }
  };

  // Enhanced hero image section
  const heroImageSection = () => (
    <div>
      <label className="block text-sm font-semibold text-neutral-700 mb-3">
        Hero Image *
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left side - Upload controls */}
        <div className="space-y-3">
          <input
            type="file"
            accept="image/*"
            onChange={handleHeroFileChange}
            className="w-full px-3 py-2 border border-neutral-200/50 rounded-xl text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
          />
          <button
            type="button"
            onClick={handleHeroUpload}
            disabled={!heroFile || uploadingHero}
            className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-400 text-white rounded-xl transition-colors font-medium h-12"
          >
            {uploadingHero ? 'Uploading...' : 'Upload Image'}
          </button>
          <input
            type="url"
            value={formData.images.hero}
            onChange={(e) =>
              setFormData(prev => ({
                ...prev,
                images: { ...prev.images, hero: e.target.value }
              }))
            }
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm h-12"
            placeholder="Or paste image URL"
            required
          />
          {(formData.images.hero || heroPreview) && (
            <button
              type="button"
              onClick={removeHeroImage}
              className="w-full px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors h-12 bg-white/80 backdrop-blur-sm border border-red-200/50 hover:border-red-300/60"
            >
              Remove Hero Image
            </button>
          )}
        </div>

        {/* Right side - Preview box */}
        <div className="relative">
          <div className={`
            w-full h-32 border-2 border-dashed rounded-xl flex items-center justify-center transition-all duration-300
            ${uploadingHero 
              ? 'border-primary-500 bg-primary-50 animate-pulse' 
              : (heroPreview && heroPreview.trim()) || (formData.images.hero && formData.images.hero.trim())
                ? 'border-green-500 bg-green-50'
                : 'border-neutral-300 bg-neutral-50'
            }
          `}>
            {uploadingHero ? (
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm text-primary-600 font-medium">Uploading...</p>
              </div>
            ) : (heroPreview && heroPreview.trim()) || (formData.images.hero && formData.images.hero.trim()) ? (
              <Image
                src={heroPreview || formData.images.hero}
                alt="Hero Preview"
                width={400}
                height={200}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-center text-neutral-400">
                <div className="w-12 h-12 mx-auto mb-2 opacity-50">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm">Image preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced gallery handlers with upload progress tracking
  const [galleryImages, setGalleryImages] = useState<Array<{
    id: string;
    url: string;
    isUploading?: boolean;
    uploadProgress?: number;
    file?: File;
  }>>([]);

  // Sync gallery images with form data
  useEffect(() => {
    const images = formData.images.gallery.map((url, index) => ({
      id: `gallery-${index}`,
      url,
      isUploading: false,
      uploadProgress: 0
    }));
    setGalleryImages(prev => {
      // Keep uploading images, replace completed ones
      const uploading = prev.filter(img => img.isUploading);
      return [...images, ...uploading];
    });
  }, [formData.images.gallery]);

  const handleGalleryReorder = (reorderedImages: Array<{
    id: string; 
    url: string; 
    isUploading?: boolean; 
    uploadProgress?: number;
  }>) => {
    const completedImages = reorderedImages.filter(img => !img.isUploading);
    setFormData(prev => ({ 
      ...prev, 
      images: { ...prev.images, gallery: completedImages.map(img => img.url) }
    }));
  };

  const handleGalleryImageRemove = async (imageId: string) => {
    // Handle removing uploaded images
    const index = formData.images.gallery.findIndex((_, i) => `gallery-${i}` === imageId);
    if (index !== -1) {
      const imageToRemove = formData.images.gallery[index];
      
      // If it's a Firebase Storage URL and we're editing, delete it immediately
      if (property && imageToRemove && isFirebaseStorageUrl(imageToRemove)) {
        try {
          await deleteImageFromFirebase(imageToRemove);
        } catch (error) {
          console.warn('Failed to delete image, but continuing...', error);
        }
      }

      // Update state
      const newGallery = formData.images.gallery.filter((_, i) => i !== index);
      setFormData(prev => ({ 
        ...prev, 
        images: { ...prev.images, gallery: newGallery }
      }));
    } else {
      // Handle removing uploading images
      setGalleryImages(prev => prev.filter(img => img.id !== imageId));
    }
  };

  const handleGalleryImageUpload = async (files: FileList) => {
    const fileArray = Array.from(files);
    
    // Create temporary uploading entries
    const uploadingEntries = fileArray.map((file, index) => ({
      id: `uploading-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      isUploading: true,
      uploadProgress: 0,
      file
    }));

    // Add to gallery images immediately for UI feedback
    setGalleryImages(prev => [...prev, ...uploadingEntries]);

    // Upload each file with progress simulation
    for (const entry of uploadingEntries) {
      try {
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setGalleryImages(prev => prev.map(img => 
            img.id === entry.id 
              ? { ...img, uploadProgress: Math.min((img.uploadProgress || 0) + Math.random() * 15 + 5, 95) }
              : img
          ));
        }, 200 + Math.random() * 300);

        // Actual upload with compression
        const url = await uploadImageToFirebase(
          entry.file,
          'property-gallery',
          `${formData.slug || formData.title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
          {
            enableCompression: true,
            compressionMode: 'property',
            onCompressionProgress: (progress) => {
              setGalleryImages(prev => prev.map(img => 
                img.id === entry.id 
                  ? { ...img, uploadProgress: progress * 0.7 } // Compression is 70% of total progress
                  : img
              ));
            },
            onProgress: (progress) => {
              setGalleryImages(prev => prev.map(img => 
                img.id === entry.id 
                  ? { ...img, uploadProgress: 70 + (progress * 0.3) } // Upload is remaining 30%
                  : img
              ));
            }
          }
        );

        // Complete the progress
        clearInterval(progressInterval);
        setGalleryImages(prev => prev.map(img => 
          img.id === entry.id 
            ? { ...img, uploadProgress: 100 }
            : img
        ));

        // Wait a moment to show 100% then add to form data
        setTimeout(() => {
          setFormData(prev => ({ 
            ...prev, 
            images: { ...prev.images, gallery: [...prev.images.gallery, url] }
          }));

          // Remove from uploading state
          setGalleryImages(prev => prev.filter(img => img.id !== entry.id));
          
          // Clean up temp URL
          URL.revokeObjectURL(entry.url);
        }, 500);

      } catch (error) {
        console.error('Error uploading gallery image:', error);
        
        // Remove failed upload
        setGalleryImages(prev => prev.filter(img => img.id !== entry.id));
        URL.revokeObjectURL(entry.url);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Clean up form data
    const cleanedReviews = formData.reviews || [];
    const cleanedData = {
      ...formData,
      reviewCount: cleanedReviews.length,
      amenities: formData.amenities, // No need to filter - these are predefined IDs
      features: formData.features.filter(feature => feature.trim() !== ''),
      images: {
        ...formData.images,
        gallery: formData.images.gallery.filter(image => image.trim() !== '')
      }
    };
    // Note: Image cleanup for updates is now handled by the API
    onSave(cleanedData);
  };

  // Add these handler functions before the return statement:

  // Add hero image remove handler
  const removeHeroImage = async () => {
    const imageToRemove = formData.images.hero;
    
    // If it's a Firebase Storage URL and we're editing, delete it immediately
    if (property && imageToRemove && isFirebaseStorageUrl(imageToRemove)) {
      try {
        await deleteImageFromFirebase(imageToRemove);
      } catch (error) {
        console.warn('Failed to delete hero image, but continuing...', error);
      }
    }

    // Clear hero image state
    setFormData(prev => ({ 
      ...prev, 
      images: { ...prev.images, hero: '' }
    }));
    setHeroFile(null);
    setHeroPreview('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      {/* Modern Glassmorphism Background - Fixed positioning for scroll coverage */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-neutral-900/40 via-primary-900/30 to-secondary-900/40 backdrop-blur-md"
        onClick={onCancel}
      />
      
      {/* Animated Background Particles - Fixed positioning for scroll coverage */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -120, 0],
            y: [0, 80, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
          className="absolute top-3/4 right-1/3 w-24 h-24 bg-secondary-500/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            x: [0, 80, 0],
            y: [0, -60, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "linear",
            delay: 10
          }}
          className="absolute top-1/2 right-1/4 w-20 h-20 bg-primary-400/8 rounded-full blur-xl"
        />
      </div>
      
      {/* Enhanced Modal Container with proper overflow for dropdowns */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
        className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full my-8 border border-white/20"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          overflow: 'visible' // Allow dropdowns to overflow the modal
        }}
      >
        {/* Enhanced Header with Glassmorphism */}
        <div className="relative border-b border-neutral-200/50 p-6 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-1">
                {property ? 'Edit Property' : 'Add New Property'}
              </h2>
              <p className="text-sm text-neutral-600">
                {property ? 'Update property information' : 'Create a new property listing'}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onCancel}
              className="p-3 text-neutral-400 hover:text-neutral-600 bg-neutral-100/80 hover:bg-neutral-200/80 rounded-2xl transition-all duration-300 backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-2 right-20 w-1 h-1 bg-primary-400/40 rounded-full animate-pulse"></div>
          <div className="absolute bottom-3 left-8 w-0.5 h-0.5 bg-secondary-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Enhanced Form Content */}
        <div className="relative bg-gradient-to-br from-white/90 via-white/95 to-white/90 backdrop-blur-sm rounded-b-3xl" style={{ overflow: 'visible' }}>
          <form onSubmit={handleSubmit} className="p-8 space-y-8" style={{ overflow: 'visible' }}>
            {/* Floating decorative elements */}
            <div className="absolute top-4 right-6 w-1 h-1 bg-primary-300/50 rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 left-8 w-0.5 h-0.5 bg-secondary-300/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm h-12"
                required
                placeholder="Enter property title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Address *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm h-12"
                required
                placeholder="Enter address"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Property Type
              </label>
              <Select
                classNamePrefix="react-select"
                className="w-full"
                options={propertyTypeOptions}
                value={propertyTypeOptions.find(opt => opt.value === formData.type) || null}
                onChange={opt => {
                  const selectedOpt = opt as OptionType | null;
                  setFormData(prev => ({ ...prev, type: (selectedOpt ? selectedOpt.value : 'villa') as Property['type'] }));
                }}
                placeholder="Select Property Type"
                components={{ Option, SingleValue }}
                isClearable={false}
                isSearchable={false}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                styles={getSelectStyles()}
              />
            </div>

            {/* New Pricing Section */}
            <div className="md:col-span-2">
              {/* Currency select and price input */}
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Currency</label>
                  <Select
                    classNamePrefix="react-select"
                    className="w-full"
                    options={currencyOptions}
                    value={currencyOptions.find(opt => opt.value === formData.pricing.currency) || null}
                    onChange={opt => {
                      const selectedOpt = opt as OptionType | null;
                      handlePricingChange('currency', selectedOpt ? selectedOpt.value : 'USD');
                    }}
                    placeholder="Select Currency"
                    components={{ Option, SingleValue }}
                    isClearable={false}
                    isSearchable={false}
                    menuPortalTarget={document.body}
                    menuPosition="fixed"
                    styles={getSelectStyles()}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Default Price</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.pricing.defaultPrice}
                    onChange={e => handlePricingChange('defaultPrice', Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm h-12"
                    placeholder="Enter price"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Bedrooms
              </label>
              <input
                type="number"
                min="1"
                value={formData.bedrooms}
                onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: parseInt(e.target.value) || 1 }))}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm h-12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Bathrooms
              </label>
              <input
                type="number"
                min="1"
                value={formData.bathrooms}
                onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: parseInt(e.target.value) || 1 }))}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm h-12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Max Guests
              </label>
              <input
                type="number"
                min="1"
                value={formData.maxGuests}
                onChange={(e) => setFormData(prev => ({ ...prev, maxGuests: parseInt(e.target.value) || 1 }))}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm h-12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Rating
              </label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) || 4.0 }))}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm h-12"
              />
            </div>
          </div>

          {heroImageSection()}

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm resize-none"
              placeholder="Describe the property..."
              required
            />
          </div>


          {/* Enhanced Amenities Section */}
          <div className="md:col-span-2">
            <AmenitiesSelector
              selectedAmenities={formData.amenities}
              onAmenitiesChange={(amenities) => setFormData(prev => ({ ...prev, amenities }))}
            />
          </div>

          {/* Reviews Section */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Reviews</label>
            <div className="space-y-2 mb-4">
              {(formData.reviews?.length === 0 || !formData.reviews) && (
                <p className="text-sm text-neutral-500">No reviews added yet.</p>
              )}
              {(formData.reviews || []).map((review, idx) => {
                const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                  Globe,
                  Star,
                  Home,
                  Building2,
                  Waves,
                  MessageCircle,
                  Users,
                  Calendar: CalendarIcon,
                  ThumbsUp,
                  CheckCircle,
                  Info,
                  BookOpen,
                  Airplay,
                };
                const IconComponent = review.source ? iconMap[review.source] : null;
                return (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center gap-2 border border-neutral-200 rounded-lg p-2 bg-neutral-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        {IconComponent && <IconComponent className="w-4 h-4 text-primary-500" />} {review.date} | {review.source}
                      </div>
                      <div className="font-semibold text-neutral-700">{review.username}</div>
                      <div className="text-sm text-neutral-700">{review.description}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveReview(idx)}
                      className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg h-10 transition-colors"
                    >Remove</button>
                  </div>
                );
              })}
            </div>
            <div className="space-y-3 mb-2">
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">Username</label>
                <input
                  type="text"
                  value={newReview.username}
                  onChange={e => setNewReview(r => ({ ...r, username: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm h-10"
                  placeholder="Username"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">Date</label>
                <ModernDatePicker
                  selected={newReview.date ? new Date(newReview.date) : undefined}
                  onChange={date => setNewReview(r => ({ ...r, date: date.toISOString().split('T')[0] }))}
                  placeholder="Date"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">Source</label>
                <Select
                  classNamePrefix="react-select"
                  className="w-full"
                  options={reviewSourceOptions}
                  value={reviewSourceOptions.find(opt => opt.value === newReview.sourceIcon) || null}
                  onChange={opt => {
                    const selectedOpt = opt as { value: string; label: string; icon: React.ReactNode } | null;
                    setNewReview(r => ({
                      ...r,
                      sourceIcon: selectedOpt ? selectedOpt.value : '',
                      source: selectedOpt ? selectedOpt.label : ''
                    }));
                  }}
                  placeholder="Select Source"
                  components={{}}
                  isClearable
                  isSearchable={false}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  styles={{
                    ...getSelectStyles(),
                    control: (base) => ({
                      ...base,
                      minHeight: '40px',
                      fontSize: '0.875rem',
                    }),
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">Description</label>
                <input
                  type="text"
                  value={newReview.description}
                  onChange={e => setNewReview(r => ({ ...r, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm h-10"
                  placeholder="Description"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddReview}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg h-10 transition-colors"
              disabled={!(newReview.username && newReview.date && newReview.description && newReview.source)}
            >Add Review</button>
          </div>

          {/* Rules Section */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Rules</label>
            <div className="space-y-2 mb-2">
              {(formData.rules || []).map((rule, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="flex-1 text-sm text-neutral-700">{rule}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveRule(idx)}
                    className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg h-10 transition-colors"
                  >Remove</button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newRule}
                onChange={e => setNewRule(e.target.value)}
                className="flex-1 px-3 py-2 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm h-10"
                placeholder="Add a rule (e.g., No smoking)"
              />
              <button
                type="button"
                onClick={handleAddRule}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg h-10 transition-colors"
                disabled={!newRule.trim()}
              >Add</button>
            </div>
          </div>

          {/* Other Rules Section */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Other Notes</label>
            <textarea
              value={formData.otherRules || ''}
              onChange={e => setFormData(prev => ({ ...prev, otherRules: e.target.value }))}
              rows={2}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm resize-none"
              placeholder="Add any other notes (e.g., check-in after 2pm, etc.)"
            />
          </div>

          {/* Property Policies Section */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-neutral-700">Property Policies</label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-neutral-600 mb-1">Check-in</label>
                <textarea
                  value={formData.policies?.checkIn || ''}
                  onChange={e => setFormData(prev => ({ ...prev, policies: { ...(prev.policies || { checkIn: '', checkOut: '', cancellationPrepayment: '' }), checkIn: e.target.value } }))}
                  rows={4}
                  className="w-full px-3 py-2 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm"
                  placeholder="Check-in policy"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-neutral-600 mb-1">Check-out</label>
                <textarea
                  value={formData.policies?.checkOut || ''}
                  onChange={e => setFormData(prev => ({ ...prev, policies: { ...(prev.policies || { checkIn: '', checkOut: '', cancellationPrepayment: '' }), checkOut: e.target.value } }))}
                  rows={4}
                  className="w-full px-3 py-2 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm"
                  placeholder="Check-out policy"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-neutral-600 mb-1">Cancellation/Prepayment</label>
              <textarea
                value={formData.policies?.cancellationPrepayment || ''}
                onChange={e => setFormData(prev => ({ ...prev, policies: { ...(prev.policies || { checkIn: '', checkOut: '', cancellationPrepayment: '' }), cancellationPrepayment: e.target.value } }))}
                rows={3}
                className="w-full px-3 py-2 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm"
                placeholder="Cancellation and prepayment policy"
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-neutral-700">
                Features
              </label>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, features: [...prev.features, ''] }))}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors h-10"
              >
                + Add Feature
              </button>
            </div>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...formData.features];
                      newFeatures[index] = e.target.value;
                      setFormData(prev => ({ ...prev, features: newFeatures }));
                    }}
                    className="flex-1 px-4 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm h-12"
                    placeholder="e.g., Ocean Views, Garden, Modern Design"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newFeatures = formData.features.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, features: newFeatures }));
                    }}
                    className="px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors h-12 bg-white/80 backdrop-blur-sm border border-red-200/50 hover:border-red-300/60"
                  >
                    Remove
                  </button>
                </div>
              ))}
              {formData.features.length === 0 && (
                <p className="text-sm text-neutral-500">No features added yet.</p>
              )}
            </div>
          </div>

          {/* Gallery Images - Ultimate Drag & Drop with Upload Progress */}
          <UltimateDragGallery
            images={galleryImages}
            onImagesReorder={handleGalleryReorder}
            onImageRemove={handleGalleryImageRemove}
            onImageUpload={handleGalleryImageUpload}
            maxImages={20}
            allowUpload={true}
            allowRemove={true}
            allowHeroSelection={false}
            gridCols={3}
            aspectRatio="landscape"
          />

          {/* Enhanced Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-neutral-200/50 bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm rounded-b-2xl -mx-2 px-6 pb-2">
            <motion.button
              type="button"
              onClick={onCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-6 py-3 text-neutral-600 bg-white/80 backdrop-blur-sm border border-neutral-200/50 hover:bg-neutral-50/90 hover:border-neutral-300/60 rounded-xl transition-all duration-300 font-medium shadow-sm h-12"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl h-12"
            >
              <Save className="w-5 h-5" />
              {property ? 'Update Property' : 'Save Property'}
            </motion.button>
          </div>
        </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyForm;
