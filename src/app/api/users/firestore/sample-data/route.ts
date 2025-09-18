import { NextRequest, NextResponse } from 'next/server';
import { getAdminFirestore, verifyIdToken, isAdminUser, UserDocument } from '@/lib/auth-admin';

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

// POST - Add sample users to Firestore users collection (for testing)
export async function POST(request: NextRequest) {
  try {
    const verification = await verifyAdminAccess(request);
    if (!verification.authorized) {
      return NextResponse.json(
        { error: verification.error },
        { status: 401 }
      );
    }

    const db = getAdminFirestore();

    // Sample users to add
    const sampleUsers = [
      {
        uid: 'user_admin_001',
        email: 'admin@zionpropertycare.com',
        name: 'System Administrator',
        role: 'admin' as const,
        isAdmin: true,
      },
      {
        uid: 'user_manager_001',
        email: 'manager@zionpropertycare.com',
        name: 'Property Manager',
        role: 'user' as const,
        isAdmin: false,
      },
      {
        uid: 'user_staff_001',
        email: 'staff1@zionpropertycare.com',
        name: 'John Smith',
        role: 'user' as const,
        isAdmin: false,
      },
      {
        uid: 'user_staff_002',
        email: 'staff2@zionpropertycare.com',
        name: 'Sarah Johnson',
        role: 'user' as const,
        isAdmin: false,
      },
      {
        uid: 'user_staff_003',
        email: 'guest@zionpropertycare.com',
        name: 'Guest User',
        role: 'user' as const,
        isAdmin: false,
      }
    ];

    const results = [];

    for (const sampleUser of sampleUsers) {
      // Check if user already exists
      const existingDoc = await db.collection('users').doc(sampleUser.uid).get();
      
      if (existingDoc.exists) {
        results.push({
          uid: sampleUser.uid,
          email: sampleUser.email,
          status: 'skipped',
          message: 'User already exists'
        });
        continue;
      }

      // Create user document
      const userData: UserDocument = {
        uid: sampleUser.uid,
        email: sampleUser.email,
        name: sampleUser.name,
        role: sampleUser.role,
        isAdmin: sampleUser.isAdmin,
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          createdBy: verification.uid,
        },
      };

      await db.collection('users').doc(sampleUser.uid).set(userData);
      
      results.push({
        uid: sampleUser.uid,
        email: sampleUser.email,
        status: 'created',
        message: 'User created successfully'
      });
    }

    return NextResponse.json({ 
      success: true,
      message: `Sample data processing complete`,
      results,
      summary: {
        total: sampleUsers.length,
        created: results.filter(r => r.status === 'created').length,
        skipped: results.filter(r => r.status === 'skipped').length
      }
    });
  } catch (error) {
    console.error('Error adding sample users:', error);
    return NextResponse.json(
      { error: 'Failed to add sample users' },
      { status: 500 }
    );
  }
}
