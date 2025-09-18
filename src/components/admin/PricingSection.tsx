'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Calendar, DollarSign } from 'lucide-react';
import { PricingRule } from '../../data/properties';
import ModernDatePicker from '../ui/ModernDatePicker';

interface PricingSectionProps {
  defaultPrice: number;
  currency: string;
  rules: PricingRule[];
  onDefaultPriceChange: (price: number) => void;
  onCurrencyChange: (currency: string) => void;
  onRulesChange: (rules: PricingRule[]) => void;
}

const PricingSection = ({
  defaultPrice,
  currency,
  rules,
  onDefaultPriceChange,
  onCurrencyChange,
  onRulesChange,
}: PricingSectionProps) => {
  // Infer initial pricing type from rules
  const [pricingType, setPricingType] = useState<'default' | 'dateRanges'>(
    rules && rules.length > 0 ? 'dateRanges' : 'default'
  );

  // If rules change (e.g., when editing a property), update pricingType accordingly
  useEffect(() => {
    if (rules && rules.length > 0) {
      setPricingType('dateRanges');
    } else {
      setPricingType('default');
    }
  }, [rules]);

  const generateId = () => `pricing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const addPricingRule = () => {
    const today = new Date();
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const newRule: PricingRule = {
      id: generateId(),
      startDate: today.toISOString().slice(0, 10),
      endDate: nextWeek.toISOString().slice(0, 10),
      price: defaultPrice,
    };
    onRulesChange([...rules, newRule]);
  };

  const updatePricingRule = (id: string, updates: Partial<PricingRule>) => {
    const updatedRules = rules.map(rule =>
      rule.id === id ? { ...rule, ...updates } : rule
    );
    onRulesChange(updatedRules);
  };

  const removePricingRule = (id: string) => {
    const filteredRules = rules.filter(rule => rule.id !== id);
    onRulesChange(filteredRules);
  };

  const handlePricingTypeChange = (type: 'default' | 'dateRanges') => {
    setPricingType(type);
    if (type === 'default') {
      // Clear all date range rules when switching to default only
      onRulesChange([]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Pricing Section Header */}
      <div className="border-b border-neutral-200/50 pb-4">
        <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-primary-600" />
          Pricing Configuration
        </h3>
        <p className="text-sm text-neutral-600">
          Set default pricing or configure specific rates for different date ranges
        </p>
      </div>

      {/* Currency Selection */}
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-3">
          Currency
        </label>
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm appearance-none"
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="LKR">LKR (Rs.)</option>
        </select>
      </div>

      {/* Default Price */}
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-3">
          Default Price (per night) *
        </label>
        <div className="relative">
          <input
            type="number"
            min="0"
            step="0.01"
            value={defaultPrice}
            onChange={(e) => onDefaultPriceChange(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-3 pl-12 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm"
            placeholder="0.00"
            required
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400">
            {currency === 'USD' && '$'}
            {currency === 'EUR' && '€'}
            {currency === 'GBP' && '£'}
            {currency === 'LKR' && 'Rs.'}
          </div>
        </div>
      </div>

      {/* Pricing Type Selection */}
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-3">
          Pricing Strategy
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handlePricingTypeChange('default')}
            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
              pricingType === 'default'
                ? 'border-primary-500 bg-primary-50/80 text-primary-700'
                : 'border-neutral-200/50 bg-white/60 text-neutral-600 hover:border-neutral-300 hover:bg-white/80'
            }`}
          >
            <div className="font-medium mb-1">Default Pricing Only</div>
            <div className="text-sm opacity-75">
              Use the same price for all dates
            </div>
          </motion.button>
          
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handlePricingTypeChange('dateRanges')}
            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
              pricingType === 'dateRanges'
                ? 'border-primary-500 bg-primary-50/80 text-primary-700'
                : 'border-neutral-200/50 bg-white/60 text-neutral-600 hover:border-neutral-300 hover:bg-white/80'
            }`}
          >
            <div className="font-medium mb-1">Date Range Pricing</div>
            <div className="text-sm opacity-75">
              Set different prices for specific periods
            </div>
          </motion.button>
        </div>
      </div>

      {/* Date Range Pricing Rules */}
      <AnimatePresence>
        {pricingType === 'dateRanges' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-neutral-700">
                Date Range Rules
              </label>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addPricingRule}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                Add Date Range
              </motion.button>
            </div>

            <div className="space-y-4">
              {rules.map((rule, idx) => {
                // Calculate zIndex: first picker gets highest, last gets lowest
                const zIndex = 1000 - idx;

                return (
                  <div key={rule.id} style={{ position: 'relative', zIndex }}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="relative p-4 bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-sm border border-neutral-200/50 rounded-xl shadow-sm"
                      style={{ zIndex: 10 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        {/* Date Range Selection */}
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Date Range
                          </label>
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <ModernDatePicker
                                selected={rule.startDate ? new Date(rule.startDate) : undefined}
                                onChange={date =>
                                  updatePricingRule(rule.id, {
                                    startDate: date ? date.toISOString().slice(0, 10) : '',
                                  })
                                }
                                placeholder="Start Date"
                                className={`focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 datepicker-z-${zIndex}`}
                              />
                            </div>
                            <span className="text-neutral-400 text-sm px-2">to</span>
                            <div className="flex-1">
                              <ModernDatePicker
                                selected={rule.endDate ? new Date(rule.endDate) : undefined}
                                onChange={date =>
                                  updatePricingRule(rule.id, {
                                    endDate: date ? date.toISOString().slice(0, 10) : '',
                                  })
                                }
                                placeholder="End Date"
                                minDate={rule.startDate ? new Date(rule.startDate) : undefined}
                                className={`focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 datepicker-z-${zIndex}`}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Price Input */}
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Price (per night)
                          </label>
                          <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={rule.price}
                                onChange={(e) =>
                                  updatePricingRule(rule.id, {
                                    price: parseFloat(e.target.value) || 0,
                                  })
                                }
                                className="w-full px-3 py-2 pl-8 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm"
                                placeholder="0.00"
                              />
                              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-sm">
                                {currency === 'USD' && '$'}
                                {currency === 'EUR' && '€'}
                                {currency === 'GBP' && '£'}
                                {currency === 'LKR' && 'Rs.'}
                              </div>
                            </div>
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removePricingRule(rule.id)}
                              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}

              {rules.length === 0 && (
                <div className="text-center py-8 text-neutral-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">
                    No date range rules configured.{' '}
                    <button
                      type="button"
                      onClick={addPricingRule}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Add your first rule
                    </button>
                  </p>
                </div>
              )}
            </div>

            {rules.length > 0 && (
              <div className="p-3 bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> Date range rules will override the default price for the specified periods. 
                  Any dates not covered by rules will use the default price.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PricingSection;
