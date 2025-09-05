import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken, isAdminUser } from '@/lib/auth-admin';
import { getAdminFirestore } from '@/lib/auth-admin';

// Verify admin authentication
async function verifyAdmin(request: NextRequest) {
  const authToken = request.cookies.get('admin-token')?.value;
  
  if (!authToken) {
    return { authorized: false, error: 'No authentication token' };
  }

  try {
    const verification = await verifyIdToken(authToken);
    
    if (!verification.success || !verification.uid) {
      return { authorized: false, error: 'Invalid token' };
    }

    const hasAdminAccess = await isAdminUser(verification.uid);
    
    if (!hasAdminAccess) {
      return { authorized: false, error: 'Admin access required' };
    }

    return { authorized: true, uid: verification.uid };
  } catch {
    return { authorized: false, error: 'Token verification failed' };
  }
}

// Sample user data for development/testing
const SAMPLE_USERS = [
  {
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'user',
    status: 'active',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date('2024-12-01')
  },
  {
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    role: 'user',
    status: 'active',
    createdAt: new Date('2024-02-20'),
    lastLogin: new Date('2024-11-28')
  },
  {
    email: 'admin@zionpropertycare.com',
    name: 'Admin User',
    role: 'admin',
    status: 'active',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-12-02')
  }
];

// POST /api/users/firestore/sample-data - Create sample user data
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    // Only allow in development environment
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Sample data creation is not allowed in production' },
        { status: 403 }
      );
    }

    const { count = 3, clearExisting = false } = await request.json();

    const db = getAdminFirestore();
    
    // Clear existing sample data if requested
    if (clearExisting) {
      const existingUsers = await db.collection('users')
        .where('email', 'in', SAMPLE_USERS.map(u => u.email))
        .get();
      
      const batch = db.batch();
      existingUsers.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      if (!existingUsers.empty) {
        await batch.commit();
      }
    }

    // Create sample users
    const usersToCreate = SAMPLE_USERS.slice(0, count);
    const createdUsers = [];

    for (const userData of usersToCreate) {
      const timestamp = new Date();
      const newUser = {
        ...userData,
        updatedAt: timestamp,
        createdBy: auth.uid,
        sampleData: true // Mark as sample data
      };

      const docRef = await db.collection('users').add(newUser);
      createdUsers.push({
        id: docRef.id,
        ...newUser
      });
    }

    return NextResponse.json({ 
      success: true,
      message: `Created ${createdUsers.length} sample users`,
      users: createdUsers,
      note: 'These are sample users for development/testing purposes'
    });
  } catch (error) {
    console.error('Error creating sample data:', error);
    return NextResponse.json(
      { error: 'Failed to create sample data' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/firestore/sample-data - Remove all sample data
export async function DELETE(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const db = getAdminFirestore();
    
    // Find all sample data
    const sampleUsers = await db.collection('users')
      .where('sampleData', '==', true)
      .get();

    if (sampleUsers.empty) {
      return NextResponse.json({ 
        success: true,
        message: 'No sample data found to delete'
      });
    }

    // Delete all sample users
    const batch = db.batch();
    sampleUsers.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    return NextResponse.json({ 
      success: true,
      message: `Deleted ${sampleUsers.size} sample users`,
      deletedCount: sampleUsers.size
    });
  } catch (error) {
    console.error('Error deleting sample data:', error);
    return NextResponse.json(
      { error: 'Failed to delete sample data' },
      { status: 500 }
    );
  }
}
