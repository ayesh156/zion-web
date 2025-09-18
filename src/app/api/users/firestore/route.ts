import { NextRequest, NextResponse } from 'next/server';
import { getAdminFirestore, getAdminAuth, verifyIdToken, isAdminUser, UserDocument } from '@/lib/auth-admin';

// Define interfaces for better type safety
interface FirestoreTimestamp {
  seconds: number;
  nanoseconds?: number;
  toDate(): Date;
}

interface FirestoreUserResponse {
  uid: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  isAdmin: boolean;
  status?: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLogin?: string;
  updatedAt: string;
  metadata?: {
    createdBy?: string;
    promotedToAdminAt?: string;
    promotedBy?: string;
  };
}

// Helper function to verify admin access using admin-token cookie
async function verifyAdminAccess(request: NextRequest) {
  try {
    const adminToken = request.cookies.get('admin-token')?.value;
    
    if (!adminToken) {
      return { authorized: false, error: 'Admin authentication required' };
    }

    // Verify the ID token
    const verification = await verifyIdToken(adminToken);
    
    if (!verification.success || !verification.uid) {
      return { authorized: false, error: 'Invalid admin token' };
    }

    // Check if user has admin privileges
    const isAdmin = await isAdminUser(verification.uid);
    
    if (!isAdmin) {
      return { authorized: false, error: 'Admin access required' };
    }

    return { authorized: true, uid: verification.uid, email: verification.email };
  } catch (error) {
    console.error('Admin verification error:', error);
    return { authorized: false, error: 'Authentication failed' };
  }
}

// GET - Fetch all users from Firestore users collection
export async function GET(request: NextRequest) {
  try {
    const verification = await verifyAdminAccess(request);
    if (!verification.authorized) {
      return NextResponse.json(
        { error: verification.error },
        { status: 401 }
      );
    }

    const db = getAdminFirestore();
    
    // Get all users from Firestore users collection
    const usersSnapshot = await db.collection('users').get();
    
    const users: FirestoreUserResponse[] = [];
    
    usersSnapshot.forEach((doc) => {
      const userData = doc.data() as UserDocument;
      // Helper to get a valid ISO string from Firestore Timestamp, Date, or string
      const toISOStringSafe = (val: unknown): string => {
        if (!val) return new Date().toISOString();
        if (typeof val === 'string') {
          const d = new Date(val);
          return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
        }
        if (val instanceof Date) return val.toISOString();
        
        // Type guard for Firestore Timestamp
        if (val && typeof val === 'object' && 'toDate' in val && typeof (val as FirestoreTimestamp).toDate === 'function') {
          return (val as FirestoreTimestamp).toDate().toISOString();
        }
        
        // Handle timestamp-like objects
        if (val && typeof val === 'object') {
          const timestampObj = val as Record<string, unknown>;
          
          if (typeof timestampObj.seconds === 'number') {
            const nanoseconds = typeof timestampObj.nanoseconds === 'number' ? timestampObj.nanoseconds : 0;
            return new Date(timestampObj.seconds * 1000 + nanoseconds / 1_000_000).toISOString();
          }
          
          if (typeof timestampObj._seconds === 'number') {
            const nanoseconds = typeof timestampObj._nanoseconds === 'number' ? timestampObj._nanoseconds : 0;
            return new Date(timestampObj._seconds * 1000 + nanoseconds / 1_000_000).toISOString();
          }
        }
        return new Date().toISOString();
      };
      if (userData.uid && userData.email) {
        users.push({
          uid: userData.uid,
          email: userData.email,
          name: userData.name || userData.email?.split('@')[0] || 'User',
          role: userData.role || 'user',
          isAdmin: userData.isAdmin || false,
          status: userData.status || 'active',
          createdAt: toISOStringSafe(userData.createdAt),
          lastLogin: userData.lastLogin ? toISOStringSafe(userData.lastLogin) : undefined,
          updatedAt: toISOStringSafe(userData.updatedAt),
          metadata: userData.metadata ? {
            createdBy: userData.metadata.createdBy,
            promotedToAdminAt: userData.metadata.promotedToAdminAt ? toISOStringSafe(userData.metadata.promotedToAdminAt) : undefined,
            promotedBy: userData.metadata.promotedBy,
          } : undefined,
        });
      }
    });

    // Sort users by creation date (newest first)
    users.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });

    return NextResponse.json({ 
      users,
      total: users.length,
      message: `Retrieved ${users.length} users from Firestore`
    });
  } catch (error) {
    console.error('Error fetching users from Firestore:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users from database' },
      { status: 500 }
    );
  }
}

