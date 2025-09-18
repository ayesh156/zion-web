import { Property, properties as defaultProperties, Booking } from '../data/properties';

// In a real application, this would connect to a database
// For now, we'll use localStorage to persist changes during the session

const STORAGE_KEY = 'zion_properties';

export class PropertyService {
  // Migrate old property data to ensure pricing structure exists
  private static migrateProperty(property: Partial<Property>): Property {
    // If property doesn't have pricing structure, create it
    if (!property.pricing) {
      property.pricing = {
        currency: 'USD',
        defaultPrice: 100, // Default fallback price
        rules: []
      };
    }
    
    // Ensure pricing has all required fields
    if (!property.pricing.currency) property.pricing.currency = 'USD';
    if (typeof property.pricing.defaultPrice !== 'number') property.pricing.defaultPrice = 100;
    if (!Array.isArray(property.pricing.rules)) property.pricing.rules = [];
    
    return property as Property;
  }

  static getProperties(): Property[] {
    if (typeof window === 'undefined') return defaultProperties;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Migrate each property to ensure proper structure
        return parsed.map((prop: Partial<Property>) => this.migrateProperty(prop));
      } catch (error) {
        console.warn('Failed to parse stored properties, falling back to defaults:', error);
        return defaultProperties;
      }
    }
    
    // Return default properties if none stored
    return defaultProperties;
  }

  static saveProperties(properties: Property[]): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('propertiesUpdated', {
      detail: { properties }
    }));
  }

  static addProperty(property: Omit<Property, 'id'>): Property {
    const properties = this.getProperties();
    const newProperty: Property = {
      ...property,
      id: this.generateId(properties)
    };
    
    const updatedProperties = [...properties, newProperty];
    this.saveProperties(updatedProperties);
    
    return newProperty;
  }

  static updateProperty(updatedProperty: Property): void {
    const properties = this.getProperties();
    const updatedProperties = properties.map(p => 
      p.id === updatedProperty.id ? updatedProperty : p
    );
    
    this.saveProperties(updatedProperties);
  }

  static deleteProperty(id: string): void {
    const properties = this.getProperties();
    const updatedProperties = properties.filter(p => p.id !== id);
    this.saveProperties(updatedProperties);
  }

  private static generateId(properties: Property[]): string {
    const maxId = properties.reduce((max, property) => {
      const id = parseInt(property.id);
      return isNaN(id) ? max : Math.max(max, id);
    }, 0);
    
    return (maxId + 1).toString();
  }

  // Method to reset to default properties
  static resetToDefaults(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('propertiesUpdated', {
      detail: { properties: this.getProperties() }
    }));
  }

  // Method to update property bookings
  static updatePropertyBookings(propertyId: string, bookings: Booking[]): void {
    const properties = this.getProperties();
    const updatedProperties = properties.map(p => 
      p.id === propertyId ? { ...p, bookings } : p
    );
    
    this.saveProperties(updatedProperties);
  }
}
