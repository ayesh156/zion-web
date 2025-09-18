'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface ModernDatePickerProps {
  selected?: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
  minDate?: Date;
  className?: string;
}

const ModernDatePicker = ({
  selected,
  onChange,
  placeholder = "Select date",
  minDate,
  className = "",
}: ModernDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    selected ? new Date(selected.getFullYear(), selected.getMonth()) : new Date()
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) {
      return true;
    }
    return false;
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (!isDateDisabled(selectedDate)) {
      onChange(selectedDate);
      setIsOpen(false);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = selected && isSameDay(currentDate, selected);
      const isDisabled = isDateDisabled(currentDate);
      const isToday = isSameDay(currentDate, new Date());

      days.push(
        <motion.button
          key={`day-${day}`}
          type="button"
          whileHover={!isDisabled ? { scale: 1.1 } : undefined}
          whileTap={!isDisabled ? { scale: 0.95 } : undefined}
          onClick={() => handleDateSelect(day)}
          disabled={isDisabled}
          className={`
            p-2 text-sm rounded-lg transition-colors duration-200 relative
            ${isSelected
              ? 'bg-primary-600 text-white shadow-md'
              : isToday
              ? 'bg-primary-100 text-primary-700 font-medium'
              : isDisabled
              ? 'text-neutral-300 cursor-not-allowed'
              : 'text-neutral-700 hover:bg-neutral-100'
            }
          `}
        >
          {day}
          {isToday && !isSelected && (
            <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full" />
          )}
        </motion.button>
      );
    }

    return days;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Input Field */}
      <div className="relative">
        <input
          type="text"
          readOnly
          value={selected ? formatDate(selected) : ''}
          placeholder={placeholder}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full px-3 py-2 pl-9 bg-white border border-neutral-300 rounded-lg 
            focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 
            text-sm cursor-pointer transition-all duration-200 hover:border-neutral-400
            ${className}
          `}
        />
        <Calendar className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
        >
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        </motion.div>
      </div>

      {/* Calendar Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-1 p-3 bg-white rounded-xl shadow-lg border border-neutral-200/60 backdrop-blur-sm z-[9999]"
            style={{ minWidth: '260px' }}
          >
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigateMonth('prev')}
                className="p-1.5 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </motion.button>
              
              <h3 className="text-sm font-semibold text-neutral-800">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigateMonth('next')}
                className="p-1.5 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="p-1.5 text-xs font-medium text-neutral-500 text-center">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0.5">
              {renderCalendar()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModernDatePicker;