// POST - Create a new user in both Firebase Auth and Firestore
export async function POST(request: NextRequest) {
  try {
    const verification = await verifyAdminAccess(request);
    if (!verification.authorized) {
      return NextResponse.json(
        { error: verification.error },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { email, name, role = 'user', isAdmin = false, status = 'active', password } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required for new users' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const db = getAdminFirestore();
    const auth = getAdminAuth();

    // Check if user already exists in Firestore
    const existingUserQuery = await db.collection('users').where('email', '==', email).get();
    
    if (!existingUserQuery.empty) {
      return NextResponse.json(
        { error: 'A user with this email already exists in the database' },
        { status: 400 }
      );
    }

    // Check if user already exists in Firebase Auth
    try {
      await auth.getUserByEmail(email);
      return NextResponse.json(
        { error: 'A user with this email already exists in authentication' },
        { status: 400 }
      );
    } catch (authError: unknown) {
      // If user doesn't exist in auth, this is good - continue
      const authErr = authError as { code?: string };
      if (authErr.code !== 'auth/user-not-found') {
        console.error('Error checking user existence in auth:', authError);
        return NextResponse.json(
          { error: 'Failed to verify user existence' },
          { status: 500 }
        );
      }
    }

    let authUid: string | undefined;
    let firestoreSuccess = false;

    try {
      // Step 1: Create user in Firebase Auth
      const userRecord = await auth.createUser({
        email,
        password,
        displayName: name,
        emailVerified: false, // They'll need to verify their email
        disabled: status === 'inactive', // Disable if status is inactive
      });

      authUid = userRecord.uid;

      // Step 2: Set custom claims if admin
      if (isAdmin || role === 'admin') {
        await auth.setCustomUserClaims(authUid, { admin: true });
      }

      // Step 3: Create user document in Firestore
      const timestamp = new Date();
      const userData: UserDocument = {
        uid: authUid,
        email,
        name,
        role: role as 'user' | 'admin',
        isAdmin: isAdmin || role === 'admin',
        status: status as 'active' | 'inactive' | 'pending',
        emailVerified: false,
        createdAt: timestamp,
        updatedAt: timestamp,
        metadata: {
          createdBy: verification.uid,
        },
      };

      await db.collection('users').doc(authUid).set(userData);
      firestoreSuccess = true;

      return NextResponse.json({ 
        user: userData,
        message: 'User created successfully in both authentication and database'
      }, { status: 201 });

    } catch (error: unknown) {
      console.error('Error during user creation:', error);
      const err = error as { code?: string; message?: string };
      
      // Rollback: If Firestore creation failed but Auth succeeded, delete from Auth
      if (authUid && !firestoreSuccess) {
        try {
          await auth.deleteUser(authUid);
          console.log('Rolled back Firebase Auth user creation due to Firestore failure');
        } catch (rollbackError) {
          console.error('Failed to rollback auth user creation:', rollbackError);
        }
      }

      // Provide user-friendly error messages
      if (err.code === 'auth/email-already-exists') {
        return NextResponse.json(
          { error: 'A user with this email already exists' },
          { status: 400 }
        );
      } else if (err.code === 'auth/invalid-email') {
        return NextResponse.json(
          { error: 'Please provide a valid email address' },
          { status: 400 }
        );
      } else if (err.code === 'auth/weak-password') {
        return NextResponse.json(
          { error: 'Password is too weak. Please choose a stronger password' },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to create user. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
