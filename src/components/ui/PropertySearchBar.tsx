'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Search, MapPin, Calendar } from 'lucide-react';

interface SearchData {
  city: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface PropertySearchBarProps {
  onSearch: (data: SearchData) => void;
}

const PropertySearchBar = ({ onSearch }: PropertySearchBarProps) => {
  const [searchData, setSearchData] = useState<SearchData>({
    city: '',
    checkIn: '',
    checkOut: '',
    guests: 2
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [datePickerPosition, setDatePickerPosition] = useState({ top: 0, left: 0, width: 0 });
  const [cityDropdownPosition, setCityDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLDivElement>(null);
  const cityInputRef = useRef<HTMLDivElement>(null);

  const cities = [
    'Any City',
    'Colombo',
    'Kandy',
    'Galle',
    'Negombo',
    'Bentota',
    'Sigiriya',
    'Ella',
    'Nuwara Eliya',
    'Trincomalee',
    'Arugam Bay',
    'Hikkaduwa'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchData);
  };

  // Format date to compact display like "Sat, Sep 13"
  const formatCompactDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Create date range display
  const getDateRangeDisplay = (): string => {
    if (searchData.checkIn && searchData.checkOut) {
      return `${formatCompactDate(searchData.checkIn)} - ${formatCompactDate(searchData.checkOut)}`;
    } else if (searchData.checkIn) {
      return `From ${formatCompactDate(searchData.checkIn)}`;
    } else if (searchData.checkOut) {
      return `Until ${formatCompactDate(searchData.checkOut)}`;
    }
    return 'Select dates';
  };

  const handleDateClick = () => {
    if (!showDatePicker && dateInputRef.current) {
      const rect = dateInputRef.current.getBoundingClientRect();
      setDatePickerPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
    setShowDatePicker(!showDatePicker);
    if (!showDatePicker) {
      setTimeout(() => {
        checkInRef.current?.focus();
      }, 100);
    }
  };

  const handleCityClick = () => {
    if (!showCityDropdown && cityInputRef.current) {
      const rect = cityInputRef.current.getBoundingClientRect();
      setCityDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
    setShowCityDropdown(!showCityDropdown);
  };

  const handleCitySelect = (city: string) => {
    setSearchData({ ...searchData, city: city === 'Any City' ? '' : city });
    setShowCityDropdown(false);
  };

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDatePicker) {
        const target = event.target as Node;
        // Check if click is outside both the date input and the portal date picker
        const isClickInsideDateInput = dateInputRef.current?.contains(target);
        const isClickInsideDatePicker = document.querySelector('[data-date-picker="true"]')?.contains(target);
        
        if (!isClickInsideDateInput && !isClickInsideDatePicker) {
          setShowDatePicker(false);
        }
      }
    };

    if (showDatePicker) {
      // Use a small delay to prevent immediate closing when opening
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDatePicker]);

  // Close city dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCityDropdown) {
        const target = event.target as Node;
        const isClickInsideCityInput = cityInputRef.current?.contains(target);
        const isClickInsideCityDropdown = document.querySelector('[data-city-dropdown="true"]')?.contains(target);
        
        if (!isClickInsideCityInput && !isClickInsideCityDropdown) {
          setShowCityDropdown(false);
        }
      }
    };

