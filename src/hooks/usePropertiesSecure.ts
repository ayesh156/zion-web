import { useState, useEffect } from 'react';
import { Property } from '../data/properties';

export function usePropertiesSecure() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch properties from secure API endpoint
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/properties', {
        credentials: 'include' // Include cookies for authentication
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/admin/login';
          return;
        }
        throw new Error('Failed to fetch properties');
      }

      const data = await response.json();
      setProperties(data.properties || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch properties';
      setError(errorMessage);
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add property via secure API
  const addProperty = async (property: Omit<Property, 'id'>) => {
    try {
      setError(null);
      
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(property),
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication required');
        }
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create property');
      }

      const data = await response.json();
      
      // Refresh properties list
      await fetchProperties();
      
      return data.property;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create property';
      setError(errorMessage);
      throw err;
    }
  };

  // Update property via secure API
  const updateProperty = async (property: Property) => {
    try {
      setError(null);
      
      if (!property.id) {
        throw new Error('Property ID is required for update');
      }

      const response = await fetch(`/api/properties/${property.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(property),
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication required');
        }
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update property');
      }

      // Refresh properties list
      await fetchProperties();
      
      const data = await response.json();
      return data.property;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update property';
      setError(errorMessage);
      throw err;
    }
  };

  // Delete property via secure API
  const deleteProperty = async (id: string) => {
    try {
      setError(null);
      
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication required');
        }
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete property');
      }

      // Remove from local state immediately for better UX
      setProperties(prev => prev.filter(p => p.id !== id));
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete property';
      setError(errorMessage);
      throw err;
    }
  };

  // Get property by slug (client-side filtering)
  const getPropertyBySlug = (slug: string): Property | undefined => {
    return properties.find((p) => p.slug === slug);
  };

  // Clear error
  const clearError = () => setError(null);

  // Initial fetch
  useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties,
    loading,
    error,
    addProperty,
    updateProperty,
    deleteProperty,
    getPropertyBySlug,
    refetch: fetchProperties,
    clearError
  };
}
