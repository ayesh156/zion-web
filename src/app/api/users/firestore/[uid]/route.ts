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

interface RouteParams {
  params: Promise<{
    uid: string;
  }>;
}

// GET /api/users/firestore/[uid] - Get specific user document from Firestore
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const { uid } = await params;
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection') || 'users';

    const db = getAdminFirestore();
    
    const docRef = db.collection(collection).doc(uid);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json(
        { error: `Document ${uid} not found in collection ${collection}` },
        { status: 404 }
      );
    }

    const documentData = {
      id: doc.id,
      ...doc.data(),
      _metadata: {
        createTime: doc.createTime,
        updateTime: doc.updateTime
      }
    };

    return NextResponse.json({ 
      document: documentData,
      collection 
    });
  } catch (error) {
    console.error('Error fetching Firestore document:', error);
    return NextResponse.json(
      { error: 'Failed to fetch document from Firestore' },
      { status: 500 }
    );
  }
}

// PUT /api/users/firestore/[uid] - Update specific user document in Firestore
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const { uid } = await params;
    const { collection = 'users', document, merge = true } = await request.json();
    
    if (!document) {
      return NextResponse.json(
        { error: 'Missing document data' },
        { status: 400 }
      );
    }

    const db = getAdminFirestore();
    const docRef = db.collection(collection).doc(uid);
    
    // Check if document exists
    const existingDoc = await docRef.get();
    if (!existingDoc.exists) {
      return NextResponse.json(
        { error: `Document ${uid} not found in collection ${collection}` },
        { status: 404 }
      );
    }

    // Prepare update data with metadata
    const updateData = {
      ...document,
      updatedAt: new Date(),
      updatedBy: auth.uid
    };

    // Update document
    await docRef.set(updateData, { merge });
    
    // Return updated document
    const updatedDoc = await docRef.get();
    const documentData = {
      id: updatedDoc.id,
      ...updatedDoc.data(),
      _metadata: {
        createTime: updatedDoc.createTime,
        updateTime: updatedDoc.updateTime
      }
    };

    return NextResponse.json({ 
      success: true,
      document: documentData,
      collection
    });
  } catch (error) {
    console.error('Error updating Firestore document:', error);
    return NextResponse.json(
      { error: 'Failed to update document in Firestore' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/firestore/[uid] - Delete specific user document from Firestore
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const { uid } = await params;
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection') || 'users';

    const db = getAdminFirestore();
    const docRef = db.collection(collection).doc(uid);
    
    // Check if document exists
    const doc = await docRef.get();
    if (!doc.exists) {
      return NextResponse.json(
        { error: `Document ${uid} not found in collection ${collection}` },
        { status: 404 }
      );
    }

    // Delete the document
    await docRef.delete();

    return NextResponse.json({ 
      success: true,
      message: `Document ${uid} deleted from collection ${collection}`,
      collection
    });
  } catch (error) {
    console.error('Error deleting Firestore document:', error);
    return NextResponse.json(
      { error: 'Failed to delete document from Firestore' },
      { status: 500 }
    );
  }
}
