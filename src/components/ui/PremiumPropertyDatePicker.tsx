'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface BookingDate {
  checkIn: string;
  checkOut: string;
}

interface PremiumPropertyDatePickerProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  bookedDates?: BookingDate[];
  className?: string;
  placeholder?: string;
  // Range selection props
  isCheckIn?: boolean;
  isCheckOut?: boolean;
  otherDate?: string;
  onOtherDateChange?: (date: string) => void;
  // Card container for scroll behavior
  cardContainerRef?: React.RefObject<HTMLElement>;
}

const PremiumPropertyDatePicker = ({ 
  label, 
  value, 
  onChange, 
  minDate, 
  bookedDates = [],
  className = "",
  placeholder = "Select date",
  isCheckIn = false,
  isCheckOut = false,
  otherDate,
  onOtherDateChange,
  cardContainerRef
}: PremiumPropertyDatePickerProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value) : new Date());
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);
  const [calendarElement, setCalendarElement] = useState<HTMLElement | null>(null);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0, positioning: 'left' });
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted for portal rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle window resize to recalculate position
  useEffect(() => {
    const handleResize = () => {
      if (showCalendar && triggerElement) {
        calculateCalendarPosition();
      }
    };

    // Throttle scroll events for better performance
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (!showCalendar) return;

      // Clear previous timeout to throttle scroll events
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        // Determine which element to track for visibility
        let cardElement: HTMLElement | null = null;
        
        if (cardContainerRef?.current) {
          // Use provided card container reference
          cardElement = cardContainerRef.current;
        } else if (triggerElement) {
          // Smart detection: find the closest card-like container
          cardElement = triggerElement.closest('[class*="card"], [class*="bg-white"], .rounded-xl, .shadow') as HTMLElement;
          
          // Fallback: use a parent container that's likely the card
          if (!cardElement) {
            let parent = triggerElement.parentElement;
            let depth = 0;
            while (parent && depth < 5) {
              const computedStyle = window.getComputedStyle(parent);
              const hasCardLikeStyles = 
                computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' ||
                computedStyle.borderRadius !== '0px' ||
                computedStyle.boxShadow !== 'none' ||
                parent.classList.contains('p-6') ||
                parent.classList.contains('p-4') ||
                parent.classList.contains('p-8');
              
              if (hasCardLikeStyles) {
                cardElement = parent;
                break;
              }
              parent = parent.parentElement;
              depth++;
            }
          }
        }

        if (!cardElement) return;

        const cardRect = cardElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const cardHeight = cardRect.height;
        
        // Calculate how much of the card is visible
        const visibleTop = Math.max(0, cardRect.top);
        const visibleBottom = Math.min(viewportHeight, cardRect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visiblePercentage = visibleHeight / cardHeight;
        
        // Close calendar if less than 75% of the card is visible (more than 1/4 is hidden)
        if (visiblePercentage < 0.75) {
          setShowCalendar(false);
        }
      }, 16); // ~60fps throttling
    };

    if (showCalendar) {
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll, true);
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
      };
    }
  }, [showCalendar, triggerElement, cardContainerRef]);

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return placeholder;
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateCalendarPosition = () => {
    if (!triggerElement) return;
    
    const triggerRect = triggerElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const calendarHeight = 400; // Approximate calendar height
    const calendarWidth = Math.min(320, viewportWidth - 32); // Responsive width
    const spacing = 16; // Gap between trigger and calendar
    
    let positioning = 'left';
    let top = 0;
    let left = 0;
    
    // Position to the left of the trigger by default
    const spaceLeft = triggerRect.left;
    const spaceRight = viewportWidth - triggerRect.right;
    
    if (spaceLeft >= calendarWidth + spacing) {
      // Position to the left (preferred)
      positioning = 'left';
      left = triggerRect.left - calendarWidth - spacing;
    } else if (spaceRight >= calendarWidth + spacing) {
      // Position to the right if not enough space on left
      positioning = 'right';
      left = triggerRect.right + spacing;
    } else {
      // Fallback: position to the left with clipping if needed
      positioning = 'left';
      left = Math.max(16, triggerRect.left - calendarWidth - spacing);
    }
    
    // Vertically align with the trigger, but keep within viewport
    const triggerMiddle = triggerRect.top + triggerRect.height / 2;
    const calendarMiddle = calendarHeight / 2;
    
    top = Math.max(
      16, // Minimum distance from top edge
      Math.min(
        triggerMiddle - calendarMiddle, // Center vertically on trigger
        viewportHeight - calendarHeight - 16 // Don't go beyond bottom edge
      )
    );
    
    setCalendarPosition({ top, left, positioning });
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
    if (!day) return false;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // Check if date is before minDate using string comparison
    if (minDate && dateString < minDate) return true;
    
    // Enhanced date range validation
    if (otherDate) {
      // If this is a check-in picker and we have a check-out date
      if (isCheckIn) {
        // Prevent selecting check-in dates that are after the check-out date
        if (dateString > otherDate) return true;
      }
      
      // If this is a check-out picker and we have a check-in date
      if (isCheckOut) {
        // Prevent selecting check-out dates that are before or equal to the check-in date
        if (dateString <= otherDate) return true;
      }
    }
    
    return false; // Allow all other valid dates for selection
  };

  const isDateBooked = (day: number) => {
    if (!day) return false;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    return bookedDates.some(booking => {
      // Use string comparison to avoid timezone issues
      // Block dates that fall within any booked range (inclusive)
      return dateString >= booking.checkIn && dateString <= booking.checkOut;
    });
  };

  // Additional validation to prevent overlapping bookings and invalid date ranges
  const isDateUnavailableForRange = (day: number) => {
    if (!day) return false;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // If this is a check-in date picker and we have an otherDate (check-out)
    if (isCheckIn && otherDate) {
      // Check if selecting this check-in would create overlap with any booking
      return bookedDates.some(booking => {
        return (dateString <= booking.checkOut && otherDate >= booking.checkIn);
      });
    }
    
    // If this is a check-out date picker and we have an otherDate (check-in)  
    if (isCheckOut && otherDate) {
      // Check if selecting this check-out would create overlap with any booking
      return bookedDates.some(booking => {
        return (otherDate <= booking.checkOut && dateString >= booking.checkIn);
      });
    }
    
    // Additional logic: prevent selection if there's a booked date between current selection and other date
    if (otherDate) {
      const startDate = isCheckIn ? dateString : otherDate;
      const endDate = isCheckIn ? otherDate : dateString;
      
      return bookedDates.some(booking => {
        // Check if any part of the booking falls within our desired range
        return (booking.checkIn <= endDate && booking.checkOut >= startDate);
      });
    }
    
    return false;
  };

  const handleDateSelect = (day: number) => {
    if (!day || isDateDisabled(day) || isDateBooked(day) || isDateUnavailableForRange(day)) return;
    
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    onChange(dateString);
    
    // Enhanced date clearing logic
    if (onOtherDateChange && otherDate) {
      // If this is a check-in date picker
      if (isCheckIn) {
        // Clear check-out if it's before or equal to the new check-in date
        if (otherDate <= dateString) {
          onOtherDateChange('');
        }
      }
      
      // If this is a check-out date picker
      if (isCheckOut) {
        // Clear check-in if it's after or equal to the new check-out date
        if (otherDate >= dateString) {
          onOtherDateChange('');
        }
      }
    }
    
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
      {/* Refined Label Design for Card Integration */}
      <div className="mb-2">
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
          {label}
        </label>
      </div>
      
      {/* Enhanced Date Input Trigger - Card Optimized */}
      <motion.button
        type="button"
        ref={(el) => setTriggerElement(el)}
        onClick={() => {
          if (!showCalendar) {
            setTimeout(calculateCalendarPosition, 10); // Allow ref to be set
          }
          setShowCalendar(!showCalendar);
        }}
        className="group w-full relative overflow-hidden bg-white border border-gray-300 rounded-lg p-3 text-left transition-all duration-300 hover:border-primary-400 hover:shadow-md focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 cursor-pointer"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {/* Content */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            {/* Calendar Icon - Refined */}
            <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-primary-50 transition-colors duration-300">
              <CalendarIcon className="w-4 h-4 text-gray-500 group-hover:text-primary-600 transition-colors duration-300" />
            </div>
            
            {/* Date Display - Clean Typography */}
            <div className="flex-1">
              <div className={`text-sm font-medium transition-colors duration-300 ${
                value 
                  ? 'text-gray-900' 
                  : 'text-gray-500'
              }`}>
                {value ? formatDisplayDate(value) : placeholder}
              </div>
              {value && (
                <div className="text-xs text-gray-400 mt-0.5">
                  Click to change
                </div>
              )}
            </div>
          </div>
          
          {/* Action Buttons - Clear and Dropdown */}
          <div className="flex items-center gap-2">
            {/* Clear Date Button - Show only when there's a value */}
            {value && (
              <motion.div
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    onChange('');
                  }
                }}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={`Clear ${label.toLowerCase()}`}
                aria-label={`Clear ${label.toLowerCase()}`}
              >
                <X className="w-3.5 h-3.5" />
              </motion.div>
            )}
            
            {/* Arrow Indicator - Subtle */}
            <ChevronRight className={`w-4 h-4 text-gray-400 transition-all duration-300 ${
              showCalendar ? 'rotate-90 text-primary-600' : 'group-hover:text-gray-600'
            }`} />
          </div>
        </div>
      </motion.button>

      {/* World-Class Calendar Dropdown - Rendered Outside Card via Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {showCalendar && (
            <>
              {/* Click Outside Handler */}
              <div
                className="fixed inset-0 z-[999998]"
                onClick={() => setShowCalendar(false)}
              />
              
              {/* Calendar Modal Container - Fixed Position Outside Card */}
              <motion.div
                ref={(el) => setCalendarElement(el)}
                initial={{ opacity: 0, x: calendarPosition.positioning === 'left' ? -8 : 8, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: calendarPosition.positioning === 'left' ? -8 : 8, scale: 0.96 }}
                transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
                className="fixed z-[999999] w-80 max-w-[calc(100vw-2rem)]"
                style={{
                  top: `${calendarPosition.top}px`,
                  left: `${calendarPosition.left}px`,
                  transformOrigin: calendarPosition.positioning === 'left' ? 'center right' : 'center left'
                }}
              >
              {/* Calendar Container */}
              <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
                style={{
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                }}
              >
                {/* Calendar Header - Premium Design */}
                <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 p-4">
                  <div className="flex items-center justify-between">
                    <motion.button
                      onClick={() => navigateMonth('prev')}
                      className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-white">
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </h3>
                      <p className="text-xs text-white/70 mt-0.5">
                        Select your {label.toLowerCase()} date
                      </p>
                    </div>
                    
                    <motion.button
                      onClick={() => navigateMonth('next')}
                      className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                  
                  {/* Close button */}
                  <motion.button
                    onClick={() => setShowCalendar(false)}
                    className="absolute top-3 right-3 p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Calendar Grid - Enhanced UX */}
                <div className="p-4 bg-gray-50/30">
                  {/* Week days header - Clean Typography */}
                  <div className="grid grid-cols-7 gap-1 mb-3">
                    {weekDays.map(day => (
                      <div key={day} className="p-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar days - Interactive Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentMonth).map((day, index) => {
                      if (!day) {
                        return <div key={`empty-${index}`} className="p-2"></div>;
                      }
                      
                      const isDisabled = isDateDisabled(day);
                      const isBooked = isDateBooked(day);
                      const isUnavailableForRange = isDateUnavailableForRange(day);
                      const year = currentMonth.getFullYear();
                      const month = currentMonth.getMonth();
                      const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                      const isSelected = value === dayString;
                      const isCompletelyUnavailable = isDisabled || isBooked || isUnavailableForRange;
                      
                      return (
                        <motion.button
                          key={`day-${day}-${index}`}
                          onClick={() => handleDateSelect(day)}
                          disabled={isCompletelyUnavailable}
                          className={`
                            relative p-2.5 text-sm font-medium rounded-lg transition-all duration-200 min-h-[2.75rem] flex items-center justify-center
                            ${isSelected 
                              ? 'bg-primary-600 text-white shadow-lg ring-2 ring-primary-200 transform scale-105' 
                              : isBooked 
                                ? 'bg-red-50 text-red-400 cursor-not-allowed border border-red-200' 
                                : isUnavailableForRange
                                  ? 'bg-orange-50 text-orange-400 cursor-not-allowed border border-orange-200'
                                : isDisabled 
                                  ? 'text-gray-300 cursor-not-allowed' 
                                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700 hover:scale-105 cursor-pointer border border-transparent hover:border-primary-200'
                            }
                          `}
                          whileHover={!isCompletelyUnavailable ? { scale: 1.05 } : {}}
                          whileTap={!isCompletelyUnavailable ? { scale: 0.95 } : {}}
                        >
                          <span className={isBooked || isUnavailableForRange ? 'line-through' : ''}>{day}</span>
                          {isBooked && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-full h-0.5 bg-red-400 transform rotate-12"></div>
                            </div>
                          )}
                          {isUnavailableForRange && !isBooked && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-full h-0.5 bg-orange-400 transform -rotate-12"></div>
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default PremiumPropertyDatePicker;
