import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminFirestore, verifyIdToken, isAdminUser } from '@/lib/auth-admin';

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

// GET - Fetch all users
export async function GET(request: NextRequest) {
  try {
    const verification = await verifyAdminAccess(request);
    if (!verification.authorized) {
      return NextResponse.json(
        { error: verification.error },
        { status: 401 }
      );
    }

    const adminAuth = getAdminAuth();
    const db = getAdminFirestore();
    
    // Get all users from Firebase Auth
    const listUsersResult = await adminAuth.listUsers();
    
    // Get additional user data from Firestore if available
    const users = await Promise.all(
      listUsersResult.users.map(async (userRecord) => {
        try {
          // Try to get additional user data from Firestore
          const userDoc = await db.collection('users').doc(userRecord.uid).get();
          const userData = userDoc.exists ? userDoc.data() : null;
          
          return {
            uid: userRecord.uid,
            email: userRecord.email || null,
            displayName: userRecord.displayName || userData?.displayName || null,
            phoneNumber: userRecord.phoneNumber || userData?.phoneNumber || null,
            emailVerified: userRecord.emailVerified,
            disabled: userRecord.disabled,
            metadata: {
              creationTime: userRecord.metadata.creationTime,
              lastSignInTime: userRecord.metadata.lastSignInTime || null,
            },
            customClaims: userRecord.customClaims || {},
            // Additional data from Firestore
            role: userData?.role || 'staff',
            permissions: userData?.permissions || [],
            lastLogin: userData?.lastLogin?.toDate?.()?.toISOString() || null,
          };
        } catch (error) {
          console.error(`Error getting user data for ${userRecord.uid}:`, error);
          // Return basic user data if Firestore fetch fails
          return {
            uid: userRecord.uid,
            email: userRecord.email || null,
            displayName: userRecord.displayName || null,
            phoneNumber: userRecord.phoneNumber || null,
            emailVerified: userRecord.emailVerified,
            disabled: userRecord.disabled,
            metadata: {
              creationTime: userRecord.metadata.creationTime,
              lastSignInTime: userRecord.metadata.lastSignInTime || null,
            },
            customClaims: userRecord.customClaims || {},
            role: 'staff',
            permissions: [],
            lastLogin: null,
          };
        }
      })
    );

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST - Create a new user
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
    const { email, password, displayName, phoneNumber, role = 'staff', permissions = [] } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (!displayName) {
      return NextResponse.json(
        { error: 'Display name is required' },
        { status: 400 }
      );
    }

    const adminAuth = getAdminAuth();
    const db = getAdminFirestore();

    // Create user in Firebase Auth
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName,
      phoneNumber: phoneNumber || undefined,
      emailVerified: true, // Auto-verify admin created users
    });

    // Set custom claims for role-based access
    const customClaims = {
      role,
      permissions,
      ...(role === 'admin' && { admin: true }),
    };

    await adminAuth.setCustomUserClaims(userRecord.uid, customClaims);

    // Store additional user data in Firestore
    const userData = {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName,
      phoneNumber: phoneNumber || null,
      role,
      permissions,
      isAdmin: role === 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      metadata: {
        createdBy: verification.uid,
      },
    };

    await db.collection('users').doc(userRecord.uid).set(userData);

    // Return the created user data
    const responseUser = {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName,
      phoneNumber: phoneNumber || null,
      emailVerified: userRecord.emailVerified,
      disabled: userRecord.disabled,
      metadata: {
        creationTime: userRecord.metadata.creationTime,
        lastSignInTime: null,
      },
      customClaims,
      role,
      permissions,
    };

    return NextResponse.json({ user: responseUser }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    
    // Handle specific Firebase errors
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'auth/email-already-exists') {
        return NextResponse.json(
          { error: 'A user with this email already exists' },
          { status: 400 }
        );
      }
      
      if (error.code === 'auth/invalid-email') {
        return NextResponse.json(
          { error: 'Invalid email address' },
          { status: 400 }
        );
      }
      
      if (error.code === 'auth/weak-password') {
        return NextResponse.json(
          { error: 'Password is too weak' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
