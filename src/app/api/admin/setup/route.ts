import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getUserByEmail, createUserDocument } from '@/lib/auth-admin';

export async function POST(request: NextRequest) {
  try {
    // Check for admin setup secret
    const adminSetupKey = request.headers.get('x-admin-setup-key');
    
    if (!adminSetupKey || adminSetupKey !== process.env.ADMIN_SETUP_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid admin setup key' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { email, name, password } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required to create a new admin user' },
        { status: 400 }
      );
    }

    // Check if user already exists
    try {
      await getUserByEmail(email);
      return NextResponse.json(
        { error: 'User with this email already exists. Use a different email or delete the existing user first.' },
        { status: 409 }
      );
    } catch {
      // User doesn't exist, which is what we want - continue with creation
      // No need to log this as an error since it's expected behavior
    }

    // Create new admin user
    let newUserRecord;
    try {
      const adminAuth = getAdminAuth();
      newUserRecord = await adminAuth.createUser({
        email: email,
        password: password,
        displayName: name || email.split('@')[0],
        emailVerified: true, // Auto-verify admin emails
      });
      
      console.log(`Successfully created new admin user: ${email}`);
    } catch (createError) {
      console.error('Failed to create new user:', createError);
      return NextResponse.json(
        { error: 'Failed to create new user. Please check if the email is valid and password meets requirements (min 6 characters).' },
        { status: 400 }
      );
    }

    // Set admin custom claim
    const adminAuth = getAdminAuth();
    await adminAuth.setCustomUserClaims(newUserRecord.uid, { admin: true });

    // Create user document in Firestore
    const userDocResult = await createUserDocument(newUserRecord.uid, {
      email: newUserRecord.email || email,
      name: name || email.split('@')[0],
      role: 'admin',
      isAdmin: true
      // Removed unnecessary metadata fields
    });

    if (!userDocResult.success) {
      console.error('Failed to create user document:', userDocResult.error);
      // Continue anyway, as the admin user was created successfully
    }

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      uid: newUserRecord.uid,
      email: newUserRecord.email,
      userDocumentCreated: userDocResult.success,
    });

  } catch (error) {
    console.error('Admin setup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
