import { Property, PricingRule } from '../data/properties';

export interface PricingResult {
  price: number;
  currency: string;
  formattedPrice: string;
  priceRange: string;
  appliedRule?: PricingRule;
}

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
  
  // Format currency symbol
  const getCurrencySymbol = (currency: string): string => {
    switch (currency.toUpperCase()) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'LKR': return 'Rs.';
      default: return currency;
    }
  };
  
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

