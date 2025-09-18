import { NextRequest, NextResponse } from 'next/server';
import { getAdminFirestore, verifyIdToken, isAdminUser } from '@/lib/auth-admin';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { initializeApp, getApps } from 'firebase/app';

// Initialize Firebase Storage
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Helper function to verify admin access
async function verifyAdminAccess(request: NextRequest) {
  try {
    const adminToken = request.cookies.get('admin-token')?.value;
    
    if (!adminToken) {
      return { authorized: false, error: 'Admin authentication required' };
    }

    const verification = await verifyIdToken(adminToken);
    
    if (!verification.success || !verification.uid) {
      return { authorized: false, error: 'Invalid admin token' };
    }

    const isAdmin = await isAdminUser(verification.uid);
    
    if (!isAdmin) {
      return { authorized: false, error: 'Admin access required' };
    }

    return { authorized: true, uid: verification.uid };
  } catch (error) {
    console.error('Admin verification error:', error);
    return { authorized: false, error: 'Authentication failed' };
  }
}

// Helper function to compress image if needed
async function compressImage(file: File): Promise<File> {
  // For now, return the original file
  // In production, you might want to use a library like browser-image-compression
  return file;
}

// Helper function to validate image
function validateImage(file: File): { isValid: boolean; error?: string } {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { isValid: false, error: 'File must be an image' };
  }

  // Check file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    return { isValid: false, error: 'Image must be less than 5MB' };
  }

  // Check file name
  if (!file.name || file.name.length === 0) {
    return { isValid: false, error: 'Invalid file name' };
  }

  return { isValid: true };
}

// POST - Upload profile image for a user
export async function POST(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const verification = await verifyAdminAccess(request);
    if (!verification.authorized) {
      return NextResponse.json(
        { error: verification.error },
        { status: 401 }
      );
    }

    const { uid } = params;
    if (!uid) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get the uploaded file
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Validate the image
    const validation = validateImage(file);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Check if user exists in Firestore
    const db = getAdminFirestore();
    const userDoc = await db.collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Compress image if needed
    const compressedFile = await compressImage(file);

    // Upload to Firebase Storage
    const storage = getStorage();
    const fileExtension = compressedFile.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `profile-${uid}-${Date.now()}.${fileExtension}`;
    const storageRef = ref(storage, `users/profile-images/${fileName}`);

    // Convert file to buffer for upload
    const arrayBuffer = await compressedFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Upload file
    const uploadResult = await uploadBytes(storageRef, uint8Array, {
      contentType: compressedFile.type,
      customMetadata: {
        userId: uid,
        uploadedBy: verification.uid!,
        originalName: compressedFile.name,
      }
    });

    // Get download URL
    const downloadURL = await getDownloadURL(uploadResult.ref);

    // Delete old profile image if exists
    const userData = userDoc.data();
    if (userData?.profileImage) {
      try {
        // Extract the file path from the old URL and delete it
        const oldImageRef = ref(storage, userData.profileImage);
        await deleteObject(oldImageRef);
      } catch (deleteError) {
        console.warn('Could not delete old profile image:', deleteError);
        // Don't fail the request if we can't delete the old image
      }
    }

    // Update user document with new profile image URL
    await db.collection('users').doc(uid).update({
      profileImage: downloadURL,
      updatedAt: new Date(),
      metadata: {
        ...userData?.metadata,
        lastUpdatedBy: verification.uid,
        profileImageUpdatedAt: new Date(),
      }
    });

    return NextResponse.json({
      success: true,
      imageUrl: downloadURL,
      fileName,
      message: 'Profile image uploaded successfully'
    });

  } catch (error) {
    console.error('Error uploading profile image:', error);
    return NextResponse.json(
      { error: 'Failed to upload profile image' },
      { status: 500 }
    );
  }
}

// DELETE - Remove profile image for a user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const verification = await verifyAdminAccess(request);
    if (!verification.authorized) {
      return NextResponse.json(
        { error: verification.error },
        { status: 401 }
      );
    }

    const { uid } = params;
    if (!uid) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check if user exists in Firestore
    const db = getAdminFirestore();
    const userDoc = await db.collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    if (!userData?.profileImage) {
      return NextResponse.json(
        { error: 'User has no profile image to delete' },
        { status: 400 }
      );
    }

    // Delete image from Firebase Storage
    try {
      const storage = getStorage();
      const imageRef = ref(storage, userData.profileImage);
      await deleteObject(imageRef);
    } catch (deleteError) {
      console.error('Error deleting image from storage:', deleteError);
      // Continue to remove from database even if storage deletion fails
    }

    // Remove profile image URL from user document
    await db.collection('users').doc(uid).update({
      profileImage: null,
      updatedAt: new Date(),
      metadata: {
        ...userData.metadata,
        lastUpdatedBy: verification.uid,
        profileImageRemovedAt: new Date(),
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Profile image removed successfully'
    });

  } catch (error) {
    console.error('Error removing profile image:', error);
    return NextResponse.json(
      { error: 'Failed to remove profile image' },
      { status: 500 }
    );
  }
}