import { useState, useEffect } from 'react';
import { Property } from '../data/properties';
import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Reusable fetch function
  const fetchAndSetProperties = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, 'properties'));
    const props: Property[] = [];
    querySnapshot.forEach((docSnap) => {
      props.push({ id: docSnap.id, ...docSnap.data() } as Property);
    });
    setProperties(props);
    setLoading(false);
  };

  // Fetch properties from Firebase only
  useEffect(() => {
    fetchAndSetProperties();
  }, []);

  // Add property to Firebase
  const addProperty = async (property: Omit<Property, 'id'>) => {
    await addDoc(collection(db, 'properties'), property);
    await fetchAndSetProperties();
  };

  // Update property in Firebase
  const updateProperty = async (property: Property) => {
    if (!property.id) return;
    const { id, ...propertyData } = property;
    await updateDoc(doc(db, 'properties', id), propertyData);
    await fetchAndSetProperties();
  };

  // Delete property from Firebase
  const deleteProperty = async (id: string) => {
    await deleteDoc(doc(db, 'properties', id));
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  // Get property by slug
  const getPropertyBySlug = (slug: string): Property | undefined => {
    return properties.find((p) => p.slug === slug);
  };

  return {
    properties,
    loading,
    addProperty,
    updateProperty,
    deleteProperty,
    getPropertyBySlug,
  };
}
