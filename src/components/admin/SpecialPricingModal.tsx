'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  DollarSign, 
  Plus, 
  Trash2,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Property, PricingRule } from '../../data/properties';

// Premium Date Picker Component
const PremiumDatePicker = ({ 
  label, 
  value, 
  onChange, 
  minDate, 
  className = "",
  placeholder = "Select date" 
}: {
  label: string;
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  className?: string;
  placeholder?: string;
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value) : new Date());

  // Update currentMonth when value changes
  useEffect(() => {
    if (value) {
      setCurrentMonth(new Date(value));
    }
  }, [value]);

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return placeholder;
    try {
      const date = new Date(dateStr + 'T00:00:00'); // Add time to ensure consistent parsing
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', dateStr, error);
      return placeholder;
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const isDateDisabled = (day: number) => {
    if (!minDate) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const minDateObj = new Date(minDate + 'T00:00:00');
    
    // Allow same date - use <= comparison to prevent issues with timezone
    return date.getTime() < minDateObj.getTime();
  };

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    // Format as YYYY-MM-DD to ensure consistent date string format
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(selectedDate.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${dayStr}`;
    
    console.log('Selected date:', dateString); // Debug log
    onChange(dateString);
    setShowCalendar(false);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-semibold text-gray-800 mb-3">
        {label}
      </label>
      
      {/* Date Input Trigger */}
      <motion.button
        type="button"
        onClick={() => setShowCalendar(!showCalendar)}
        className="w-full relative overflow-hidden bg-gradient-to-br from-white to-gray-50/50 border-2 border-gray-200/60 rounded-xl p-4 text-left transition-all duration-300 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-100/50 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100/50"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 transition-opacity duration-300 hover:opacity-100" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                {formatDisplayDate(value)}
              </div>
              <div className="text-xs text-gray-500">
                {value ? 'Click to change' : 'Select a date'}
              </div>
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${showCalendar ? 'rotate-90' : ''}`} />
        </div>
      </motion.button>

      {/* Premium Calendar Dropdown */}
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0.1 }}
            className="absolute z-[9999] mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200/50 backdrop-blur-xl overflow-hidden"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Calendar Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-4">
              <div className="flex items-center justify-between">
                <motion.button
                  type="button"
                  onClick={() => navigateMonth('prev')}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                
                <h3 className="text-lg font-semibold text-white">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                
                <motion.button
                  type="button"
                  onClick={() => navigateMonth('next')}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              {/* Week Days */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map(day => (
                  <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentMonth).map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="aspect-square" />;
                  }

                  const isSelected = value && (() => {
                    try {
                      const selectedDate = new Date(value + 'T00:00:00');
                      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                      return selectedDate.getDate() === currentDate.getDate() &&
                             selectedDate.getMonth() === currentDate.getMonth() &&
                             selectedDate.getFullYear() === currentDate.getFullYear();
                    } catch {
                      return false;
                    }
                  })();
                  
                  const isDisabled = isDateDisabled(day);
                  const isToday = new Date().toDateString() === 
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString();

                  return (
                    <motion.button
                      key={`day-${day}-${index}`}
                      type="button"
                      onClick={() => !isDisabled && handleDateSelect(day)}
                      disabled={isDisabled}
                      className={`
                        aspect-square flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200
                        ${isSelected 
                          ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg' 
                          : isToday
                            ? 'bg-secondary-100 text-secondary-700 font-bold'
                            : isDisabled
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                        }
                      `}
                      whileHover={!isDisabled ? { scale: 1.1 } : {}}
                      whileTap={!isDisabled ? { scale: 0.9 } : {}}
                    >
                      {day}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {showCalendar && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => setShowCalendar(false)}
        />
      )}
    </div>
  );
};

interface SpecialPricingModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (propertyId: string, pricingRules: PricingRule[]) => void;
}

