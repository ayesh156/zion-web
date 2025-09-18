import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  setDoc,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { Property, Booking } from '../data/properties';

const PROPERTIES_COLLECTION = 'properties';

export class FirebasePropertyService {
  // Get all properties from Firebase
  static async getProperties(): Promise<Property[]> {
    try {
      const propertiesRef = collection(db, PROPERTIES_COLLECTION);
      const q = query(propertiesRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const properties: Property[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        properties.push({
          ...data,
          id: doc.id,
          // Convert Firestore timestamps back to dates if needed
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date(),
        } as Property);
      });
      
      return properties;
    } catch (error) {
      console.error('Error fetching properties from Firebase:', error);
      throw error;
    }
  }

  // Get a single property by ID
  static async getProperty(id: string): Promise<Property | null> {
    try {
      const propertyRef = doc(db, PROPERTIES_COLLECTION, id);
      const propertySnap = await getDoc(propertyRef);
      
      if (propertySnap.exists()) {
        const data = propertySnap.data();
        return {
          ...data,
          id: propertySnap.id,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date(),
        } as Property;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching property from Firebase:', error);
      throw error;
    }
  }

  // Add a new property to Firebase
  static async addProperty(property: Omit<Property, 'id'>): Promise<Property> {
    try {
      const propertyData = {
        ...property,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      const docRef = await addDoc(collection(db, PROPERTIES_COLLECTION), propertyData);
      
      // Return the property with the generated ID
      return {
        ...property,
        id: docRef.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      console.error('Error adding property to Firebase:', error);
      throw error;
    }
  }

  // Update an existing property in Firebase
  static async updateProperty(updatedProperty: Property): Promise<void> {
    try {
      const propertyRef = doc(db, PROPERTIES_COLLECTION, updatedProperty.id);
      
      // Destructure to remove id and create update data
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...updateData } = {
        ...updatedProperty,
        updatedAt: serverTimestamp(),
      };
      
      await updateDoc(propertyRef, updateData);
    } catch (error) {
      console.error('Error updating property in Firebase:', error);
      throw error;
    }
  }

  // Delete a property from Firebase
  static async deleteProperty(id: string): Promise<void> {
    try {
      const propertyRef = doc(db, PROPERTIES_COLLECTION, id);
      await deleteDoc(propertyRef);
    } catch (error) {
      console.error('Error deleting property from Firebase:', error);
      throw error;
    }
  }

  // Update property bookings specifically
  static async updatePropertyBookings(propertyId: string, bookings: Booking[]): Promise<void> {
    try {
      const propertyRef = doc(db, PROPERTIES_COLLECTION, propertyId);
      
      await updateDoc(propertyRef, {
        bookings: bookings,
        updatedAt: serverTimestamp(),
      });
      
      console.log('Bookings updated successfully in Firebase for property:', propertyId);
    } catch (error) {
      console.error('Error updating property bookings in Firebase:', error);
      throw error;
    }
  }

  // Set up a property document with a specific ID (useful for migration)
  static async setProperty(propertyId: string, property: Omit<Property, 'id'>): Promise<void> {
    try {
      const propertyRef = doc(db, PROPERTIES_COLLECTION, propertyId);
      const propertyData = {
        ...property,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      await setDoc(propertyRef, propertyData);
    } catch (error) {
      console.error('Error setting property in Firebase:', error);
      throw error;
    }
  }

  // Batch update multiple properties (useful for migrations)
  static async batchUpdateProperties(properties: Property[]): Promise<void> {
    try {
      const promises = properties.map(property => 
        this.setProperty(property.id, property)
      );
      
      await Promise.all(promises);
      console.log('Batch update completed successfully');
    } catch (error) {
      console.error('Error in batch update:', error);
      throw error;
    }
  }
}
