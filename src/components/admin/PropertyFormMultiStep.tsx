'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Select, { components, OptionProps, SingleValueProps } from 'react-select';
import { FaMapMarkerAlt, FaCheckCircle, FaMobileAlt, FaLink, FaLightbulb } from 'react-icons/fa';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Home, 
  Building2, 
  Waves, 
  MapPin,
  Users,
  Bed,
  Bath,
  DollarSign,
  Camera,
  FileText,
  Settings,
  Image as ImageIcon,
  Plus,
  Trash2,
  MessageCircle,
  AlertCircle,
  Star,
  ExternalLink,
  Info
} from 'lucide-react';
import { Property, UnifiedReview } from '../../data/properties';
import AmenitiesSelector from './AmenitiesSelector';
import { EnhancedImageUpload } from '../ui/EnhancedImageUpload';
import PropertyImageGallery from '../ui/PropertyImageGallery';
// import { deleteImageFromFirebase, isFirebaseStorageUrl } from '@/lib/firebase/deleteImage';

// Type definitions
interface PropertyFormProps {
  property?: Property | null;
  onSave: (property: Property | Omit<Property, 'id'>) => void;
  onCancel: () => void;
}

type FormDataType = Omit<Property, 'id'>;

// Form steps configuration
const FORM_STEPS = [
  { id: 'basic', title: 'Basic Info', icon: Home },
  { id: 'pricing', title: 'Pricing', icon: DollarSign },
  { id: 'images', title: 'Images', icon: Camera },
  { id: 'amenities', title: 'Amenities', icon: Settings },
  { id: 'content', title: 'Content', icon: FileText },
  { id: 'reviews', title: 'Reviews', icon: MessageCircle },
];

// Select options
const propertyTypeOptions = [
  { value: 'villa', label: 'Villa', icon: <Home className="w-4 h-4 text-green-600" /> },
  { value: 'apartment', label: 'Apartment', icon: <Building2 className="w-4 h-4 text-blue-600" /> },
  { value: 'house', label: 'House', icon: <Building2 className="w-4 h-4 text-yellow-600" /> },
  { value: 'resort', label: 'Resort', icon: <Waves className="w-4 h-4 text-cyan-600" /> },
];

// Enhanced custom components for react-select
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

// Enhanced dropdown styles
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