const SpecialPricingModal = ({ property, isOpen, onClose, onUpdate }: SpecialPricingModalProps) => {
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [specialPrice, setSpecialPrice] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Debug logging for date changes
  useEffect(() => {
    console.log('Start date changed:', startDate);
  }, [startDate]);

  useEffect(() => {
    console.log('End date changed:', endDate);
  }, [endDate]);

  // Initialize pricing rules when property changes - ensure fresh data from database
  useEffect(() => {
    if (property) {
      console.log('Loading pricing rules for property:', property.id);
      // Ensure we have the latest pricing data from the property object
      const currentRules = property.pricing?.rules || [];
      
      // Sort by creation order (newest first) for display
      const sortedRules = [...currentRules].reverse();
      setPricingRules(sortedRules);
      
      // Clear any previous errors when switching properties
      setSaveError(null);
      setErrors({});
    } else {
      setPricingRules([]);
    }
  }, [property]);

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    // If end date is empty or earlier than the new start date, set it to the start date
    if (!endDate || new Date(endDate) < new Date(date)) {
      setEndDate(date);
    }
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
  };

  const resetForm = () => {
    setStartDate('');
    setEndDate('');
    setSpecialPrice('');
    setErrors({});
    setSaveError(null);
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      newErrors.endDate = 'End date must be on or after start date';
    }

    if (!specialPrice || isNaN(Number(specialPrice)) || Number(specialPrice) <= 0) {
      newErrors.specialPrice = 'Valid price is required';
    }

    // Enhanced overlap detection with better error messaging
    if (startDate && endDate) {
      const newStart = new Date(startDate);
      const newEnd = new Date(endDate);
      
      const overlappingRule = pricingRules.find(rule => {
        const ruleStart = new Date(rule.startDate);
        const ruleEnd = new Date(rule.endDate);
        
        // Check for any overlap including single-day ranges
        return (
          (newStart >= ruleStart && newStart <= ruleEnd) ||
          (newEnd >= ruleStart && newEnd <= ruleEnd) ||
          (newStart <= ruleStart && newEnd >= ruleEnd)
        );
      });

      if (overlappingRule) {
        const overlappingRange = overlappingRule.startDate === overlappingRule.endDate 
          ? formatDate(overlappingRule.startDate)
          : `${formatDate(overlappingRule.startDate)} - ${formatDate(overlappingRule.endDate)}`;
        newErrors.dateRange = `Date range overlaps with existing pricing rule: ${overlappingRange}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddPricingRule = async () => {
    if (!validateForm()) return;
    if (!property) return;

    setIsLoading(true);
    setSaveError(null);

    try {
      const newRule: PricingRule = {
        id: `price_${Date.now()}`,
        price: Number(specialPrice),
        startDate,
        endDate,
      };

      // Optimistic update - add to UI immediately
      const updatedRules = [newRule, ...pricingRules];
      setPricingRules(updatedRules);

      // Prepare rules for database (oldest first)
      const rulesForDatabase = [...updatedRules].reverse();
      
      console.log('Adding pricing rule to database:', {
        propertyId: property.id,
        newRule,
        totalRules: rulesForDatabase.length
      });

      // Update the property via the parent component's handler
      await onUpdate(property.id, rulesForDatabase);

      // Clear form on success
      resetForm();
      
      console.log('Pricing rule added successfully');
    } catch (error) {
      console.error('Failed to add pricing rule:', error);
      
      // Revert optimistic update on error
      setPricingRules(pricingRules);
      
      // Set error message
      setSaveError(error instanceof Error ? error.message : 'Failed to add pricing rule. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePricingRule = async (ruleId: string) => {
    if (!property) return;

    setIsLoading(true);
    setSaveError(null);

    // Store original rules for potential rollback
    const originalRules = [...pricingRules];

    try {
      // Optimistic update - remove from UI immediately
      const updatedRules = pricingRules.filter(rule => rule.id !== ruleId);
      setPricingRules(updatedRules);

      // Prepare rules for database (oldest first)
      const rulesForDatabase = [...updatedRules].reverse();
      
      console.log('Deleting pricing rule from database:', {
        propertyId: property.id,
        ruleId,
        remainingRules: rulesForDatabase.length
      });

      // Update the property via the parent component's handler
      await onUpdate(property.id, rulesForDatabase);
      
      console.log('Pricing rule deleted successfully');
    } catch (error) {
      console.error('Failed to delete pricing rule:', error);
      
      // Revert optimistic update on error
      setPricingRules(originalRules);
      
      // Set error message
      setSaveError(error instanceof Error ? error.message : 'Failed to delete pricing rule. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    if (startDate === endDate) {
      return formatDate(startDate); // Single day
    }
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const getCurrencySymbol = (currency?: string): string => {
    switch (currency?.toUpperCase()) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'LKR': return 'Rs.';
      default: return '$';
    }
  };

  if (!isOpen || !property) return null;

  const currency = property.pricing?.currency || 'USD';
  const currencySymbol = getCurrencySymbol(currency);
  const defaultPrice = property.pricing?.defaultPrice || 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Background Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-neutral-800">Special Pricing</h2>
                <p className="text-sm text-neutral-600">{property.title}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {/* Default Price Info */}
            <div className="bg-neutral-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-neutral-700 mb-1">Default Price</h3>
              <p className="text-2xl font-bold text-neutral-800">
                {currencySymbol}{defaultPrice}/night
              </p>
            </div>

            {/* Add New Pricing Rule Form */}
            <div className="bg-white border border-neutral-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Special Pricing
              </h3>
              <p className="text-sm text-neutral-600 mb-6">
                Set special pricing for a date range or single day. When you select a start date, the end date will automatically be set to the same date for single-day pricing. You can change the end date for multi-day ranges.
              </p>

              {/* Error Display */}
              {saveError && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <div>
                    <p className="text-red-700 font-medium">Error saving pricing rule</p>
                    <p className="text-red-600 text-sm">{saveError}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <PremiumDatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  minDate={new Date().toISOString().split('T')[0]}
                  placeholder="Select start date"
                />

                <PremiumDatePicker
                  label="End Date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  minDate={startDate || new Date().toISOString().split('T')[0]}
                  placeholder="Select end date"
                />
              </div>

              {(errors.startDate || errors.endDate) && (
                <div className="mb-4">
                  {errors.startDate && (
                    <p className="text-red-500 text-sm mb-1">{errors.startDate}</p>
                  )}
                  {errors.endDate && (
                    <p className="text-red-500 text-sm">{errors.endDate}</p>
                  )}
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Special Price ({currencySymbol})
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={specialPrice}
                    onChange={(e) => setSpecialPrice(e.target.value)}
                    placeholder="Enter special price"
                    className={`w-full pl-12 pr-4 py-4 bg-gradient-to-br from-white to-gray-50/50 border-2 border-gray-200/60 rounded-xl focus:ring-4 focus:ring-primary-100/50 focus:border-primary-500 transition-all duration-300 text-lg font-medium ${
                      errors.specialPrice ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : ''
                    }`}
                  />
                </div>
                {errors.specialPrice && (
                  <p className="text-red-500 text-sm mt-2">{errors.specialPrice}</p>
                )}
              </div>

              {errors.dateRange && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-red-600 text-sm">{errors.dateRange}</p>
                </div>
              )}

              <motion.button
                onClick={handleAddPricingRule}
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 font-semibold shadow-lg hover:shadow-xl ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Add Pricing Rule
                  </>
                )}
              </motion.button>
            </div>

            {/* Existing Pricing Rules */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">
                Current Special Pricing ({pricingRules.length})
              </h3>

              {pricingRules.length === 0 ? (
                <div className="text-center py-8 text-neutral-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No special pricing rules yet</p>
                  <p className="text-sm">Add date ranges or single-day pricing above</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pricingRules.map((rule, index) => (
                    <motion.div
                      key={rule.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-neutral-800">
                            {currencySymbol}{rule.price}/night
                          </p>
                          <p className="text-sm text-neutral-600">
                            {formatDateRange(rule.startDate, rule.endDate)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeletePricingRule(rule.id)}
                        disabled={isLoading}
                        className={`p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ${
                          isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        title="Delete pricing rule"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SpecialPricingModal;