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

// GET /api/users/firestore - Get users directly from Firestore with advanced filtering
export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection') || 'users';
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const direction = searchParams.get('direction') || 'desc';
    const limit = parseInt(searchParams.get('limit') || '100');

    const db = getAdminFirestore();
    
    // Build query with filters
    let query = db.collection(collection).orderBy(orderBy, direction as 'asc' | 'desc');
    
    // Apply limit
    query = query.limit(limit);

    const snapshot = await query.get();
    
    const documents = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      _metadata: {
        createTime: doc.createTime,
        updateTime: doc.updateTime
      }
    }));

    return NextResponse.json({ 
      documents,
      metadata: {
        collection,
        count: documents.length,
        hasMore: snapshot.docs.length === limit
      }
    });
  } catch (error) {
    console.error('Error fetching Firestore data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Firestore' },
      { status: 500 }
    );
  }
}

// POST /api/users/firestore - Create document in Firestore
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const { collection, document, docId } = await request.json();
    
    if (!collection || !document) {
      return NextResponse.json(
        { error: 'Missing required fields: collection, document' },
        { status: 400 }
      );
    }

    const db = getAdminFirestore();
    
    // Add metadata
    const timestamp = new Date();
    const documentData = {
      ...document,
      createdAt: timestamp,
      updatedAt: timestamp,
      createdBy: auth.uid
    };

    let docRef;
    if (docId) {
      // Create with specific ID
      docRef = db.collection(collection).doc(docId);
      await docRef.set(documentData);
    } else {
      // Auto-generate ID
      docRef = await db.collection(collection).add(documentData);
    }

    return NextResponse.json({ 
      success: true,
      id: docRef.id,
      document: { id: docRef.id, ...documentData }
    });
  } catch (error) {
    console.error('Error creating Firestore document:', error);
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 }
    );
  }
}