const PropertyFormMultiStep = ({ property, onSave, onCancel }: PropertyFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newRule, setNewRule] = useState('');
  
  // Location content state variables
  const [newAttraction, setNewAttraction] = useState({ name: '', distance: '' });
  const [newTransport, setNewTransport] = useState({ name: '', details: '' });
  
  // Unified Review state - combines platform rating with individual review
  const [newUnifiedReview, setNewUnifiedReview] = useState<UnifiedReview>({
    id: '',
    platform: 'google',
    rating: 4.0,
    maxScale: 5,
    reviewCount: 1, // Default to 1
    platformUrl: '',
    lastUpdated: new Date().toISOString().split('T')[0],
    reviewerName: '',
    reviewDate: '',
    reviewText: '',
    reviewSourceUrl: ''
  });

  const [formData, setFormData] = useState<FormDataType>({
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
    reviewCount: 0,
    ratings: [],
    unifiedReviews: [],
    images: {
      hero: '',
      gallery: []
    },
    amenities: [],
    features: [],
    description: '',
    locationContent: {
      description: '',
      nearbyAttractions: [],
      transportation: []
    },
    reviews: [],
    rules: [],
    otherRules: '',
    policies: {
      checkIn: "From 2:00 PM\n\nGuests are required to show a photo ID and credit card at check-in.\nYou need to let the property know what time you'll be arriving in advance.",
      checkOut: '12:00 PM (Noon). Late check-out may be available for an additional fee, subject to availability.',
      cancellationPrepayment: 'Cancellation and prepayment policies vary according to accommodation type. Check what conditions apply to each option when making your selection.'
    }
  });

  const defaultPolicies = useMemo(() => ({
    checkIn: "From 2:00 PM\n\nGuests are required to show a photo ID and credit card at check-in.\nYou need to let the property know what time you'll be arriving in advance.",
    checkOut: '12:00 PM (Noon). Late check-out may be available for an additional fee, subject to availability.',
    cancellationPrepayment: 'Cancellation and prepayment policies vary according to accommodation type. Check what conditions apply to each option when making your selection.'
  }), []);

  const updatePolicyField = useCallback((key: 'checkIn' | 'checkOut' | 'cancellationPrepayment', value: string) => {
    setFormData(prev => ({
      ...prev,
      policies: {
        ...(prev.policies ?? defaultPolicies),
        [key]: value,
      }
    }));
  }, [defaultPolicies]);

  // Helper function to extract URL from iframe code
  const extractUrlFromIframe = useCallback((input: string): string => {
    if (!input || input.trim() === '') return '';
    
    // If it's already a URL (not iframe code), return as-is
    if (input.startsWith('https://www.google.com/maps/embed')) {
      return input;
    }
    
    // If it's iframe code, extract the src attribute
    if (input.includes('<iframe') && input.includes('src=')) {
      const srcMatch = input.match(/src=["']([^"']+)["']/);
      if (srcMatch && srcMatch[1]) {
        return srcMatch[1];
      }
    }
    
    return input;
  }, []);

  // Helper function to validate Google Maps embed URL or iframe code
  const isValidEmbedUrl = useCallback((input: string): boolean => {
    if (!input || input.trim() === '') return false;
    
    // Extract URL from iframe if needed
    const url = extractUrlFromIframe(input);
    
    try {
      const urlObj = new URL(url);
      
      // Check for Google Maps embed URL format
      return (
        urlObj.hostname === 'www.google.com' &&
        urlObj.pathname === '/maps/embed' &&
        urlObj.searchParams.has('pb')
      );
    } catch {
      return false;
    }
  }, [extractUrlFromIframe]);

  // Form validation for each step - memoized to prevent unnecessary re-calculations
  const validateStep = useCallback((stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0: // Basic Info
        return !!(
          formData.title.trim() && 
          formData.address.trim() && 
          formData.type &&
          (!formData.locationUrl || isValidEmbedUrl(formData.locationUrl))
        );
      case 1: // Details
        return !!(
          formData.maxGuests > 0 && 
          formData.bedrooms > 0 && 
          formData.bathrooms > 0
        );
      case 2: // Pricing
        return formData.pricing.defaultPrice > 0;
      case 3: // Images
        return !!(formData.images.hero.trim());
      case 4: // Amenities
        return true; // Optional step
      case 5: // Content
        return !!(formData.description.trim());
      case 6: // Reviews (optional but each added must be valid)
        // Reviews step is optional, but if unified reviews exist, they should be valid
        return true; // Always valid since reviews are optional
      default:
        return false;
    }
  }, [formData.title, formData.address, formData.type, formData.locationUrl, formData.maxGuests, formData.bedrooms, formData.bathrooms, formData.pricing.defaultPrice, formData.images.hero, formData.description, isValidEmbedUrl]);

  // Memoized validation state for current step to prevent re-calculations
  const isCurrentStepValid = useMemo(() => validateStep(currentStep), [validateStep, currentStep]);

  // Auto-generate slug when title changes - debounced to prevent excessive updates
  useEffect(() => {
    if (formData.title) {
      const timeoutId = setTimeout(() => {
        const slug = formData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
        setFormData(prev => ({ ...prev, slug }));
      }, 300); // 300ms debounce

      return () => clearTimeout(timeoutId);
    }
  }, [formData.title]);

  // Initialize form data if editing
  useEffect(() => {
    if (property) {
      setFormData({
        ...property,
        address: property.address || '',
        locationUrl: property.locationUrl || '',
        reviews: property.reviews || [],
        ratings: property.ratings || [],
        otherRules: property.otherRules || '',
        locationContent: property.locationContent || {
          description: '',
          nearbyAttractions: [],
          transportation: []
        },
        policies: property.policies || {
          checkIn: "From 2:00 PM\n\nGuests are required to show a photo ID and credit card at check-in.\nYou need to let the property know what time you'll be arriving in advance.",
          checkOut: '12:00 PM (Noon). Late check-out may be available for an additional fee, subject to availability.',
          cancellationPrepayment: 'Cancellation and prepayment policies vary according to accommodation type. Check what conditions apply to each option when making your selection.'
        }
      });
    }
  }, [property]);

  // Navigation handlers
  const nextStep = useCallback(() => {
    if (currentStep < FORM_STEPS.length - 1) {
      // Mark current step as completed if it's valid
      if (isCurrentStepValid) {
        setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
      }
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, isCurrentStepValid]);

  const previousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < FORM_STEPS.length) {
      // Edit mode: Allow free navigation to any step
      if (property) {
        setCurrentStep(stepIndex);
        return;
      }
      
      // New property mode: Sequential navigation with final step flexibility
      if (currentStep === FORM_STEPS.length - 1) {
        // From final step, allow navigation to any previous step
        if (stepIndex < FORM_STEPS.length - 1) {
          setCurrentStep(stepIndex);
          return;
        }
      }
      
      // Sequential navigation: only allow forward if current step is valid,
      // or backward to completed/previous steps
      if (stepIndex > currentStep) {
        // Moving forward: only if current step is valid
        if (isCurrentStepValid) {
          setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
          setCurrentStep(stepIndex);
        }
      } else {
        // Moving backward: allow to any previous step
        setCurrentStep(stepIndex);
      }
    }
  }, [currentStep, isCurrentStepValid, property]);

  // Optimized form field handlers - memoized to prevent unnecessary re-renders
  const handleFieldChange = useCallback(
    <K extends keyof FormDataType>(field: K, value: FormDataType[K]) => {
      setFormData(prev => ({ ...prev, [field]: value } as FormDataType));
    },
    []
  );

  const handleNestedFieldChange = useCallback(
    <K extends keyof FormDataType, C extends keyof FormDataType[K]>(
      parentField: K,
      childField: C,
      value: FormDataType[K][C]
    ) => {
      setFormData(prev => {
        const parentData = prev[parentField] as unknown as Record<string, unknown>;
        const nextParent = {
          ...parentData,
          [String(childField)]: value,
        } as FormDataType[K];
        return { ...prev, [parentField]: nextParent } as FormDataType;
      });
    },
    []
  );

  // Rule management handlers - memoized to prevent unnecessary re-renders
  const handleAddRule = useCallback(() => {
    if (newRule.trim()) {
      handleFieldChange('rules', [...(formData.rules || []), newRule]);
      setNewRule('');
    }
  }, [newRule, formData.rules, handleFieldChange]);

  const handleRemoveRule = useCallback((index: number) => {
    handleFieldChange('rules', (formData.rules || []).filter((_, i) => i !== index));
  }, [formData.rules, handleFieldChange]);

  // Location content handlers - memoized to prevent unnecessary re-renders
  const handleAddAttraction = useCallback(() => {
    if (newAttraction.name.trim() && newAttraction.distance.trim()) {
      const currentContent = formData.locationContent || { description: '', nearbyAttractions: [], transportation: [] };
      handleFieldChange('locationContent', {
        ...currentContent,
        nearbyAttractions: [...currentContent.nearbyAttractions, { ...newAttraction }]
      });
      setNewAttraction({ name: '', distance: '' });
    }
  }, [newAttraction, formData.locationContent, handleFieldChange]);

  const handleRemoveAttraction = useCallback((index: number) => {
    const currentContent = formData.locationContent || { description: '', nearbyAttractions: [], transportation: [] };
    handleFieldChange('locationContent', {
      ...currentContent,
      nearbyAttractions: currentContent.nearbyAttractions.filter((_, i) => i !== index)
    });
  }, [formData.locationContent, handleFieldChange]);

  const handleAddTransport = useCallback(() => {
    if (newTransport.name.trim() && newTransport.details.trim()) {
      const currentContent = formData.locationContent || { description: '', nearbyAttractions: [], transportation: [] };
      handleFieldChange('locationContent', {
        ...currentContent,
        transportation: [...currentContent.transportation, { ...newTransport }]
      });
      setNewTransport({ name: '', details: '' });
    }
  }, [newTransport, formData.locationContent, handleFieldChange]);

  const handleRemoveTransport = useCallback((index: number) => {
    const currentContent = formData.locationContent || { description: '', nearbyAttractions: [], transportation: [] };
    handleFieldChange('locationContent', {
      ...currentContent,
      transportation: currentContent.transportation.filter((_, i) => i !== index)
    });
  }, [formData.locationContent, handleFieldChange]);

  const handleLocationDescriptionChange = useCallback((description: string) => {
    const currentContent = formData.locationContent || { description: '', nearbyAttractions: [], transportation: [] };
    handleFieldChange('locationContent', {
      ...currentContent,
      description
    });
  }, [formData.locationContent, handleFieldChange]);


  // Unified Review management handlers
  const handleAddUnifiedReview = useCallback(() => {
    const { platform, rating, maxScale, platformUrl, lastUpdated, reviewerName, reviewDate, reviewText, reviewSourceUrl } = newUnifiedReview;
    if (rating <= 0) return;
    
    // Generate unique ID for the review with timestamp and random component for uniqueness
    const reviewId = `${platform}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Always add new review - allow multiple reviews from same platform
    const existingReviews = formData.unifiedReviews || [];
    
    const newReviewData: UnifiedReview = {
      id: reviewId,
      platform,
      rating: Math.min(rating, maxScale),
      reviewCount: 1, // Default to 1 since we removed the field
      maxScale,
      platformUrl: platformUrl?.trim() || undefined,
      lastUpdated: lastUpdated || new Date().toISOString().split('T')[0],
      reviewerName: reviewerName?.trim() || undefined,
      reviewDate: reviewDate || undefined,
      reviewText: reviewText?.trim() || undefined,
      reviewSourceUrl: reviewSourceUrl?.trim() || undefined
    };

    // Always add new review to allow multiple reviews from same platform
    handleFieldChange('unifiedReviews', [...existingReviews, newReviewData]);
    
    // Reset form
    setNewUnifiedReview({
      id: '',
      platform: 'google',
      rating: 4.0,
      maxScale: 5,
      reviewCount: 1, // Default value
      platformUrl: '',
      lastUpdated: new Date().toISOString().split('T')[0],
      reviewerName: '',
      reviewDate: '',
      reviewText: '',
      reviewSourceUrl: ''
    });
  }, [newUnifiedReview, formData.unifiedReviews, handleFieldChange]);

  const handleRemoveUnifiedReview = useCallback((index: number) => {
    handleFieldChange('unifiedReviews', (formData.unifiedReviews || []).filter((_, i) => i !== index));
  }, [formData.unifiedReviews, handleFieldChange]);

  // Form submission
  const handleSubmit = useCallback(async () => {
    if (!isCurrentStepValid) return;
    
    setIsSubmitting(true);
    try {
      // Clean and validate data before submission
      const cleanedData = {
        ...formData,
        // Clean title and address
        title: formData.title.trim(),
        address: formData.address.trim(),
        
        // Ensure slug is set
        slug: formData.slug.trim() || formData.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-+|-+$/g, ''),
        
        // Clean description and rules
        description: formData.description.trim(),
        rules: (formData.rules || []).filter(rule => rule.trim() !== ''),
        otherRules: formData.otherRules?.trim() || '',
        
        // Filter out empty features and amenities
        features: formData.features.filter(feature => feature.trim() !== ''),
        amenities: formData.amenities.filter(amenity => amenity.trim() !== ''),
        
        // Clean images
        images: {
          hero: formData.images.hero.trim(),
          gallery: formData.images.gallery.filter(image => image.trim() !== '')
        },
        
        // Ensure numeric fields are valid
        maxGuests: Math.max(1, formData.maxGuests),
        bedrooms: Math.max(1, formData.bedrooms),
        bathrooms: Math.max(1, formData.bathrooms),
        
        // Set review count based on unified reviews
        reviewCount: (formData.unifiedReviews || []).length,
        
        // Ensure pricing is valid and always USD
        pricing: {
          currency: 'USD', // Always set to USD
          defaultPrice: Math.max(0, formData.pricing.defaultPrice),
          rules: (formData.pricing.rules || []).filter(rule => rule.price > 0)
        },
        
        // Clean location data
        locationUrl: formData.locationUrl?.trim() || '',
        
        // Clean and validate location content
        locationContent: formData.locationContent ? {
          description: formData.locationContent.description?.trim() || '',
          nearbyAttractions: (formData.locationContent.nearbyAttractions || [])
            .filter(attraction => attraction.name.trim() && attraction.distance.trim())
            .map(attraction => ({
              name: attraction.name.trim(),
              distance: attraction.distance.trim()
            })),
          transportation: (formData.locationContent.transportation || [])
            .filter(transport => transport.name.trim() && transport.details.trim())
            .map(transport => ({
              name: transport.name.trim(),
              details: transport.details.trim()
            }))
        } : undefined,
        
        // Ensure policies exist
        policies: {
          checkIn: formData.policies?.checkIn || defaultPolicies.checkIn,
          checkOut: formData.policies?.checkOut || defaultPolicies.checkOut,
          cancellationPrepayment: formData.policies?.cancellationPrepayment || defaultPolicies.cancellationPrepayment
        }
      };
      
      await onSave(cleanedData);
    } catch (error) {
      console.error('Error saving property:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [isCurrentStepValid, formData, onSave, defaultPolicies]);

  // Step Components - memoized to prevent unnecessary re-renders
  const BasicInfoStep = useMemo(() => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Home className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Property Information</h3>
        <p className="text-gray-600">Essential information and details about your property</p>
      </div>

      <div className="space-y-6">
        {/* Property Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Property Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm"
            placeholder="Ex: Luxury Villa with Ocean View"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Address (for display) *
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleFieldChange('address', e.target.value)}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm"
              placeholder="Ex: Colombo, Sri Lanka"
              required
            />
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Property Type *
          </label>
          <Select
            options={propertyTypeOptions}
            value={propertyTypeOptions.find(opt => opt.value === formData.type)}
            onChange={(opt) => handleFieldChange('type', (opt as OptionType).value as Property['type'])}
            components={{ Option, SingleValue }}
            styles={getSelectStyles()}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            className="w-full"
            placeholder="Select property type"
          />
        </div>

        {/* Property Details Grid */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Property Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Max Guests *
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 z-10 pointer-events-none" />
                <input
                  type="number"
                  min="1"
                  value={formData.maxGuests}
                  onChange={(e) => handleFieldChange('maxGuests', parseInt(e.target.value) || 1)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bedrooms *
              </label>
              <div className="relative">
                <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-600 z-10 pointer-events-none" />
                <input
                  type="number"
                  min="1"
                  value={formData.bedrooms}
                  onChange={(e) => handleFieldChange('bedrooms', parseInt(e.target.value) || 1)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bathrooms *
              </label>
              <div className="relative">
                <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-600 z-10 pointer-events-none" />
                <input
                  type="number"
                  min="1"
                  value={formData.bathrooms}
                  onChange={(e) => handleFieldChange('bathrooms', parseInt(e.target.value) || 1)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Map URL Section */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Location Map
          </h4>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Embedded Map URL (iframe src)
            </label>
            <input
              type="text"
              value={formData.locationUrl}
              onChange={(e) => {
                const input = e.target.value;
                // Automatically extract URL from iframe code if needed
                const extractedUrl = extractUrlFromIframe(input);
                handleFieldChange('locationUrl', extractedUrl);
              }}
              className={`w-full px-4 py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:ring-2 transition-all duration-300 shadow-sm ${
                formData.locationUrl && !isValidEmbedUrl(formData.locationUrl)
                  ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                  : formData.locationUrl && isValidEmbedUrl(formData.locationUrl)
                  ? 'border-green-300 focus:ring-green-500/20 focus:border-green-500'
                  : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500'
              }`}
              placeholder="Paste iframe code or just the src URL: https://www.google.com/maps/embed?pb=..."
            />
            
            {/* Validation indicators */}
            {formData.locationUrl && (
              <div className="mt-2 flex items-center gap-2">
                {isValidEmbedUrl(formData.locationUrl) ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-xs">Valid embed URL</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs">Please enter a valid Google Maps embed URL</span>
                  </div>
                )}
              </div>
            )}

            {/* Instructions */}
            <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-700 font-medium mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-600" />
                How to get the Google Maps embed code:
              </p>
              <ol className="text-xs text-blue-600 space-y-1 ml-4 list-decimal">
                <li>Go to <span className="font-medium">maps.google.com</span> and search for your property</li>
                <li>Click <span className="font-medium">&quot;Share&quot;</span> → <span className="font-medium">&quot;Embed a map&quot;</span></li>
                <li>Copy the <strong>entire iframe code</strong> and paste it here</li>
                <li>Or copy just the <span className="font-medium">src=&quot;...&quot;</span> URL portion</li>
              </ol>
              <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
                <p className="text-blue-800 font-medium mb-1 flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" />
                  Both formats work:
                </p>
                <p className="text-blue-700 flex items-center gap-2">
                  <FaMobileAlt className="text-blue-600" />
                  <strong>Full iframe:</strong> <code>&lt;iframe src=&quot;...&quot; ...&gt;&lt;/iframe&gt;</code>
                </p>
                <p className="text-blue-700 flex items-center gap-2">
                  <FaLink className="text-blue-600" />
                  <strong>Just URL:</strong> <code>https://www.google.com/maps/embed?pb=...</code>
                </p>
              </div>
            </div>

            {/* Live Preview */}
            {formData.locationUrl && isValidEmbedUrl(formData.locationUrl) && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Map Preview:</p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src={formData.locationUrl}
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                    title="Property Location Map Preview"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  This is how the map will appear on your property page
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  ), [formData.title, formData.address, formData.locationUrl, formData.type, formData.maxGuests, formData.bedrooms, formData.bathrooms, handleFieldChange, isValidEmbedUrl, extractUrlFromIframe]);



  const PricingStep = useMemo(() => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <DollarSign className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Pricing Information</h3>
        <p className="text-gray-600">Set your rates in US Dollars</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Default Price (USD per night) *
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-600 z-10 pointer-events-none" />
            <input
              type="number"
              min="0"
              value={formData.pricing.defaultPrice}
              onChange={(e) => handleNestedFieldChange('pricing', 'defaultPrice', parseFloat(e.target.value) || 0)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 shadow-sm"
              placeholder="Enter price per night"
              required
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">Date-Specific Pricing</h4>
            <p className="text-sm text-blue-700">
              You can add date-specific pricing later to set custom rates for holidays, peak seasons, or special events.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  ), [formData.pricing.defaultPrice, handleNestedFieldChange]);

  const ImagesStep = useMemo(() => {
    const ImagesStepComponent = () => {
      return (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
              <Camera className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Property Images</h3>
            <p className="text-gray-600">Upload stunning photos to showcase your property</p>
          </div>

          {/* Hero Image Section */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <EnhancedImageUpload
              images={formData.images.hero ? [{
                id: 'hero-image',
                url: formData.images.hero,
                isHero: true
              }] : []}
              onImagesChange={(images) => {
                const heroUrl = images.length > 0 ? images[0].url : '';
                handleNestedFieldChange('images', 'hero', heroUrl);
              }}
              maxImages={1}
              folder="properties"
              baseName={`${formData.slug || 'property'}-hero`}
              compressionMode="hero"
              allowHeroSelection={false}
              title="Hero Image *"
              className="w-full"
            />
          </div>

          {/* Gallery Section */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <EnhancedImageUpload
              images={formData.images.gallery.map((url, index) => ({
                id: `gallery-${index}`,
                url,
                isHero: false
              }))}
              onImagesChange={(images) => {
                const urls = images.map(img => img.url);
                handleNestedFieldChange('images', 'gallery', urls);
              }}
              maxImages={20}
              folder="properties"
              baseName={formData.slug || 'property'}
              compressionMode="property"
              allowHeroSelection={false}
              title="Property Gallery"
              className="w-full"
            />
          </div>

          {/* Dynamic Gallery Preview */}
          {(formData.images.hero || formData.images.gallery.length > 0) && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                  <ImageIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Gallery Preview</h4>
                <p className="text-sm text-gray-600">This is how your gallery will appear to website visitors</p>
                <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  <Check className="w-3 h-3" />
                  <span>
                    {[
                      ...(formData.images.hero ? [formData.images.hero] : []),
                      ...formData.images.gallery
                    ].filter(img => img && img.trim() !== '').length} photos ready
                  </span>
                </div>
              </div>
              
              <PropertyImageGallery
                images={[
                  ...(formData.images.hero ? [formData.images.hero] : []),
                  ...formData.images.gallery
                ].filter(img => img && img.trim() !== '')}
                title={formData.title || 'Property Gallery'}
                showCount={3} // Show only 3 images with overlay on 3rd if more exist
                className="max-w-4xl mx-auto"
              />
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                  <FaLightbulb className="text-yellow-500" />
                  Tip: Gallery shows a clean preview with limited images. If you have more than 3 photos,
                  the last visible image will show a &quot;+X more photos&quot; overlay that opens the full gallery.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      );
    };

    return <ImagesStepComponent />;
  }, [formData.images.hero, formData.images.gallery, formData.slug, formData.title, handleNestedFieldChange]);

  const AmenitiesStep = useMemo(() => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
          <Settings className="w-8 h-8 text-orange-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Amenities & Features</h3>
        <p className="text-gray-600">Select the amenities and services available</p>
      </div>

      <AmenitiesSelector
        selectedAmenities={formData.amenities}
        onAmenitiesChange={(amenities) => handleFieldChange('amenities', amenities)}
      />

      <div className="mt-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Additional Features
        </label>
        <textarea
          value={formData.features.join('\n')}
          onChange={(e) => handleFieldChange('features', e.target.value.split('\n').filter(f => f.trim()))}
          rows={4}
          className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 shadow-sm resize-none"
          placeholder="Enter additional features, one per line..."
        />
      </div>
    </motion.div>
  ), [formData.amenities, formData.features, handleFieldChange]);

  const ReviewsStep = useMemo(() => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
          <Star className="w-8 h-8 text-yellow-600 fill-current" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Reviews & Ratings</h3>
        <p className="text-gray-600">Add customer reviews from different platforms</p>
      </div>

      {/* Add New Review Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Add New Review</h4>
        
        {/* Platform Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Platform *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { key: 'google', name: 'Google', icon: '/brands/google.svg' },
              { key: 'booking', name: 'Booking.com', icon: '/brands/bookingcom.svg' },
              { key: 'airbnb', name: 'Airbnb', icon: '/brands/airbnb.svg' },
              { key: 'tripadvisor', name: 'TripAdvisor', icon: '/brands/tripadvisor.svg' },
              { key: 'other', name: 'Other', icon: null }
            ].map((platform) => (
              <button
                key={platform.key}
                type="button"
                onClick={() => setNewUnifiedReview(r => ({ 
                  ...r, 
                  platform: platform.key as UnifiedReview['platform'],
                  maxScale: platform.key === 'booking' ? 10 : 5
                }))}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2
                  ${newUnifiedReview.platform === platform.key
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                {platform.icon ? (
                  <Image 
                    src={platform.icon} 
                    alt={platform.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                ) : (
                  <Star className="w-8 h-8 text-yellow-500 fill-current" />
                )}
                <span className="text-sm font-medium text-gray-900">{platform.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating * (0-{newUnifiedReview.maxScale})
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max={newUnifiedReview.maxScale}
                step="0.1"
                value={newUnifiedReview.rating}
                onChange={(e) => setNewUnifiedReview(r => ({ 
                  ...r, 
                  rating: Math.min(parseFloat(e.target.value) || 0, newUnifiedReview.maxScale)
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="4.5"
                required
              />
              <Star className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-500 fill-current" />
            </div>
          </div>

          {/* Reviewer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reviewer Name
            </label>
            <input
              type="text"
              value={newUnifiedReview.reviewerName}
              onChange={(e) => setNewUnifiedReview(r => ({ ...r, reviewerName: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
            />
          </div>

          {/* Review Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review Date
            </label>
            <input
              type="date"
              value={newUnifiedReview.reviewDate}
              onChange={(e) => setNewUnifiedReview(r => ({ ...r, reviewDate: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Source URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review Source URL
            </label>
            <input
              type="url"
              value={newUnifiedReview.reviewSourceUrl}
              onChange={(e) => setNewUnifiedReview(r => ({ ...r, reviewSourceUrl: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Review Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Review Text
          </label>
          <textarea
            value={newUnifiedReview.reviewText}
            onChange={(e) => setNewUnifiedReview(r => ({ ...r, reviewText: e.target.value }))}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="What did the customer say about their experience?"
          />
        </div>

        {/* Add Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAddUnifiedReview}
            disabled={!newUnifiedReview.platform || newUnifiedReview.rating <= 0}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Review
          </button>
        </div>
      </div>

      {/* Existing Reviews List */}
      {(formData.unifiedReviews && formData.unifiedReviews.length > 0) && (
        <div className="space-y-4">
          {/* Enhanced Review Summary */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  Review Summary
                </h4>
                <p className="text-sm text-gray-600">
                  {formData.unifiedReviews.length} review{formData.unifiedReviews.length !== 1 ? 's' : ''} added
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-1">
                  <Star className="w-6 h-6 text-yellow-500 fill-current" />
                  <span className="text-2xl font-bold text-gray-900">
                    {(formData.unifiedReviews.reduce((sum, review) => {
                      const normalizedRating = review.maxScale === 10 ? review.rating / 2 : review.rating;
                      return sum + normalizedRating;
                    }, 0) / formData.unifiedReviews.length).toFixed(1)}
                  </span>
                  <span className="text-lg text-gray-600">/5.0</span>
                </div>
                <div className="text-sm text-gray-600">
                  Overall Rating
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {formData.unifiedReviews.map((review, idx) => {
              const platformIcons = {
                google: '/brands/google.svg',
                booking: '/brands/bookingcom.svg',
                airbnb: '/brands/airbnb.svg',
                tripadvisor: '/brands/tripadvisor.svg',
                other: null
              };

              const platformNames = {
                google: 'Google',
                booking: 'Booking.com',
                airbnb: 'Airbnb',
                tripadvisor: 'TripAdvisor',
                other: 'Other'
              };

              return (
                <div key={review.id || idx} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {platformIcons[review.platform] ? (
                        <Image 
                          src={platformIcons[review.platform]!} 
                          alt={platformNames[review.platform]}
                          width={24}
                          height={24}
                          className="w-6 h-6 object-contain"
                        />
                      ) : (
                        <Star className="w-6 h-6 text-yellow-500 fill-current" />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            {platformNames[review.platform]}
                          </span>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < Math.floor(review.maxScale === 10 ? review.rating / 2 : review.rating)
                                    ? 'text-yellow-500 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm font-medium text-gray-700 ml-1">
                              {review.rating}/{review.maxScale}
                            </span>
                          </div>
                        </div>
                        {review.reviewerName && (
                          <div className="text-sm text-gray-600">
                            by {review.reviewerName}
                            {review.reviewDate && (
                              <span className="ml-2">• {new Date(review.reviewDate).toLocaleDateString()}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {review.reviewSourceUrl && review.platform !== 'other' && (
                        <a
                          href={review.reviewSourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="View original review"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {review.reviewSourceUrl && review.platform === 'other' && (
                        <a
                          href={review.reviewSourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-800 transition-colors"
                          title="View source"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveUnifiedReview(idx)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Remove review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {review.reviewText && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-gray-700 text-sm italic">
                        &ldquo;{review.reviewText}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  ), [newUnifiedReview, formData.unifiedReviews, handleAddUnifiedReview, handleRemoveUnifiedReview]);

  const ContentStep = useMemo(() => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <FileText className="w-8 h-8 text-indigo-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Content & Rules</h3>
        <p className="text-gray-600">Add description and house rules</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Property Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          rows={6}
          className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm resize-none"
          placeholder="Describe your property in detail..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          House Rules
        </label>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              placeholder="Add a house rule..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddRule();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddRule}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {formData.rules && formData.rules.length > 0 && (
            <div className="space-y-2">
              {formData.rules.map((rule, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <span className="flex-1 text-sm">{rule}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveRule(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Additional Notes
        </label>
        <textarea
          value={formData.otherRules || ''}
          onChange={(e) => handleFieldChange('otherRules', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm resize-none"
          placeholder="Any additional notes or special instructions..."
        />
      </div>

      {/* Location Content Section */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-indigo-600" />
          <h4 className="text-lg font-semibold text-gray-900">Location Content</h4>
        </div>
        
        {/* Location Description */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location Description
          </label>
          <textarea
            value={formData.locationContent?.description || ''}
            onChange={(e) => handleLocationDescriptionChange(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm resize-none"
            placeholder="Describe the location, neighborhood, and what makes it special..."
          />
        </div>

        {/* Nearby Attractions */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nearby Attractions
          </label>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="text"
                value={newAttraction.name}
                onChange={(e) => setNewAttraction(prev => ({ ...prev, name: e.target.value }))}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="Attraction name..."
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newAttraction.distance}
                  onChange={(e) => setNewAttraction(prev => ({ ...prev, distance: e.target.value }))}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  placeholder="Distance (e.g., 10 min drive)"
                />
                <button
                  type="button"
                  onClick={handleAddAttraction}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {formData.locationContent?.nearbyAttractions && formData.locationContent.nearbyAttractions.length > 0 && (
              <div className="space-y-2">
                {formData.locationContent.nearbyAttractions.map((attraction, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <span className="font-medium text-sm text-gray-900">{attraction.name}</span>
                      <span className="text-xs text-gray-600 ml-2">- {attraction.distance}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttraction(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Transportation */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Transportation
          </label>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="text"
                value={newTransport.name}
                onChange={(e) => setNewTransport(prev => ({ ...prev, name: e.target.value }))}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="Transportation option..."
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTransport.details}
                  onChange={(e) => setNewTransport(prev => ({ ...prev, details: e.target.value }))}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  placeholder="Details (e.g., 45 min drive)"
                />
                <button
                  type="button"
                  onClick={handleAddTransport}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {formData.locationContent?.transportation && formData.locationContent.transportation.length > 0 && (
              <div className="space-y-2">
                {formData.locationContent.transportation.map((transport, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <span className="font-medium text-sm text-gray-900">{transport.name}</span>
                      <span className="text-xs text-gray-600 ml-2">- {transport.details}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveTransport(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Property Policies */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-gray-700">Property Policies</label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Check-in</label>
            <textarea
              value={formData.policies?.checkIn || ''}
              onChange={(e) => updatePolicyField('checkIn', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm resize-none"
              placeholder="Check-in policy"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Check-out</label>
            <textarea
              value={formData.policies?.checkOut || ''}
              onChange={(e) => updatePolicyField('checkOut', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm resize-none"
              placeholder="Check-out policy"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-xs font-medium text-gray-600 mb-1">Cancellation/Prepayment</label>
          <textarea
            value={formData.policies?.cancellationPrepayment || ''}
            onChange={(e) => updatePolicyField('cancellationPrepayment', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm resize-none"
            placeholder="Cancellation and prepayment policy"
          />
        </div>
      </div>
    </motion.div>
  ), [
    formData.description,
    formData.rules,
    formData.otherRules,
    formData.policies,
    formData.locationContent,
    newRule,
    newAttraction,
    newTransport,
    handleFieldChange,
    handleAddRule,
    handleRemoveRule,
    handleAddAttraction,
    handleRemoveAttraction,
    handleAddTransport,
    handleRemoveTransport,
    handleLocationDescriptionChange,
    updatePolicyField
  ]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return BasicInfoStep;
      case 1: return PricingStep;
      case 2: return ImagesStep;
      case 3: return AmenitiesStep;
      case 4: return ContentStep;
      case 5: return ReviewsStep;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Background Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-neutral-900/40 via-primary-900/30 to-secondary-900/40 backdrop-blur-md"
        onClick={onCancel}
      />
      
      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
        className="relative z-10 bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] border border-white/20 overflow-hidden my-4 sm:my-0 flex flex-col"
      >
        {/* Header with Progress */}
        <div className="relative border-b border-gray-200/50 p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
            <div>
              <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900 mb-1">
                {property ? 'Edit Property' : 'Add New Property'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Step {currentStep + 1} of {FORM_STEPS.length}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onCancel}
              className="p-2 sm:p-3 text-gray-400 hover:text-gray-600 bg-gray-100/80 hover:bg-gray-200/80 rounded-xl sm:rounded-2xl transition-all duration-300"
            >
              <X className="w-4 sm:w-5 h-4 sm:h-5" />
            </motion.button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between px-5 pb-8 sm:pb-10">
           <div className="flex items-center justify-center w-full px-2">
  {FORM_STEPS.map((step, index) => {
    const isCompleted = completedSteps.includes(index);
    const isCurrent = index === currentStep;
    
    // Determine if step is clickable based on mode and position
    let isClickable = false;
    
    if (property) {
      // Edit mode: all steps are clickable
      isClickable = true;
    } else {
      // New property mode
      if (currentStep === FORM_STEPS.length - 1) {
        // From final step: can go to any previous step
        isClickable = index < FORM_STEPS.length - 1 || index === currentStep;
      } else {
        // Sequential mode: can go backward or to current step
        isClickable = index <= currentStep || (index === currentStep + 1 && isCurrentStepValid);
      }
    }
    
    const StepIcon = step.icon;

    return (
      <React.Fragment key={step.id}>
        {/* Step Circle + Label */}
        <div className="flex flex-col items-center justify-center">
          <motion.button
            onClick={() => isClickable && goToStep(index)}
            disabled={!isClickable}
            className={`
              flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-full transition-all duration-300 mb-2 relative
              ${isCurrent 
                ? 'bg-blue-600 text-white shadow-lg scale-110' 
                : isCompleted 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : isClickable
                    ? 'bg-gray-200 text-gray-600 hover:bg-blue-100 hover:text-blue-600 cursor-pointer'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
              }
            `}
            whileHover={isClickable ? { scale: 1.05 } : {}}
            whileTap={isClickable ? { scale: 0.95 } : {}}
            title={
              !isClickable && !property && currentStep !== FORM_STEPS.length - 1 
                ? 'Complete current step to proceed' 
                : property 
                  ? 'Click to edit this section'
                  : currentStep === FORM_STEPS.length - 1
                    ? 'Click to review this section'
                    : 'Click to navigate'
            }
          >
            {isCompleted ? (
              <Check className="w-4 sm:w-5 h-4 sm:h-5" />
            ) : (
              <StepIcon className="w-4 sm:w-5 h-4 sm:h-5" />
            )}
            
            {/* Edit mode indicator */}
            {property && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            )}
          </motion.button>
          <div className="text-xs font-medium text-gray-600 text-center px-1">
            <span className="hidden sm:inline text-[10px] sm:text-xs leading-tight">
              {step.title}
            </span>
            <span className="sm:hidden">{index + 1}</span>
          </div>
        </div>

        {/* Connector (only between steps, not after last) */}
        {index < FORM_STEPS.length - 1 && (
          <div
            className={`
              flex-1 h-0.5 mx-2 sm:mx-4 transition-colors duration-300 min-w-[20px] sm:min-w-[40px]
              ${isCompleted ? 'bg-green-600' : 'bg-gray-200'}
            `}
          />
        )}
      </React.Fragment>
    );
  })}
</div>
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-h-0">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-gray-200/50 p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm flex-shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Previous Button */}
            <button
              type="button"
              onClick={previousStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors w-full sm:w-auto justify-center sm:justify-start min-w-[120px] text-sm sm:text-base"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="font-medium">Previous</span>
            </button>

            {/* Navigation Status - Hidden on mobile, shown on larger screens */}
            <div className="flex items-center gap-2 text-xs sm:text-sm order-first sm:order-none">
              {property ? (
                // Edit mode status
                <div className="flex items-center gap-1 text-purple-600">
                  <div className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  </div>
                  <span className="hidden sm:inline">Edit mode - Jump to any section</span>
                  <span className="sm:hidden">Edit mode</span>
                </div>
              ) : currentStep === FORM_STEPS.length - 1 ? (
                // Final step - show validation status for submission
                isCurrentStepValid ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="hidden sm:inline">Ready to save • Click any step to review</span>
                    <span className="sm:hidden">Ready to save</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-amber-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">Complete required fields to save</span>
                    <span className="sm:hidden">Incomplete</span>
                  </div>
                )
              ) : (
                // Sequential steps - show progression status
                isCurrentStepValid ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="hidden sm:inline">Step complete • Click Next to continue</span>
                    <span className="sm:hidden">Complete</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-blue-600">
                    <Info className="w-4 h-4" />
                    <span className="hidden sm:inline">Complete required fields to proceed</span>
                    <span className="sm:hidden">Required</span>
                  </div>
                )
              )}
            </div>

            {/* Next/Submit Button */}
            {currentStep < FORM_STEPS.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!property && !isCurrentStepValid} // Enforce validation for new properties only
                className={`
                  flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-colors font-medium w-full sm:w-auto justify-center min-w-[120px] text-sm sm:text-base
                  ${!property && !isCurrentStepValid 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }
                `}
                title={!property && !isCurrentStepValid ? 'Complete required fields to proceed' : ''}
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isCurrentStepValid || isSubmitting}
                className="flex items-center gap-2 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-xl transition-colors font-medium disabled:cursor-not-allowed w-full sm:w-auto justify-center min-w-[140px] text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Save Property</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyFormMultiStep;
