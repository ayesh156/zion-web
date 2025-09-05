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

// DELETE /api/users/firestore/bulk-delete - Bulk delete documents from Firestore
export async function DELETE(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const { collection, documentIds } = await request.json();
    
    if (!collection || !documentIds || !Array.isArray(documentIds) || documentIds.length === 0) {
      return NextResponse.json(
        { error: 'Missing or invalid parameters: collection, documentIds array' },
        { status: 400 }
      );
    }

    if (documentIds.length > 100) {
      return NextResponse.json(
        { error: 'Cannot delete more than 100 documents at once' },
        { status: 400 }
      );
    }

    const db = getAdminFirestore();
    
    // Process in batches of 500 (Firestore batch limit)
    const batchSize = 500;
    const batches = [];
    
    for (let i = 0; i < documentIds.length; i += batchSize) {
      const batch = db.batch();
      const batchIds = documentIds.slice(i, i + batchSize);
      
      for (const docId of batchIds) {
        const docRef = db.collection(collection).doc(docId);
        batch.delete(docRef);
      }
      
      batches.push(batch);
    }

    // Execute all batches
    const results = await Promise.allSettled(batches.map(batch => batch.commit()));
    
    const successful = results.filter(result => result.status === 'fulfilled').length;
    const failed = results.filter(result => result.status === 'rejected').length;

    return NextResponse.json({ 
      success: true,
      collection,
      summary: {
        requested: documentIds.length,
        successful: successful * batchSize, // Approximate, as we don't track individual docs
        failed: failed * batchSize,
        batches: batches.length
      }
    });
  } catch (error) {
    console.error('Error in Firestore bulk delete:', error);
    return NextResponse.json(
      { error: 'Failed to delete documents from Firestore' },
      { status: 500 }
    );
  }
}
