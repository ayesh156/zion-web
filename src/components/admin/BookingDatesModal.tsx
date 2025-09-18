'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar as CalendarIcon, 
  Trash2, 
  PlusCircle, 
  Save, 
  Clock,
  User,
  FileText,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Edit
} from 'lucide-react';

interface BookingDate {
  id: string;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  guestName?: string;
  notes?: string;
}

interface Property {
  id: string;
  title: string;
  bookings?: BookingDate[];
}

interface BookingDatesModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (propertyId: string, bookings: BookingDate[]) => void;
}

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

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return placeholder;
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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
    return date < new Date(minDate);
  };

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateString = selectedDate.toISOString().split('T')[0];
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
              <CalendarIcon className="w-5 h-5 text-primary-600" />
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

                  const isSelected = value && new Date(value).getDate() === day &&
                    new Date(value).getMonth() === currentMonth.getMonth() &&
                    new Date(value).getFullYear() === currentMonth.getFullYear();
                  
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

const BookingDatesModal = ({ property, isOpen, onClose, onUpdate }: BookingDatesModalProps) => {
  // State management
  const [originalBookings, setOriginalBookings] = useState<BookingDate[]>([]);
  const [bookings, setBookings] = useState<BookingDate[]>([]);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestName, setGuestName] = useState('');
  const [notes, setNotes] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [editingBooking, setEditingBooking] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'add' | 'manage'>('add');

  // Initialize bookings when property changes
  useEffect(() => {
    if (property?.bookings) {
      const bookingsData = property.bookings || [];
      
      // Validate and clean existing bookings
      const validBookings = bookingsData.filter(booking => {
        const isValid = validateBooking(booking);
        if (!isValid) {
          console.warn('Invalid booking found and filtered:', booking);
        }
        return isValid;
      });

      console.log('Initializing modal with bookings:', validBookings);
      setOriginalBookings([...validBookings]);
      setBookings([...validBookings]);
      
      // Set initial tab based on existing bookings
      setActiveTab(validBookings.length > 0 ? 'manage' : 'add');
    } else {
      console.log('No bookings found, initializing empty arrays');
      setOriginalBookings([]);
      setBookings([]);
      setActiveTab('add');
    }
    
    // Reset form
    resetForm();
    setHasChanges(false);
    setSaveSuccess(false);
    setEditingBooking(null);
  }, [property]);

  // Track changes
  useEffect(() => {
    const hasChanges = JSON.stringify(bookings) !== JSON.stringify(originalBookings);
    setHasChanges(hasChanges);
  }, [bookings, originalBookings]);

  const resetForm = () => {
    setCheckInDate('');
    setCheckOutDate('');
    setGuestName('');
    setNotes('');
  };

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const validateBooking = (booking: BookingDate): boolean => {
    return !!(
      booking.id &&
      booking.checkIn &&
      booking.checkOut &&
      new Date(booking.checkOut) > new Date(booking.checkIn)
    );
  };

  const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
  };

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysBetween = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleAddBooking = () => {
    if (checkInDate && checkOutDate && property) {
      // Validate that check-out is after check-in
      if (new Date(checkOutDate) <= new Date(checkInDate)) {
        alert('Check-out date must be after check-in date');
        return;
      }

      const newBooking: BookingDate = {
        id: generateId(),
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guestName: guestName.trim() || undefined,
        notes: notes.trim() || undefined,
      };

      // Add to bookings array and ensure we don't lose any existing data
      setBookings(prev => {
        const updatedBookings = [...prev, newBooking];
        console.log('Adding new booking:', newBooking);
        console.log('Updated bookings array:', updatedBookings);
        return updatedBookings;
      });
      
      resetForm();
      
      // Auto-switch to manage tab to show the new booking
      setTimeout(() => setActiveTab('manage'), 100);
    }
  };

  const handleDeleteBooking = (bookingId: string) => {
    // Find the booking to confirm deletion
    const bookingToDelete = bookings.find(b => b.id === bookingId);
    if (!bookingToDelete) {
      console.error('Booking not found for deletion:', bookingId);
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete this booking?\n\n` +
      `Check-in: ${formatDateShort(bookingToDelete.checkIn)}\n` +
      `Check-out: ${formatDateShort(bookingToDelete.checkOut)}` +
      (bookingToDelete.guestName ? `\nGuest: ${bookingToDelete.guestName}` : '')
    );

    if (confirmDelete) {
      setBookings(prev => {
        const updatedBookings = prev.filter(b => b.id !== bookingId);
        console.log('Deleting booking ID:', bookingId);
        console.log('Updated bookings array:', updatedBookings);
        return updatedBookings;
      });
    }
  };

  const handleEditBooking = (booking: BookingDate) => {
    setEditingBooking(booking.id);
    setCheckInDate(booking.checkIn);
    setCheckOutDate(booking.checkOut);
    setGuestName(booking.guestName || '');
    setNotes(booking.notes || '');
    setActiveTab('add'); // Switch to form tab
  };

  const handleUpdateBooking = () => {
    if (editingBooking && checkInDate && checkOutDate) {
      // Validate that check-out is after check-in
      if (new Date(checkOutDate) <= new Date(checkInDate)) {
        alert('Check-out date must be after check-in date');
        return;
      }

      setBookings(prev => {
        const updatedBookings = prev.map(booking => 
          booking.id === editingBooking 
            ? {
                ...booking,
                checkIn: checkInDate,
                checkOut: checkOutDate,
                guestName: guestName.trim() || undefined,
                notes: notes.trim() || undefined,
              }
            : booking
        );
        console.log('Updating booking ID:', editingBooking);
        console.log('Updated bookings array:', updatedBookings);
        return updatedBookings;
      });
      
      resetForm();
      setEditingBooking(null);
      
      // Auto-switch to manage tab to show the updated booking
      setTimeout(() => setActiveTab('manage'), 100);
    }
  };

  const handleCancelEdit = () => {
    setEditingBooking(null);
    resetForm();
  };

  const handleSaveChanges = async () => {
    if (!property || !hasChanges) return;
    
    // Validate all bookings before saving
    const invalidBookings = bookings.filter(booking => 
      !booking.checkIn || 
      !booking.checkOut || 
      new Date(booking.checkOut) <= new Date(booking.checkIn)
    );
    
    if (invalidBookings.length > 0) {
      alert('Some bookings have invalid dates. Please check that all check-out dates are after check-in dates.');
      return;
    }
    
    setSaving(true);
    console.log('Saving bookings to database:', bookings);
    
    try {
      // Create a clean copy of bookings data for API
      const bookingsToSave = bookings.map(booking => ({
        id: booking.id,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guestName: booking.guestName || undefined,
        notes: booking.notes || undefined,
      }));

      console.log('Sending to API:', { bookings: bookingsToSave });

      // Save bookings via API endpoint
      const response = await fetch(`/api/properties/${property.id}/bookings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookings: bookingsToSave }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        throw new Error(errorData.error || 'Failed to save bookings');
      }

      const responseData = await response.json();
      console.log('Save successful, response:', responseData);

      // Update original bookings to match current state
      setOriginalBookings([...bookings]);
      setHasChanges(false);
      setSaveSuccess(true);
      
      // Auto-hide success message
      setTimeout(() => setSaveSuccess(false), 3000);
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('propertiesUpdated', {
        detail: { propertyId: property.id, bookings: bookings }
      }));
      
      // Call external update callback if provided
      if (onUpdate) {
        onUpdate(property.id, bookings);
      }
      
    } catch (error) {
      console.error('Failed to save bookings:', error);
      alert(`Failed to save bookings: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDiscardChanges = () => {
    setBookings([...originalBookings]);
    resetForm();
    setHasChanges(false);
  };

  const handleClose = () => {
    if (hasChanges) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to close without saving?');
      if (!confirmed) return;
    }
    onClose();
  };

  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6">
      {/* Enhanced Dramatic Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-primary-900/30 via-neutral-900/50 to-secondary-900/30 backdrop-blur-lg"
        onClick={handleClose}
        style={{
          backdropFilter: 'blur(20px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
        }}
      />
      
      {/* Enhanced Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 120, 0],
            y: [0, -60, 0],
            opacity: [0.15, 0.4, 0.15],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/6 left-1/8 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -100, 0],
            y: [0, 80, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
          className="absolute bottom-1/6 right-1/8 w-32 h-32 bg-secondary-500/15 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            x: [0, 60, 0],
            y: [0, -40, 0],
            opacity: [0.08, 0.25, 0.08],
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute top-1/2 right-1/4 w-28 h-28 bg-indigo-500/12 rounded-full blur-xl"
        />
      </div>

      {/* Clean Modal Container - Balanced Size */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ type: "spring", duration: 0.6, bounce: 0.1 }}
        className="relative z-10 bg-white/98 backdrop-blur-2xl rounded-2xl shadow-2xl w-full max-w-4xl max-h-[88vh] overflow-hidden border border-white/30"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
          borderRadius: '1rem'
        }}
      >
        {/* Clean Header - Reduced Height */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 px-6 py-5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_50%)]" />
          
          <div className="relative flex justify-between items-center">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-12 h-12 bg-white/25 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <CalendarIcon className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <motion.h2 
                  className="text-2xl font-bold text-white mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Booking Management
                </motion.h2>
                <motion.p 
                  className="text-primary-100 text-base font-medium max-w-md truncate"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {property.title}
                </motion.p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Changes Indicator */}
              <AnimatePresence>
                {hasChanges && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    className="flex items-center gap-2 bg-orange-500/25 backdrop-blur-sm text-orange-100 px-3 py-2 rounded-xl text-sm font-semibold shadow-lg border border-orange-400/30"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>Unsaved</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success Indicator */}
              <AnimatePresence>
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    className="flex items-center gap-2 bg-green-500/25 backdrop-blur-sm text-green-100 px-3 py-2 rounded-xl text-sm font-semibold shadow-lg border border-green-400/30"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Saved</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={handleClose}
                className="p-2.5 text-white/80 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Content Area with Adjusted Height */}
        <div className="flex flex-col h-[calc(88vh-160px)]">
          {/* Clean Tab Navigation */}
          <div className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/80 to-white">
            <div className="flex space-x-2 bg-gray-100/90 rounded-xl p-1.5 shadow-inner">
              <motion.button
                onClick={() => setActiveTab('add')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 relative ${
                  activeTab === 'add'
                    ? 'bg-white text-primary-700 shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PlusCircle className="w-4 h-4" />
                {editingBooking ? 'Edit Booking' : 'Add Booking'}
                {editingBooking && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"
                  />
                )}
                {activeTab === 'add' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-lg"
                  />
                )}
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTab('manage')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 relative ${
                  activeTab === 'manage'
                    ? 'bg-white text-primary-700 shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CalendarIcon className="w-4 h-4" />
                Manage Bookings
                {bookings.length > 0 && (
                  <motion.span 
                    className="ml-1 px-2 py-0.5 text-xs bg-primary-100 text-primary-700 rounded-full font-bold"
                    whileHover={{ scale: 1.1 }}
                  >
                    {bookings.length}
                  </motion.span>
                )}
                {activeTab === 'manage' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-lg"
                  />
                )}
              </motion.button>
            </div>
          </div>

          {/* Tab Content with More Space */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'add' && (
                <motion.div
                  key="add-tab"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                  className="h-full overflow-y-auto p-6"
                >
                  {/* Add/Edit Booking Form */}
                  <div className="max-w-xl mx-auto">
                    <div className="bg-gradient-to-br from-gray-50/80 to-white rounded-xl p-5 border border-gray-100/50 shadow-sm">
                      {editingBooking && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                              <Edit className="w-4 h-4 text-orange-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-orange-800">Editing Booking</p>
                              <p className="text-sm text-orange-600">Make your changes and save to update this booking</p>
                            </div>
                            <motion.button
                              onClick={handleCancelEdit}
                              className="ml-auto p-1 text-orange-600 hover:text-orange-800 hover:bg-orange-100 rounded-lg transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      )}

                      {/* Premium Date Pickers */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative">
                        <PremiumDatePicker
                          label="Check-in Date"
                          value={checkInDate}
                          onChange={setCheckInDate}
                          minDate={getTodayString()}
                          placeholder="Select check-in"
                        />
                        <PremiumDatePicker
                          label="Check-out Date"
                          value={checkOutDate}
                          onChange={setCheckOutDate}
                          minDate={checkInDate || getTodayString()}
                          placeholder="Select check-out"
                        />
                      </div>

                      {/* Date Range Summary */}
                      {checkInDate && checkOutDate && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-4 mb-6 border border-primary-100/50"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-primary-600" />
                              <span className="font-semibold text-primary-800">
                                {getDaysBetween(checkInDate, checkOutDate)} night{getDaysBetween(checkInDate, checkOutDate) !== 1 ? 's' : ''}
                              </span>
                            </div>
                            <div className="text-sm text-primary-600 font-medium">
                              {formatDateShort(checkInDate)} → {formatDateShort(checkOutDate)}
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Guest Information */}
                      <div className="space-y-4 mb-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">
                            <User className="w-4 h-4 inline mr-2" />
                            Guest Name (Optional)
                          </label>
                          <input
                            type="text"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="Enter guest name"
                            className="w-full p-4 bg-white border-2 border-gray-200/60 rounded-xl focus:ring-4 focus:ring-primary-100/50 focus:border-primary-500 transition-all duration-300 font-medium"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">
                            <FileText className="w-4 h-4 inline mr-2" />
                            Notes (Optional)
                          </label>
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add any notes about this booking..."
                            rows={3}
                            className="w-full p-4 bg-white border-2 border-gray-200/60 rounded-xl focus:ring-4 focus:ring-primary-100/50 focus:border-primary-500 transition-all duration-300 font-medium resize-none"
                          />
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {editingBooking && (
                          <motion.button
                            onClick={handleCancelEdit}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </motion.button>
                        )}
                        
                        <motion.button
                          onClick={editingBooking ? handleUpdateBooking : handleAddBooking}
                          disabled={!checkInDate || !checkOutDate}
                          className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl hover:from-primary-700 hover:to-primary-800 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none"
                          whileHover={checkInDate && checkOutDate ? { scale: 1.02 } : {}}
                          whileTap={checkInDate && checkOutDate ? { scale: 0.98 } : {}}
                        >
                          {editingBooking ? (
                            <>
                              <Save className="w-5 h-5" />
                              Update Booking
                            </>
                          ) : (
                            <>
                              <PlusCircle className="w-5 h-5" />
                              Add Booking Date
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'manage' && (
                <motion.div
                  key="manage-tab"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full overflow-y-auto p-6"
                >
                  {/* Current Bookings List */}
                  <div className="max-w-3xl mx-auto">
                    {bookings.length > 0 ? (
                      <div className="bg-gradient-to-br from-gray-50/80 to-white rounded-2xl border border-gray-100/50 shadow-sm overflow-hidden">
                        <div className="p-6 bg-gradient-to-r from-primary-50 to-blue-50 border-b border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-xl flex items-center justify-center">
                                <CalendarIcon className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                  Current Bookings
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {bookings.length} booking{bookings.length !== 1 ? 's' : ''} scheduled
                                </p>
                              </div>
                            </div>
                            <div className="text-sm text-primary-600 font-medium bg-white px-3 py-1.5 rounded-lg">
                              Total: {bookings.length}
                            </div>
                          </div>
                        </div>
                        
                        <div className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto">
                          {bookings
                            .sort((a, b) => {
                              // Sort by ID (which contains timestamp) in descending order - newest first
                              return b.id.localeCompare(a.id);
                            })
                            .map((booking, index) => (
                            <motion.div
                              key={booking.id}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="p-6 hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-blue-50/30 transition-all duration-300 group"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  {/* Date Range */}
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg flex items-center justify-center">
                                      <CalendarIcon className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <div>
                                      <div className="font-bold text-gray-900 text-lg">
                                        {formatDateShort(booking.checkIn)} - {formatDateShort(booking.checkOut)}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        {getDaysBetween(booking.checkIn, booking.checkOut)} night{getDaysBetween(booking.checkIn, booking.checkOut) !== 1 ? 's' : ''}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Guest Information */}
                                  {booking.guestName && (
                                    <div className="flex items-center gap-2 mb-2">
                                      <User className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm font-medium text-gray-700">
                                        {booking.guestName}
                                      </span>
                                    </div>
                                  )}
                                  
                                  {/* Notes */}
                                  {booking.notes && (
                                    <div className="flex items-start gap-2">
                                      <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                                      <span className="text-sm text-gray-600 leading-relaxed">
                                        {booking.notes}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 ml-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                  <motion.button
                                    onClick={() => handleEditBooking(booking)}
                                    className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    title="Edit booking"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </motion.button>
                                  
                                  <motion.button
                                    onClick={() => handleDeleteBooking(booking.id)}
                                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    title="Delete booking"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </motion.button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6"
                        >
                          <CalendarIcon className="w-10 h-10 text-gray-300" />
                        </motion.div>
                        <h4 className="text-xl font-semibold text-gray-400 mb-3">No bookings yet</h4>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                          Start by adding your first booking date to keep track of property reservations.
                        </p>
                        <motion.button
                          onClick={() => setActiveTab('add')}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <PlusCircle className="w-5 h-5" />
                          Add First Booking
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Clean Footer */}
        <div className="relative bg-white border-t border-gray-200/50 px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {hasChanges && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-orange-600 font-medium"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">Unsaved changes</span>
                </motion.div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {hasChanges && (
                <motion.button
                  onClick={handleDiscardChanges}
                  className="px-4 py-2 text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-all duration-300 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Discard
                </motion.button>
              )}
              
              <motion.button
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-all duration-300 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
              
              <motion.button
                onClick={handleSaveChanges}
                disabled={!hasChanges || saving}
                className="px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 shadow-md hover:shadow-lg disabled:shadow-none flex items-center gap-2"
                whileHover={hasChanges && !saving ? { scale: 1.02 } : {}}
                whileTap={hasChanges && !saving ? { scale: 0.98 } : {}}
              >
                {saving ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingDatesModal;
