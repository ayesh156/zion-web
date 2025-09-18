'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Search, MapPin, Calendar, Filter, Building2, Home } from 'lucide-react';

interface SearchData {
  city: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  propertyType: string;
}

interface VerticalPropertySearchBarProps {
  onSearch: (data: SearchData) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
}

const VerticalPropertySearchBar = ({ 
  onSearch, 
  searchTerm, 
  setSearchTerm, 
  selectedType, 
  setSelectedType 
}: VerticalPropertySearchBarProps) => {
  const [searchData, setSearchData] = useState<SearchData>({
    city: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    propertyType: selectedType
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

  const propertyTypes = [
    { value: 'all', label: 'All Properties', icon: Building2 },
    { value: 'villa', label: 'Villas', icon: Home },
    { value: 'apartment', label: 'Apartments', icon: Building2 },
    { value: 'house', label: 'Houses', icon: Home },
    { value: 'resort', label: 'Resorts', icon: MapPin }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      ...searchData,
      propertyType: selectedType
    });
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDatePicker) {
        const target = event.target as Node;
        const isClickInsideDateInput = dateInputRef.current?.contains(target);
        const isClickInsideDatePicker = document.querySelector('[data-date-picker="true"]')?.contains(target);
        
        if (!isClickInsideDateInput && !isClickInsideDatePicker) {
          setShowDatePicker(false);
        }
      }
    };

    if (showDatePicker) {
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDatePicker]);

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
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl space-y-6 w-full max-w-sm"
    >
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-white/90 mb-2">Find Your Stay</h3>
        <p className="text-sm text-white/80">Search and filter properties</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search Input */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-white/90 mb-2">
            <Search className="w-4 h-4 text-primary-400" />
            Search
          </label>
          <input
            type="text"
            placeholder="Property or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 text-white placeholder-white/60 text-sm font-medium hover:bg-white/15"
          />
        </div>

        {/* City Selection */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-white/90 mb-2">
            <MapPin className="w-4 h-4 text-primary-400" />
            Destination
          </label>
          <div className="relative">
            <div
              ref={cityInputRef}
              onClick={handleCityClick}
              className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 cursor-pointer text-sm font-medium text-white hover:bg-white/15"
            >
              <span className={`${searchData.city ? 'text-white' : 'text-white/60'}`}>
                {searchData.city || 'Any City'}
              </span>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <div className="w-2 h-2 border-r-2 border-b-2 border-white/60 transform rotate-45"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-white/90 mb-2">
            <Calendar className="w-4 h-4 text-primary-400" />
            Dates
          </label>
          <div className="relative">
            <div
              ref={dateInputRef}
              onClick={handleDateClick}
              className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/15 text-sm font-medium text-white"
            >
              <span className={`${searchData.checkIn || searchData.checkOut ? 'text-white' : 'text-white/60'}`}>
                {getDateRangeDisplay()}
              </span>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Calendar className="w-4 h-4 text-white/60" />
              </div>
            </div>
          </div>
        </div>

        {/* Property Type Filter */}
        <div className="relative">
          <label className="flex items-center gap-2 text-sm font-semibold text-white/90 mb-2">
            <Filter className="w-4 h-4 text-primary-400" />
            Property Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 text-white text-sm font-medium appearance-none hover:bg-white/15"
          >
            {propertyTypes.map(type => (
              <option key={type.value} value={type.value} className="bg-gray-800 text-white">
                {type.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <div className="w-2 h-2 border-r-2 border-b-2 border-white/60 transform rotate-45"></div>
          </div>
        </div>

        {/* Search Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold py-3 px-4 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl group gap-2"
        >
          <Search className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          Search Properties
        </motion.button>
      </form>


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
            width: Math.max(datePickerPosition.width, 300),
            zIndex: 9999
          }}
          className="bg-white rounded-xl shadow-2xl border border-neutral-200 p-6"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Check-in</label>
              <input
                ref={checkInRef}
                type="date"
                value={searchData.checkIn}
                onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 text-neutral-900 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Check-out</label>
              <input
                ref={checkOutRef}
                type="date"
                value={searchData.checkOut}
                onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                min={searchData.checkIn || new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 text-neutral-900 text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => setShowDatePicker(false)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              Done
            </button>
          </div>
        </motion.div>,
        document.body
      )}

      {/* Portal-based City Dropdown */}
      {showCityDropdown && typeof window !== 'undefined' && createPortal(
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
          className="bg-white rounded-xl shadow-2xl border border-neutral-200 py-2 max-h-48 overflow-y-auto"
        >
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => handleCitySelect(city)}
              className={`w-full px-4 py-2 text-left hover:bg-neutral-50 transition-colors duration-200 text-neutral-900 text-sm ${
                (searchData.city === city || (!searchData.city && city === 'Any City')) 
                  ? 'bg-primary-50 text-primary-700' 
                  : ''
              }`}
            >
              {city}
            </button>
          ))}
        </motion.div>,
        document.body
      )}

      {/* Backdrop for dropdowns */}
      {(showCityDropdown || showDatePicker) && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9998]" 
          onClick={() => {
            setShowCityDropdown(false);
            setShowDatePicker(false);
          }}
        />,
        document.body
      )}
    </motion.div>
  );
};

export default VerticalPropertySearchBar;