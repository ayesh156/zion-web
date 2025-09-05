'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Building2, 
  Star, 
  Wifi,
  Coffee,
  Tv,
  AirVent,
  Car
} from 'lucide-react';

const PropertySettings = () => {
  const [settings, setSettings] = useState({
    defaultCheckIn: '15:00',
    defaultCheckOut: '11:00',
    maxGuests: 8,
    minimumStay: 2,
    maximumStay: 30,
    bookingAdvanceTime: 24,
    cancellationPolicy: 'moderate',
    instantBooking: false,
    requireApproval: true,
    allowPets: false,
    smokingAllowed: false,
    partiesAllowed: false,
    defaultAmenities: {
      wifi: true,
      parking: true,
      kitchen: true,
      airConditioning: true,
      tv: true,
      washer: false,
      balcony: false,
      pool: false
    },
    pricingMode: 'seasonal',
    cleaningFee: 25,
    securityDeposit: 100,
    serviceFee: 12,
    taxRate: 8
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAmenityChange = (amenity: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      defaultAmenities: {
        ...prev.defaultAmenities,
        [amenity]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
  };

  const amenityIcons = {
    wifi: Wifi,
    parking: Car,
    kitchen: Coffee,
    airConditioning: AirVent,
    tv: Tv,
    washer: Building2,
    balcony: Building2,
    pool: Building2
  };

  return (
    <div className="space-y-6">
      {/* Booking Settings Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 overflow-hidden"
      >
        <div className="p-6 bg-gradient-to-r from-primary-600 to-primary-700">
          <div className="flex items-center space-x-3">
            <Building2 className="w-6 h-6 text-white" />
            <h3 className="text-xl font-bold text-white">Booking Settings</h3>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Default Check-in Time
              </label>
              <input
                type="time"
                value={settings.defaultCheckIn}
                onChange={(e) => handleInputChange('defaultCheckIn', e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Default Check-out Time
              </label>
              <input
                type="time"
                value={settings.defaultCheckOut}
                onChange={(e) => handleInputChange('defaultCheckOut', e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Maximum Guests
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={settings.maxGuests}
                onChange={(e) => handleInputChange('maxGuests', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Booking Advance Time (hours)
              </label>
              <input
                type="number"
                min="1"
                max="168"
                value={settings.bookingAdvanceTime}
                onChange={(e) => handleInputChange('bookingAdvanceTime', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Minimum Stay (nights)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={settings.minimumStay}
                onChange={(e) => handleInputChange('minimumStay', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Maximum Stay (nights)
              </label>
              <input
                type="number"
                min="1"
                max="365"
                value={settings.maximumStay}
                onChange={(e) => handleInputChange('maximumStay', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Cancellation Policy
            </label>
            <select
              value={settings.cancellationPolicy}
              onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="flexible">Flexible - Full refund 1 day prior to arrival</option>
              <option value="moderate">Moderate - Full refund 5 days prior to arrival</option>
              <option value="strict">Strict - 50% refund up until 1 week prior to arrival</option>
              <option value="super_strict">Super Strict - No refunds</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Property Rules Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 overflow-hidden"
      >
        <div className="p-6 bg-gradient-to-r from-secondary-600 to-secondary-700">
          <div className="flex items-center space-x-3">
            <Star className="w-6 h-6 text-white" />
            <h3 className="text-xl font-bold text-white">Property Rules</h3>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <div>
                <h4 className="font-semibold text-neutral-800">Instant Booking</h4>
                <p className="text-sm text-neutral-600">Allow guests to book without approval</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.instantBooking}
                  onChange={(e) => handleInputChange('instantBooking', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <div>
                <h4 className="font-semibold text-neutral-800">Require Approval</h4>
                <p className="text-sm text-neutral-600">Review bookings before confirmation</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.requireApproval}
                  onChange={(e) => handleInputChange('requireApproval', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <div>
                <h4 className="font-semibold text-neutral-800">Allow Pets</h4>
                <p className="text-sm text-neutral-600">Pets are welcome</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowPets}
                  onChange={(e) => handleInputChange('allowPets', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <div>
                <h4 className="font-semibold text-neutral-800">Smoking Allowed</h4>
                <p className="text-sm text-neutral-600">Smoking permitted in property</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.smokingAllowed}
                  onChange={(e) => handleInputChange('smokingAllowed', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <div>
                <h4 className="font-semibold text-neutral-800">Parties Allowed</h4>
                <p className="text-sm text-neutral-600">Events and parties permitted</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.partiesAllowed}
                  onChange={(e) => handleInputChange('partiesAllowed', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Default Amenities Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 overflow-hidden"
      >
        <div className="p-6 bg-gradient-to-r from-primary-600 to-secondary-600">
          <div className="flex items-center space-x-3">
            <Star className="w-6 h-6 text-white" />
            <h3 className="text-xl font-bold text-white">Default Amenities</h3>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(settings.defaultAmenities).map(([amenity, enabled]) => {
              const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons];
              return (
                <div key={amenity} className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                  <IconComponent className="w-5 h-5 text-neutral-600" />
                  <span className="text-sm font-medium text-neutral-700 capitalize flex-1">
                    {amenity.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(e) => handleAmenityChange(amenity, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Pricing Settings Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 overflow-hidden"
      >
        <div className="p-6 bg-gradient-to-r from-secondary-600 to-primary-600">
          <div className="flex items-center space-x-3">
            <Star className="w-6 h-6 text-white" />
            <h3 className="text-xl font-bold text-white">Pricing Settings</h3>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Pricing Mode
            </label>
            <select
              value={settings.pricingMode}
              onChange={(e) => handleInputChange('pricingMode', e.target.value)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="fixed">Fixed Rate</option>
              <option value="seasonal">Seasonal Pricing</option>
              <option value="dynamic">Dynamic Pricing</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Cleaning Fee ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={settings.cleaningFee}
                onChange={(e) => handleInputChange('cleaningFee', parseFloat(e.target.value))}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Security Deposit ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={settings.securityDeposit}
                onChange={(e) => handleInputChange('securityDeposit', parseFloat(e.target.value))}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Service Fee (%)
              </label>
              <input
                type="number"
                min="0"
                max="50"
                step="0.1"
                value={settings.serviceFee}
                onChange={(e) => handleInputChange('serviceFee', parseFloat(e.target.value))}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Tax Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="30"
                step="0.1"
                value={settings.taxRate}
                onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value))}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-end"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PropertySettings;
