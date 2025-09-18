import { Property, PricingRule } from '../data/properties';

export interface PricingResult {
  price: number;
  currency: string;
  formattedPrice: string;
  priceRange: string;
  appliedRule?: PricingRule;
}

export interface DateRangePricingResult {
  totalPrice: number;
  currency: string;
  formattedTotalPrice: string;
  nights: number;
  breakdown: Array<{
    date: string;
    price: number;
    appliedRule?: PricingRule;
    isSpecialPrice: boolean;
  }>;
  hasSpecialPricing: boolean;
  avgPricePerNight: number;
  formattedAvgPrice: string;
}

/**
 * Get currency symbol for a given currency code
 */
export const getCurrencySymbol = (currency: string): string => {
  switch (currency.toUpperCase()) {
    case 'USD': return '$';
    case 'EUR': return '€';
    case 'GBP': return '£';
    case 'LKR': return 'Rs.';
    default: return currency;
  }
};

/**
 * Calculate the current price for a property based on the current date
 */
export const getCurrentPrice = (property: Property, targetDate?: Date): PricingResult => {
  const currentDate = targetDate || new Date();
  const { pricing } = property;
  
  // Ensure pricing object exists with default values
  if (!pricing || typeof pricing !== 'object') {
    return {
      price: 0,
      currency: 'USD',
      formattedPrice: '$0',
      priceRange: '$0/night'
    };
  }
  
  // Ensure rules array exists
  const rules = pricing.rules || [];
  
  // Check if any pricing rules apply to the current date
  const applicableRule = rules.find(rule => {
    if (!rule.startDate || !rule.endDate) return false;
    
    const startDate = new Date(rule.startDate);
    const endDate = new Date(rule.endDate);
    
    // Reset time to compare dates only
    const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const startDateOnly = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const endDateOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    
    return currentDateOnly >= startDateOnly && currentDateOnly <= endDateOnly;
  });
  
  // Use rule price if applicable, otherwise use default price
  const defaultPrice = pricing.defaultPrice || 0;
  const currentPrice = applicableRule ? applicableRule.price : defaultPrice;
  
  const currency = pricing.currency || 'USD';
  const currencySymbol = getCurrencySymbol(currency);
  const formattedPrice = `${currencySymbol}${currentPrice}`;
  
  // Create a price range for display
  const rulePrices = rules.map(r => r.price).filter(p => typeof p === 'number');
  const allPrices = [defaultPrice, ...rulePrices];
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  
  const priceRange = minPrice === maxPrice 
    ? `${currencySymbol}${currentPrice}/night`
    : `${currencySymbol}${minPrice}-${maxPrice}/night`;
  
  return {
    price: currentPrice,
    currency: currency,
    formattedPrice,
    priceRange,
    appliedRule: applicableRule
  };
};

/**
 * Calculate pricing for a date range considering special pricing rules
 */
