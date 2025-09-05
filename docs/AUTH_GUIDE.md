# 🔐 Authentication Guide - Zion Property Care

Welcome to the complete authentication guide for the Zion Property Care web application. This guide covers everything you need to know about our secure Firebase-based authentication system with comprehensive admin-only access control and advanced property management features.

## 📖 Table of Contents

1. [Overview](#overview)
2. [🚨 Current Access Policy](#-current-access-policy)
3. [Project Structure](#project-structure)
4. [Implementation Details](#implementation-details)
5. [Future Extensibility](#future-extensibility)
6. [Architecture Overview](#architecture-overview)
7. [Authentication Flow](#authentication-flow)
8. [Environment Setup](#environment-setup)
9. [Admin User Management](#admin-user-management)
10. [API Testing with Postman](#api-testing-with-postman)
11. [Frontend Usage](#frontend-usage)
12. [Security Features](#security-features)
13. [Property Management System](#property-management-system)
14. [Advanced Features](#advanced-features)
15. [Troubleshooting](#troubleshooting)

---

## Overview

This project implements a secure, enterprise-grade Firebase-based authentication system designed specifically for **admin-only access** to a comprehensive property management dashboard. The system is built with Next.js 15 App Router, Firebase Admin SDK with custom claims, and follows security best practices including httpOnly cookies, server-side token verification, comprehensive rate limiting, multi-layer protection, and advanced property management capabilities.

### Key System Features

- **Admin-Only Authentication**: Restricted access with Firebase custom claims verification
- **Enterprise Security**: httpOnly cookies, server-side validation, rate limiting, CSRF protection
- **Property Management**: Complete CRUD operations with multi-step forms and image galleries
- **Dynamic Pricing**: Multi-currency support with seasonal pricing rules
- **Advanced Image Management**: Drag-and-drop galleries with automatic compression
- **Content Management**: Amenities, reviews, policies, and house rules management
- **Real-time Validation**: Form validation with React Hook patterns and build optimization

## 🚨 Current Access Policy

**IMPORTANT**: The system currently only allows admin users to log in. Regular users will be denied access with the message: "Access denied. Only administrators can access the system at this time."

This restriction is implemented at multiple levels:
- **API endpoints** (`/api/auth/verify` and `/api/auth/status`) - Server-side admin verification
- **Client-side authentication hooks** (`useAuth`) - Enhanced user interface with admin checks
- **Middleware protection** (`middleware.ts`) - Route-level protection for `/admin/*` paths
- **Property management APIs** - All property operations require admin access
- **Firebase Custom Claims** - Admin privileges verified via Firebase custom claims (`admin: true`)
- **Rate Limiting** - 5 attempts per 15-minute window per IP address to prevent brute force attacks

### Access Levels

- **❌ Regular Users**: Cannot access any admin functionality, redirected with error message
- **✅ Admin Users**: Full access to property management, user administration, and all system features
- **🔒 Unauthenticated**: Redirected to `/admin/login` with return URL preservation

## Project Structure

The authentication system is organized across the following key directories:

### 📁 API Routes (`src/app/api/`)
```
src/app/api/
├── auth/
│   ├── logout/
│   │   └── route.ts          # Logout endpoint with cookie clearing
│   ├── status/
│   │   └── route.ts          # Authentication status check
│   └── verify/
│       └── route.ts          # Token verification and login
├── admin/
│   ├── cleanup-images/
│   │   └── route.ts          # Image cleanup utilities
│   ├── setup/
│   │   └── route.ts          # Admin user creation
│   └── test-image-delete/
│       └── route.ts          # Image deletion testing
├── properties/
│   ├── route.ts              # Property CRUD operations
│   └── [id]/
│       └── route.ts          # Individual property management
└── users/
    ├── route.ts              # User management
    ├── [uid]/
    │   └── route.ts          # Individual user operations
    ├── bulk-delete/
    │   └── route.ts          # Bulk user operations
    └── firestore/
        ├── route.ts          # Firestore user operations
        ├── [uid]/
        │   ├── route.ts      # User document management
        │   └── update-login/
        │       └── route.ts  # Login timestamp updates
        ├── bulk-delete/
        │   └── route.ts      # Bulk Firestore operations
        └── sample-data/
            └── route.ts      # Sample data generation
```

### 📁 Frontend Pages (`src/app/`)
```
src/app/
├── admin/
│   ├── page.tsx              # Admin dashboard
│   ├── test.tsx              # Admin testing page
│   ├── login/
│   │   └── page.tsx          # Admin login form
│   ├── properties/
│   │   └── page.tsx          # Property management interface
│   └── settings/
│       └── page.tsx          # Admin settings panel
├── properties/
│   ├── page.tsx              # Public property listings
│   └── [slug]/
│       └── page.tsx          # Individual property details
└── unauthorized/
    └── page.tsx              # Access denied page
```

### 📁 Authentication Components (`src/components/auth/`)
```
src/components/auth/
├── ProtectedRoute.tsx        # Route protection wrapper
└── UserBadge.tsx            # User status display component
```

### 📁 Authentication Hooks (`src/hooks/`)
```
src/hooks/
├── useAuth.tsx              # Main authentication hook
├── useProperties.ts         # Property data management
└── usePropertiesSecure.ts   # Admin-only property operations
```

### 📁 Authentication Libraries (`src/lib/`)
```
src/lib/
├── auth.ts                  # Client-side Firebase configuration
├── auth-admin.ts            # Server-side admin authentication
├── firebase.ts              # Firebase initialization
├── firestoreUserService.ts  # User document management
└── userService.ts           # User operations
```

### 📁 Admin Components (`src/components/admin/`)
```
src/components/admin/
├── AdminLayout.tsx              # Admin page layout wrapper with navigation
├── AmenitiesSelector.tsx        # Advanced amenities management with categorization
├── FirestoreUserForm.tsx        # Firestore user document management
├── GeneralSettings.tsx          # Site configuration and general settings
├── PricingSection.tsx           # Dynamic pricing configuration with multi-currency
├── PropertyForm.tsx             # Legacy property creation/editing form
├── PropertyFormMultiStep.tsx    # Advanced multi-step property form with validation
├── PropertyFormNew.tsx          # Enhanced property form with modern patterns
├── PropertySettings.tsx         # Property-specific configuration settings
├── PropertyTable.tsx            # Legacy property management table
├── PropertyTableNew.tsx         # Enhanced responsive property table with actions
├── SecuritySettings.tsx         # Security configuration and access control
├── SettingsLayout.tsx           # Settings page layout and navigation
├── UserForm.tsx                 # User creation and editing interface
└── UserManagement.tsx           # Comprehensive user administration panel
```

### 📁 Enhanced UI Components (`src/components/ui/`)
```
src/components/ui/
├── AmenitiesDisplay.tsx                    # Property amenities display with icons
├── CompressedImageUpload.tsx               # Advanced image upload with compression
├── DraggableImageGallery.tsx               # Basic drag-and-drop image management
├── DraggableImageGalleryWithProgress.tsx   # Gallery with upload progress tracking
├── ImageDebugger.tsx                       # Development image debugging tools
├── ImageTester.tsx                         # Image upload testing interface
├── UltimateDragGallery.tsx                 # Advanced gallery with hero selection
├── UnifiedReviewsDisplay.tsx               # Multi-platform review aggregation
├── [Button, Input, Select].tsx             # Core UI component library
└── [Modal, Toast, Loading].tsx             # Feedback and interaction components
```

### 📁 Root Configuration
```
├── middleware.ts            # Next.js middleware for route protection
├── .env.local              # Environment variables (not in repo)
└── docs/
    ├── AUTH_GUIDE.md       # This authentication guide
    └── postman/
        └── [collection]    # Postman API testing collection
```

## Implementation Details

### Enhanced Admin-Only Authentication Flow

1. **User Login**: User attempts to sign in with email/password through the premium `/admin/login` page with glassmorphism design
2. **Firebase Auth**: Firebase validates credentials and returns ID token with user claims
3. **Token Verification**: Server verifies token using Firebase Admin SDK via `/api/auth/verify` endpoint
4. **Admin Check**: Server verifies user has admin custom claims (`admin: true`) in Firebase
5. **Rate Limiting**: System enforces 5 attempts per 15-minute window per IP address with in-memory tracking
6. **Access Control**: Non-admin users are rejected with 403 error and user-friendly message
7. **Session Management**: Only admin users receive secure httpOnly cookies (`admin-token` and `admin-auth`)
8. **User Document**: Admin user data is stored/updated in Firestore with enhanced metadata (last login, roles, etc.)
9. **Middleware Protection**: All `/admin/*` routes protected except `/admin/login` with automatic redirects
10. **Enhanced User State**: Client receives EnhancedUser object with additional properties from Firestore

### Enhanced Error Handling & User Experience

- **Non-admin users**: "Access denied. Only administrators can access the system at this time."
- **Rate limiting**: "Too many authentication attempts. Please try again later."
- **Invalid credentials**: User-friendly Firebase error messages with proper formatting
- **Network issues**: Graceful fallback with loading states and retry mechanisms
- **Session expiry**: Automatic redirect to login with return URL preservation
- **Form validation**: Real-time validation with React Hook patterns and dependency optimization

### Authentication State Management

The system uses an enhanced authentication hook (`useAuth`) that provides:

```typescript
interface EnhancedUser extends User {
  name?: string;           // Display name from Firestore user document
  role?: 'user' | 'admin'; // User role (currently always 'admin' for access)
  isAdmin?: boolean;       // Admin status boolean for UI conditionals
  lastLogin?: Date;        // Last login timestamp for security tracking
  createdAt?: Date;        // Account creation date for analytics
}

// Hook return values with comprehensive state management
const {
  user,              // Enhanced user object with Firestore data
  loading,           // Loading state for UI feedback
  error,             // Error messages with user-friendly formatting
  isAdmin,           // Quick admin check boolean
  signIn,            // Enhanced sign-in with error handling
  signOut,           // Logout with cookie clearing
  clearError         // Manual error clearing for form interactions
} = useAuth();
```

## Future Extensibility

The authentication system is designed to be easily extensible. When you're ready to allow different user types (staff, customers, etc.), you can:

1. Remove the admin-only checks in the API endpoints
2. Update the user role logic in the auth hooks
3. Implement role-based access control for different features
4. Add user registration flows for non-admin users

The foundational infrastructure is already in place to support multiple user roles and permissions.

## Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Next.js API    │    │    Firebase     │
│                 │    │                  │    │                 │
│ /admin/login ───┼───►│ /api/auth/verify ├───►│ Admin SDK       │
│ useAuth Hook    │    │ /api/auth/status │    │ Token Verify    │
│ /admin/* Pages  │◄───┤ /api/auth/logout │    │ Custom Claims   │
│ Property Mgmt   │    │ /api/admin/setup │    │ Firestore       │
│                 │    │ middleware.ts    │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Key Components

- **Frontend**: Next.js 15 App Router with React components
- **Authentication**: Firebase Auth with custom claims for admin access
- **API Layer**: Secure REST endpoints with rate limiting and validation
- **Database**: Firestore for user documents and property management
- **Middleware**: Route protection for admin-only areas
- **Security**: httpOnly cookies, CSRF protection, input validation

---

## Authentication Flow

### 1. User Login Process

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API
    participant FB as Firebase
    
    U->>F: Enter email/password
    F->>FB: signInWithEmailAndPassword()
    FB->>F: Returns ID Token
    F->>A: POST /api/auth/verify {idToken}
    A->>FB: Verify token with Admin SDK
    FB->>A: Token validated + user data
    A->>F: Set httpOnly cookie + response
    F->>U: Redirect to dashboard
```

### 2. Protected Route Access

```mermaid
sequenceDiagram
    participant U as User
    participant M as Middleware
    participant A as API
    participant FB as Firebase
    
    U->>M: Access /admin/*
    M->>A: Check auth cookie
    A->>FB: Verify token with Admin SDK
    FB->>A: Token valid + admin claim
    A->>M: User authorized
    M->>U: Allow access to page
```

### 3. Logout Process

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API
    
    U->>F: Click logout
    F->>A: POST /api/auth/logout
    A->>F: Clear httpOnly cookies
    F->>U: Redirect to login
```

---

## Environment Setup

### Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Firebase Admin SDK Configuration
FIREBASE_ADMIN_PROJECT_ID=your-firebase-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourPrivateKeyHere\n-----END PRIVATE KEY-----"

# Firebase Client Configuration (for frontend)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Admin Setup Security
ADMIN_SETUP_SECRET=your-secure-random-string-for-admin-creation

# Next.js Configuration
NODE_ENV=development
```

### Firebase Service Account Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Project Settings** → **Service Accounts**
4. Click **Generate New Private Key**
5. Download the JSON file
6. Extract the required fields for your `.env.local`

### Important Notes

- The `FIREBASE_ADMIN_PRIVATE_KEY` must include the full key with `\n` characters properly escaped
- `ADMIN_SETUP_SECRET` should be a long, random string for security
- **Both Admin and Client Firebase configs are required** - Admin for server-side operations, Client for frontend authentication
- Never commit `.env.local` to version control
- The environment variable names must match exactly (note `FIREBASE_ADMIN_*` prefix for admin config)
- Firebase client config uses `NEXT_PUBLIC_*` prefix for browser access

---

## Admin User Management

### Creating Admin Users

There are **two ways** to create admin users in this system:

#### Option 1: Using the Admin Setup API (Recommended)

Use the `/api/admin/setup` endpoint with the admin setup secret:

```bash
curl -X POST http://localhost:3000/api/admin/setup \
  -H "Content-Type: application/json" \
  -H "X-Admin-Setup-Key: your-admin-setup-secret" \
  -d '{
    "email": "admin@example.com",
    "name": "John Admin"
  }'
```

This endpoint will:
- Find the user by email in Firebase Auth
- Set admin custom claims
- Create/update user document in Firestore
- Return success confirmation

#### Option 2: Using Firebase Console (Manual)

1. Go to Firebase Console → Authentication → Users
2. Find the user you want to make an admin
3. Set custom claims via Firebase CLI or Admin SDK

```javascript
// Using Firebase Admin SDK
await admin.auth().setCustomUserClaims(uid, { admin: true });
```

### Admin User Features

Admin users have access to:
- **Property Management Dashboard** (`/admin/properties`)
  - Add, edit, delete property listings with multi-step form (`PropertyFormMultiStep.tsx`)
  - Upload and manage property images with advanced drag-and-drop galleries
  - Set pricing, amenities, unified reviews, and detailed property policies
  - Property analytics and performance metrics
  - Advanced image compression and optimization (`UltimateDragGallery.tsx`)
- **Admin Settings** (`/admin/settings`)
  - General site configuration (`GeneralSettings.tsx`)
  - User management capabilities (`UserManagement.tsx`)
  - Security settings and access control (`SecuritySettings.tsx`)
  - Property-specific settings (`PropertySettings.tsx`)
- **Image Management**
  - Advanced drag-and-drop image galleries (`DraggableImageGallery.tsx`)
  - Progressive image upload with compression (`CompressedImageUpload.tsx`)
  - Firebase Storage integration with cleanup utilities
  - Image optimization and debugging tools
- **User Management** (`/admin/settings`)
  - Firestore user document management
  - Bulk user operations and cleanup
  - User authentication status tracking
- **Content Management**
  - Dynamic amenities management (`AmenitiesSelector.tsx`)
  - Unified reviews system (`UnifiedReviewsDisplay.tsx`)
  - Property pricing and availability management
- **Development Tools**
  - Image testing and debugging (`ImageTester.tsx`, `ImageDebugger.tsx`)
  - API testing interface (`/admin/test`)
  - Sample data generation for development

---

## API Testing with Postman

We provide a complete Postman collection for testing all authentication endpoints.

### Collection Setup

1. Import the collection from `docs/postman/`
2. Set environment variables:
   - `baseUrl`: Your application URL (e.g., `http://localhost:3000`)
   - `adminSetupSecret`: Your admin setup secret from `.env.local`

### Available Endpoints

#### Authentication Endpoints

- **POST** `/api/auth/verify` - Verify Firebase ID token and set secure cookies
- **GET** `/api/auth/status` - Check current authentication status and admin privileges  
- **POST** `/api/auth/logout` - Logout and clear secure httpOnly cookies

#### Admin Management

- **POST** `/api/admin/setup` - Create admin users (requires setup secret header)

#### Property Management (Admin Only)

- **GET** `/api/properties` - List all properties with admin data and filters
- **POST** `/api/properties` - Create new property listing with full property data
- **GET** `/api/properties/[id]` - Get specific property details including admin metadata
- **PUT** `/api/properties/[id]` - Update property information, images, and settings
- **DELETE** `/api/properties/[id]` - Delete property listing and associated images

#### User Management (Admin Only)

- **GET** `/api/users` - List all users with authentication status
- **GET** `/api/users/[uid]` - Get specific user details and permissions
- **PUT** `/api/users/[uid]` - Update user information and roles
- **DELETE** `/api/users/[uid]` - Delete user account and associated data
- **POST** `/api/users/bulk-delete` - Bulk user deletion operations
- **GET** `/api/users/firestore` - Firestore user document operations
- **POST** `/api/users/firestore/[uid]/update-login` - Update user login timestamps
- **POST** `/api/users/firestore/sample-data` - Generate sample user data for testing

#### Image & Cleanup APIs

- **POST** `/api/admin/cleanup-images` - Clean up orphaned images in Firebase Storage
- **POST** `/api/admin/test-image-delete` - Test image deletion functionality with safety checks

### Example Usage

1. **Create Admin User**:
   ```json
   POST /api/admin/setup
   Headers: { 
     "X-Admin-Setup-Key": "your-secret",
     "Content-Type": "application/json"
   }
   Body: { 
     "email": "admin@zionpropertycare.com", 
     "name": "Property Manager" 
   }
   ```

2. **Login Verification**:
   ```json
   POST /api/auth/verify
   Headers: { "Content-Type": "application/json" }
   Body: { "idToken": "firebase-id-token-from-client" }
   ```

3. **Check Authentication Status**:
   ```
   GET /api/auth/status
   (Uses httpOnly cookies automatically set from login)
   ```

4. **Property Management**:
   ```json
   POST /api/properties
   Headers: { "Content-Type": "application/json" }
   Body: {
     "title": "Luxury Villa Colombo",
     "slug": "luxury-villa-colombo",
     "address": "Colombo, Sri Lanka",
     "locationUrl": "https://www.google.com/maps/embed?pb=...",
     "type": "villa",
     "maxGuests": 8,
     "bedrooms": 4,
     "bathrooms": 3,
     "pricing": {
       "currency": "USD",
       "defaultPrice": 250,
       "rules": []
     },
     "rating": 4.8,
     "reviewCount": 45,
     "amenities": ["wifi", "pool", "parking", "kitchen"],
     "features": ["Ocean Views", "Private Pool", "Beach Access"],
     "images": {
       "hero": "https://storage.googleapis.com/...",
       "gallery": ["url1", "url2", "url3"]
     },
     "description": "Stunning oceanfront villa...",
     "rules": ["No smoking", "Check-in after 2 PM"],
     "otherRules": "Quiet hours: 10 PM - 8 AM",
     "unifiedReviews": [
       {
         "platform": "google",
         "rating": 4.8,
         "reviewCount": 25,
         "reviewerName": "John Smith",
         "reviewText": "Amazing property!"
       }
     ],
     "policies": {
       "checkIn": "From 2:00 PM\n\nPhoto ID required",
       "checkOut": "12:00 PM (Noon)",
       "cancellationPrepayment": "Free cancellation up to 48 hours"
     }
   }
   ```

5. **User Management**:
   ```json
   GET /api/users
   (Returns list of all users with authentication status)
   
   POST /api/users/firestore/sample-data
   (Generates sample user data for development)
   ```

6. **Image Cleanup**:
   ```json
   POST /api/admin/cleanup-images
   (Removes orphaned images from Firebase Storage with safety checks)
   ```

---

## Frontend Usage

### Using the useAuth Hook

The `useAuth` hook provides complete authentication state management:

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, loading, error, isAdmin, signIn, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <LoginForm onSignIn={signIn} />;

  return (
    <div>
      <h1>Welcome, {user.name || user.email}!</h1>
      {isAdmin && <AdminPanel />}
      <button onClick={signOut}>Logout</button>
    </div>
  );
}
```

### Enhanced User Object

The `useAuth` hook provides an enhanced user object with additional properties from Firestore:

```typescript
interface EnhancedUser extends User {
  name?: string;           // Display name from Firestore user document
  role?: 'user' | 'admin'; // User role (currently always 'admin' for access)
  isAdmin?: boolean;       // Admin status boolean
  lastLogin?: Date;        // Last login timestamp 
  createdAt?: Date;        // Account creation date
}

// Usage in components
const { user, loading, error, isAdmin, signIn, signOut } = useAuth();
```

### Protected Routes

Use the `ProtectedRoute` component to protect admin pages:

```typescript
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

function AdminDashboard() {
  return (
    <ProtectedRoute requireAdmin fallbackUrl="/admin/login">
      <div className="admin-dashboard">
        <h1>Property Management Dashboard</h1>
        {/* Admin content */}
      </div>
    </ProtectedRoute>
  );
}

// Alternative: Direct usage in page components
export default function AdminPropertiesPage() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout>
        <PropertyTable />
      </AdminLayout>
    </ProtectedRoute>
  );
}
```

### Middleware Protection

All `/admin/*` routes are automatically protected by Next.js middleware:

```typescript
// middleware.ts automatically protects:
// ✅ /admin/properties
// ✅ /admin/settings  
// ✅ /admin (dashboard)
// ❌ /admin/login (public for authentication)

// Middleware checks:
// 1. Validates httpOnly admin-token cookie
// 2. Verifies token with Firebase Admin SDK
// 3. Confirms user has admin custom claims
// 4. Redirects unauthorized users to /admin/login
```

### Login Form Integration

```typescript
'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loading, error } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      // Redirect happens automatically after successful login
      router.push('/admin/properties');
    } catch (err) {
      console.error('Login failed:', err);
      // Error is handled by useAuth hook
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="text-sm text-gray-600">
            Property Management Dashboard
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In to Dashboard'}
          </button>
          
          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
```

---

## Security Features

### 🔒 Core Security Measures

1. **httpOnly Cookies**: Authentication tokens stored in secure, httpOnly cookies (`admin-token`)
2. **Server-Side Verification**: All tokens verified server-side using Firebase Admin SDK
3. **Firebase Admin SDK**: Secure token validation and custom claims verification
4. **Custom Claims**: Admin role-based access control via Firebase custom claims
5. **Middleware Protection**: Route-level security for all `/admin/*` paths
6. **CSRF Protection**: SameSite cookie policies and secure headers
7. **Rate Limiting**: 5 attempts per 15-minute window per IP address
8. **Input Validation**: Server-side request validation and sanitization

### 🛡️ Authentication Security

- **Token Expiration**: Firebase ID tokens with 1-hour lifetime
- **Automatic Refresh**: Silent token renewal handled by Firebase SDK
- **Secure Storage**: No tokens stored in localStorage or sessionStorage  
- **Admin-Only Access**: Restricted to admin users with custom claims
- **IP-Based Rate Limiting**: Protection against brute force attacks
- **Error Obfuscation**: Generic error messages to prevent user enumeration

### 🔐 Data Protection

- **Firestore Security Rules**: Database-level protection for user documents
- **Environment Variables**: Sensitive credentials in secure env files
- **Service Account**: Least privilege Firebase Admin access
- **Input Validation**: Server-side request validation and sanitization
- **Image Security**: Secure Firebase Storage with proper access controls
- **API Authorization**: Admin verification for all management endpoints

### 🚨 Error Handling & Monitoring

- **Graceful Degradation**: Proper error boundaries and fallbacks
- **Security Logging**: Authentication event logging (success/failure)
- **User-Friendly Messages**: Clear error messages without exposing internals
- **Fail Secure**: Default deny policies for all protected resources
- **Rate Limit Tracking**: In-memory tracking of failed attempts per IP

---

## Property Management System

The authentication system provides access to a comprehensive property management platform with advanced features:

### 🏠 Multi-Step Property Creation (`PropertyFormMultiStep.tsx`)

**Purpose**: Comprehensive property creation and editing with step-by-step validation

**Features**:
- **Basic Details**: Property title, type, location, guest capacity, bedrooms/bathrooms
- **Location Integration**: Google Maps iframe embedding with URL validation
- **Dynamic Pricing**: Multi-currency support (USD, LKR, EUR, GBP) with seasonal rules
- **Amenities Management**: Categorized amenities with search and filtering capabilities
- **Image Gallery**: Hero image selection with drag-and-drop reordering (`UltimateDragGallery`)
- **Property Features**: Additional selling points and unique characteristics
- **House Rules**: Guest behavioral guidelines and property policies
- **Detailed Policies**: Check-in/out procedures, cancellation terms, payment policies
- **Additional Notes**: Special instructions and important information

**State Management**: 
- React Hook form validation with optimized dependencies (no unnecessary re-renders)
- Multi-step progress tracking with validation checkpoints
- Automatic data persistence and draft saving

### 💰 Dynamic Pricing System

**Multi-Currency Support**:
```typescript
interface PricingData {
  currency: 'USD' | 'LKR' | 'EUR' | 'GBP';
  defaultPrice: number;
  rules: PricingRule[];
}

// Currency symbol mapping for display
const currencySymbols = {
  USD: '$',
  LKR: '₨', 
  EUR: '€',
  GBP: '£'
};
```

**Features**:
- Base pricing with currency selection
- Seasonal pricing rules and special rates
- Automatic currency symbol display throughout the application
- Dynamic pricing calculations based on admin-configured rules

### 🖼️ Advanced Image Management

**UltimateDragGallery Component**:
- Drag-and-drop file upload with real-time progress tracking
- Automatic image compression and optimization (`imageCompression.ts`)
- Hero image designation and gallery reordering
- Firebase Storage integration with secure URL generation
- Progressive upload with error handling and retry mechanisms
- Image validation (format, size, dimensions)

**Image Compression Pipeline**:
- Smart compression with transparency detection
- Progressive JPEG conversion with quality tiers
- Optimized file sizes while maintaining visual quality
- Batch processing for multiple image uploads

### 📝 Content Management Features

**Unified Reviews System**:
- Multi-platform review aggregation (Google, Booking.com, Airbnb)
- Real-time review statistics and rating calculations
- Admin-curated review display with quality control
- **Conditional rendering**: Reviews section hidden when no admin reviews exist

**Advanced Amenities Management**:
- Categorized amenities with search functionality
- Icon mapping and visual representation
- Custom amenity creation and management
- Bulk amenity operations for property batches

**Property Policies Management**:
- Customizable check-in/check-out procedures
- Flexible cancellation and prepayment terms
- House rules with behavioral guidelines
- Special instructions and important notes

### 📊 Property Administration

**PropertyTableNew Component**:
- Responsive property overview with sorting and filtering
- Quick edit capabilities with inline editing
- Bulk operations (delete, update, status changes)
- Property analytics and performance metrics
- Export functionality for reporting

**Admin Dashboard Features**:
- Property performance analytics
- Image storage usage and optimization reports
- User activity tracking and login statistics
- System health monitoring and error tracking

---

## Advanced Features

### 🔧 Development and Testing Tools

**Image Testing Interface** (`ImageTester.tsx`, `ImageDebugger.tsx`):
- Real-time image upload testing and validation
- Compression quality comparison tools
- Firebase Storage debugging utilities
- Performance monitoring for image operations

**API Testing Integration**:
- Comprehensive Postman collection for all endpoints
- Sample data generation for development (`/api/users/firestore/sample-data`)
- Image cleanup utilities (`/api/admin/cleanup-images`)
- Bulk operations testing for user and property management

### 🎨 Premium UI/UX Design System

**Design Tokens**:
- Light theme optimization with premium color palette
- Inter typography with semantic sizing scale
- Glass morphism effects with backdrop blur
- Consistent 8px spacing grid with responsive breakpoints

**Component Architecture**:
- Domain-driven organization with theme-based utilities
- Accessible design patterns (WCAG AA compliance)
- Framer Motion animations for premium feel
- Mobile-first responsive design with progressive enhancement

**Interactive Patterns**:
- Smooth form transitions with validation feedback
- Loading states with skeleton patterns
- Error boundaries with graceful degradation
- Toast notifications with action capabilities

### 🛠️ Build Optimization & Performance

**React Hook Optimization**:
- Proper dependency arrays to prevent unnecessary re-renders
- Optimized useCallback and useMemo usage
- Form validation with minimal state updates
- Efficient image loading with Next.js Image optimization

**Turbopack Integration**:
- Fast development builds with `npm run dev --turbopack`
- Hot module replacement for rapid development
- Optimized production builds with tree shaking

**Code Quality Enforcement**:
- ESLint rules with React Hooks exhaustive deps
- TypeScript strict mode with proper type definitions
- Automated testing for critical authentication flows

---

## Troubleshooting

### Common Issues

#### 1. "Authentication failed" Error

**Problem**: Generic authentication failure during login

**Solutions**:
- Check if user exists in Firebase Auth console
- Verify user has admin custom claims set (`admin: true`)
- Check Firebase project configuration in environment variables
- Ensure service account has correct permissions (Auth Admin, Firestore)
- Verify client-side Firebase config is correct

#### 2. "Only administrators can access" Error  

**Problem**: User exists but lacks admin privileges

**Solutions**:
- Use admin setup API to grant admin rights: `POST /api/admin/setup`
- Check custom claims in Firebase Console → Authentication → Users
- Verify `ADMIN_SETUP_SECRET` matches in API request headers
- Ensure user document exists in Firestore with admin role

#### 3. "Invalid token" Error

**Problem**: Firebase token validation issues

**Solutions**:
- Check token expiration (Firebase tokens expire after 1 hour)
- Verify `FIREBASE_ADMIN_PROJECT_ID` matches your Firebase project
- Ensure `FIREBASE_ADMIN_PRIVATE_KEY` is properly formatted with `\n` newlines
- Check `FIREBASE_ADMIN_CLIENT_EMAIL` is from correct service account
- Verify network connectivity to Firebase services

#### 4. Cookie/Session Issues

**Problem**: Authentication cookies not working properly

**Solutions**:
- Check browser developer tools → Application → Cookies for `admin-token`
- Verify SameSite and Secure cookie settings for your environment
- Ensure HTTPS in production (required for secure cookies)
- Clear all browser cookies and localStorage for your domain
- Check if browser is blocking third-party cookies

#### 5. Environment Variable Issues

**Problem**: Missing or incorrect environment variables

**Solutions**:
- Check `.env.local` file exists in project root
- Verify all required variables are set (both `FIREBASE_ADMIN_*` and `NEXT_PUBLIC_FIREBASE_*`)
- Check private key formatting includes proper `\n` characters
- Restart development server after environment changes
- Ensure environment variable names match exactly (case-sensitive)

#### 6. Rate Limiting Issues

**Problem**: "Too many authentication attempts" error

**Solutions**:
- Wait 15 minutes for rate limit window to reset
- Check if multiple users sharing same IP address
- Clear rate limit in development by restarting server
- Consider adjusting rate limit settings for your environment

#### 7. Middleware/Routing Issues

**Problem**: Unexpected redirects or access denied on admin pages

**Solutions**:
- Check middleware.ts configuration
- Verify route patterns match your admin URLs
- Ensure `/admin/login` is excluded from middleware protection
- Check Next.js App Router configuration
- Verify user is properly redirected after login

### Development Tips

1. **Use Browser DevTools**: 
   - Check Network tab for API calls and response codes
   - Monitor Application tab for cookies and localStorage
   - Watch Console for authentication errors and Firebase warnings

2. **Check Console Logs**: 
   - Look for authentication errors in browser console
   - Monitor server logs for API endpoint issues
   - Watch for Firebase SDK initialization problems

3. **Verify Cookies**: 
   - Use Application tab to inspect `admin-token` httpOnly cookie
   - Check cookie expiration and security settings
   - Verify cookie domain and path settings

4. **Test with Postman**: 
   - Use provided collection for API testing
   - Test admin setup endpoint independently
   - Verify token verification without browser dependencies

5. **Check Firebase Console**: 
   - Verify user data and custom claims in Authentication section
   - Monitor Firestore user documents
   - Check project settings and service account permissions

6. **Environment Debugging**:
   - Use `console.log` to verify environment variables are loaded
   - Test Firebase initialization in isolation
   - Verify both client and admin SDK configurations

### Production Checklist

- [ ] All environment variables configured in production environment
- [ ] Firebase security rules updated and tested
- [ ] HTTPS enabled and SSL certificates valid
- [ ] Secure cookie settings configured (`Secure: true`, `SameSite: 'strict'`)
- [ ] Admin users created and tested
- [ ] API rate limiting configured and tested
- [ ] Error monitoring and logging setup (e.g., Sentry, LogRocket)
- [ ] Backup authentication method available
- [ ] Firebase project billing and quotas configured
- [ ] Security headers configured in production
- [ ] Database backup strategy implemented
- [ ] Image storage cleanup policies configured

---

## Additional Resources

### Firebase Documentation
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Custom Claims](https://firebase.google.com/docs/auth/admin/custom-claims)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

### Next.js Resources
- [Next.js 15 Authentication](https://nextjs.org/docs/app/building-your-application/authentication)
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [App Router](https://nextjs.org/docs/app/building-your-application/routing)

### Security Best Practices
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [JWT Security Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

### Property Management Features

The property management system includes several sophisticated components for admin control:

#### Multi-Step Property Form (`PropertyFormMultiStep.tsx`)
- **Purpose**: Comprehensive property creation/editing with step-by-step validation
- **Features**: 
  - Basic Details (title, type, location, capacity)
  - Location Mapping (Google Maps integration with iframe embeds)
  - Dynamic Pricing Configuration (multi-currency with seasonal rules)
  - Advanced Amenities Selection (categorized with search and filtering)
  - Image Gallery Management (hero image selection, drag-and-drop reordering)
  - Property Features (additional selling points)
  - House Rules (behavioral guidelines for guests)
  - Policies (check-in/out procedures, cancellation terms)
  - Additional Notes (special instructions)
- **State Management**: Multi-step form with React Hook optimization and build-safe validation
- **Recent Updates**: Fixed React Hook exhaustive-deps warning for production builds

#### Property Table (`PropertyTableNew.tsx`)
- **Purpose**: Admin dashboard for property overview and management
- **Features**: Responsive table with sorting, editing, and deletion
- **Security**: Admin-only access with comprehensive error handling

#### Gallery Management (`UltimateDragGallery.tsx`)
- **Purpose**: Advanced image upload and organization system
- **Features**: 
  - Drag-and-drop file upload with real-time progress tracking
  - Hero image designation and intuitive reordering
  - Automatic image compression and optimization
  - Real-time preview with comprehensive validation

#### Content Management Features
- **Dynamic Property Policies**: Customizable check-in/out and cancellation terms
- **Unified Review System**: Multi-platform integration with calculated statistics
- **Advanced Amenities**: Categorized structure with search functionality
- **Dynamic Pricing**: Multi-currency support (USD $, LKR ₨, EUR €, GBP £) replacing hardcoded values
- **Conditional Reviews**: Reviews section automatically hidden when no admin reviews exist

#### Recent System Enhancements
- **Build Optimization**: Fixed React Hook dependency warnings for production builds
- **Dynamic Pricing**: Replaced hardcoded pricing with admin-configured values
- **Conditional Content**: Reviews section now hides when no admin reviews are added
- **Currency Support**: Full multi-currency integration with proper symbol display
- **Performance**: Optimized React Hook patterns for efficient re-rendering

#### Additional Resources
- [Image Compression and Optimization](../src/lib/imageCompression.ts)
- [Property Data Management](../src/data/properties.ts)
- [Admin Components](../src/components/admin/)
- [Multi-Step Form Implementation](../src/components/admin/PropertyFormMultiStep.tsx)
- [Property Pricing System](../src/components/admin/PricingSection.tsx)

---

**Need help?** Check the troubleshooting section above or create an issue in the repository.

**Project Info**: Zion Property Care - Premium Sri Lankan Vacation Rental Platform  
**Tech Stack**: Next.js 15, Firebase Admin SDK, Tailwind CSS, TypeScript, Framer Motion  
**Last Updated**: December 2024 - Comprehensive authentication system with advanced property management