    if (showCityDropdown) {
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCityDropdown]);

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      onSubmit={handleSubmit}
      className="relative bg-white/10 border border-white/20 rounded-2xl p-4 lg:p-6 shadow-2xl max-w-6xl mx-auto"
    >
      
      <div className="relative grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-3 lg:gap-4 items-end">
        {/* City Selection - Custom Dropdown */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-white/90 mb-2">
            <MapPin className="w-4 h-4 text-primary-400" />
            Destination
          </label>
          <div className="relative">
            <div 
              ref={cityInputRef}
              onClick={handleCityClick}
              className="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 cursor-pointer font-medium text-white hover:bg-white/15"
            >
              <span className={`${searchData.city ? 'text-white' : 'text-white/60'} text-sm lg:text-base`}>
                {searchData.city || 'Any City'}
              </span>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <div className="w-2 h-2 border-r-2 border-b-2 border-white/60 transform rotate-45"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Date Range Picker - Much Wider */}
        <div className="md:col-span-2 lg:col-span-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-white/90 mb-2">
            <Calendar className="w-4 h-4 text-primary-400" />
            Dates
          </label>
          <div className="relative">
            {/* Display Input - Entire area clickable */}
            <div 
              ref={dateInputRef}
              onClick={handleDateClick}
              className="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-white/10 border border-white/20 rounded-xl font-medium text-white cursor-pointer relative hover:bg-white/15 transition-all duration-300"
            >
              <span className={`${searchData.checkIn || searchData.checkOut ? 'text-white' : 'text-white/60'} text-sm lg:text-base`}>
                {getDateRangeDisplay()}
              </span>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Calendar className="w-4 h-4 text-white/60" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Button - Icon Only on Desktop, Text + Icon on Mobile */}
        <div className="md:col-span-1">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold py-2.5 lg:py-3.5 px-4 lg:px-6 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl group gap-2 cursor-pointer"
          >
            <Search className="w-5 lg:w-6 h-5 lg:h-6 transition-transform duration-300 group-hover:scale-110" />
            <span className="md:hidden text-sm font-bold">Search</span>
          </motion.button>
        </div>
      </div>

      {/* Portal-based Date Picker */}
      {showDatePicker && typeof window !== 'undefined' && createPortal(
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          data-date-picker="true"
          style={{
            position: 'absolute',
            top: datePickerPosition.top,
            left: datePickerPosition.left,
            width: Math.max(datePickerPosition.width, 400),
            zIndex: 9999
          }}
          className="bg-white rounded-xl shadow-2xl border border-neutral-200 p-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-base font-medium text-neutral-700 mb-3">Check-in</label>
              <input
                ref={checkInRef}
                type="date"
                value={searchData.checkIn}
                onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                readOnly={false}
                onClick={(e) => {
                  // Ensure the native date picker opens
                  e.currentTarget.showPicker?.();
                }}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 text-neutral-900 text-base cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-neutral-700 mb-3">Check-out</label>
              <input
                ref={checkOutRef}
                type="date"
                value={searchData.checkOut}
                onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                min={searchData.checkIn || new Date().toISOString().split('T')[0]}
                readOnly={false}
                onClick={(e) => {
                  // Ensure the native date picker opens
                  e.currentTarget.showPicker?.();
                }}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 text-neutral-900 text-base cursor-pointer"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => setShowDatePicker(false)}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-base font-medium cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>,
        document.body
      )}

      {/* Portal-based City Dropdown */}
      {showCityDropdown && typeof window !== 'undefined' && createPortal(
        <>
          <style dangerouslySetInnerHTML={{
            __html: `
              .city-dropdown::-webkit-scrollbar {
                width: 6px;
              }
              .city-dropdown::-webkit-scrollbar-track {
                background: #f5f5f5;
                border-radius: 0 12px 12px 0;
                margin: 8px 2px;
              }
              .city-dropdown::-webkit-scrollbar-thumb {
                background: #a3a3a3;
                border-radius: 3px;
                margin: 2px;
              }
              .city-dropdown::-webkit-scrollbar-thumb:hover {
                background: #737373;
              }
            `
          }} />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            data-city-dropdown="true"
            style={{
              position: 'absolute',
              top: cityDropdownPosition.top,
              left: cityDropdownPosition.left,
              width: cityDropdownPosition.width,
              zIndex: 9999
            }}
            className="bg-white rounded-xl shadow-2xl border border-neutral-200 py-2 max-h-60 overflow-y-auto city-dropdown"
          >
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => handleCitySelect(city)}
                className={`w-full px-4 py-3 text-left hover:bg-neutral-50 transition-colors duration-200 text-neutral-900 font-medium cursor-pointer ${
                  (searchData.city === city || (!searchData.city && city === 'Any City')) 
                    ? 'bg-primary-50 text-primary-700' 
                    : ''
                }`}
              >
                {city}
              </button>
            ))}
          </motion.div>
        </>,
        document.body
      )}

      {/* City Dropdown Backdrop */}
      {showCityDropdown && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9998]" 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowCityDropdown(false);
          }}
        />,
        document.body
      )}

      {/* Click outside to close date picker - Backdrop */}
      {showDatePicker && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9998]" 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowDatePicker(false);
          }}
        />,
        document.body
      )}
    </motion.form>
  );
};

export default PropertySearchBar;