export const calculateDateRangePricing = (
  property: Property, 
  checkInDate: string, 
  checkOutDate: string
): DateRangePricingResult => {
  const { pricing } = property;
  
  // Default values if pricing is not available
  if (!pricing || typeof pricing !== 'object') {
    return {
      totalPrice: 0,
      currency: 'USD',
      formattedTotalPrice: '$0',
      nights: 0,
      breakdown: [],
      hasSpecialPricing: false,
      avgPricePerNight: 0,
      formattedAvgPrice: '$0'
    };
  }
  
  const defaultPrice = pricing.defaultPrice || 0;
  const currency = pricing.currency || 'USD';
  const currencySymbol = getCurrencySymbol(currency);
  const rules = pricing.rules || [];
  
  // Parse dates
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  
  // Calculate nights (difference in days)
  const timeDiff = checkOut.getTime() - checkIn.getTime();
  const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
  if (nights <= 0) {
    return {
      totalPrice: 0,
      currency,
      formattedTotalPrice: `${currencySymbol}0`,
      nights: 0,
      breakdown: [],
      hasSpecialPricing: false,
      avgPricePerNight: 0,
      formattedAvgPrice: `${currencySymbol}0`
    };
  }
  
  // Generate breakdown for each night
  const breakdown: DateRangePricingResult['breakdown'] = [];
  let totalPrice = 0;
  let hasSpecialPricing = false;
  
  for (let i = 0; i < nights; i++) {
    const currentDate = new Date(checkIn);
    currentDate.setDate(checkIn.getDate() + i);
    
    // Format date as YYYY-MM-DD for comparison
    const dateString = currentDate.toISOString().split('T')[0];
    
    // Find applicable rule for this date
    const applicableRule = rules.find(rule => {
      if (!rule.startDate || !rule.endDate) return false;
      
      const ruleStart = new Date(rule.startDate);
      const ruleEnd = new Date(rule.endDate);
      
      // Reset times for date-only comparison
      const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      const ruleStartOnly = new Date(ruleStart.getFullYear(), ruleStart.getMonth(), ruleStart.getDate());
      const ruleEndOnly = new Date(ruleEnd.getFullYear(), ruleEnd.getMonth(), ruleEnd.getDate());
      
      return currentDateOnly >= ruleStartOnly && currentDateOnly <= ruleEndOnly;
    });
    
    // Use special price if rule applies, otherwise default price
    const nightPrice = applicableRule ? applicableRule.price : defaultPrice;
    const isSpecialPrice = !!applicableRule;
    
    if (isSpecialPrice) {
      hasSpecialPricing = true;
    }
    
    breakdown.push({
      date: dateString,
      price: nightPrice,
      appliedRule: applicableRule,
      isSpecialPrice
    });
    
    totalPrice += nightPrice;
  }
  
  // Calculate average price per night
  const avgPricePerNight = nights > 0 ? totalPrice / nights : 0;
  
  return {
    totalPrice,
    currency,
    formattedTotalPrice: `${currencySymbol}${totalPrice}`,
    nights,
    breakdown,
    hasSpecialPricing,
    avgPricePerNight,
    formattedAvgPrice: `${currencySymbol}${Math.round(avgPricePerNight)}`
  };
};

/**
 * Get price display for property listings (shows range if special pricing exists)
 */
export const getPropertyPriceDisplay = (property: Property): string => {
  const { pricing } = property;
  
  if (!pricing || typeof pricing !== 'object') {
    return 'Price on request';
  }
  
  const defaultPrice = pricing.defaultPrice || 0;
  const currency = pricing.currency || 'USD';
  const currencySymbol = getCurrencySymbol(currency);
  const rules = pricing.rules || [];
  
  if (rules.length === 0) {
    return `${currencySymbol}${defaultPrice}/night`;
  }
  
  // Get all prices (default + special prices)
  const allPrices = [defaultPrice, ...rules.map(rule => rule.price)];
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  
  if (minPrice === maxPrice) {
    return `${currencySymbol}${defaultPrice}/night`;
  }
  
  return `${currencySymbol}${minPrice}–${maxPrice}/night`;
};

/**
 * Check if a property has special pricing rules
 */
export const hasSpecialPricing = (property: Property): boolean => {
  return !!(property?.pricing?.rules && property.pricing.rules.length > 0);
};

/**
 * Get the next upcoming special pricing rule
 */
export const getNextSpecialPricing = (property: Property): PricingRule | null => {
  const { pricing } = property;
  
  if (!pricing?.rules || pricing.rules.length === 0) {
    return null;
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Find rules that start today or in the future
  const upcomingRules = pricing.rules
    .filter(rule => {
      const ruleStart = new Date(rule.startDate);
      ruleStart.setHours(0, 0, 0, 0);
      return ruleStart >= today;
    })
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  
  return upcomingRules.length > 0 ? upcomingRules[0] : null;
};

