# 🏡 Zion Property Care

**Premium Property Management & Vacation Rentals Platform**

A modern, enterprise-grade Next.js 15 application built for Sri Lankan vacation rental management with advanced admin-only architecture, Firebase integration, and comprehensive property management features.

## 🚀 Technology Stack

- **Frontend**: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4
- **Backend**: Firebase (Auth, Firestore, Storage), Next.js API Routes
- **UI/UX**: Framer Motion, Lucide Icons, Glass Morphism Design
- **Development**: Turbopack, ESLint, TypeScript Hot Reload
- **Security**: Firebase Custom Claims, httpOnly Cookies, Rate Limiting

## ✨ Key Features

### 🔐 Enterprise Authentication
- **Admin-only access** with Firebase custom claims
- **Rate limiting** (5 attempts per 15-minute window)
- **Secure session management** with httpOnly cookies
- **Middleware protection** for all admin routes

### 🏠 Property Management
- **7-step multi-form wizard** with real-time validation
- **Comprehensive property data** (35+ amenities, multi-platform reviews)
- **Advanced image management** with automatic compression (60-80% size reduction)
- **Google Maps integration** with iframe embedding

### 📅 Booking System
- **Airbnb-style date selection** with guest count validation
- **Admin booking management** with calendar interface
- **WhatsApp integration** for reservation requests
- **Real-time Firebase persistence** with audit trails

### 🎨 Premium UI/UX
- **Glass morphism design** with backdrop blur effects
- **Responsive design** optimized for all devices
- **Professional animations** with Framer Motion
- **Accessibility compliance** (WCAG AA standards)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Firebase project with Auth, Firestore, and Storage enabled
- Google Maps API key (optional, for enhanced maps)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/SathiraDM/zion-website.git
cd zion-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your Firebase and Google Maps credentials
```

4. **Start development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

### Complete Developer Guide
📖 **[AUTH_GUIDE.md](docs/AUTH_GUIDE.md)** - Comprehensive documentation covering:
- Authentication system setup and configuration
- Property management workflows
- Booking system implementation
- Image management and optimization
- Google Maps integration
- UI component library
- Testing and deployment guides

### Environment Setup
All required environment variables and setup instructions are detailed in the main guide.

## 🏗️ Project Structure

```
zion-website/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   ├── components/             # React components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities and configurations
│   └── data/                   # Static data and types
├── docs/                       # Documentation
├── public/                     # Static assets
└── middleware.ts               # Route protection
```

## 🧪 Testing

### Admin User Setup
Create your first admin user:
```bash
curl -X POST http://localhost:3000/api/admin/setup \
  -H "Content-Type: application/json" \
  -H "X-Admin-Setup-Secret: your-setup-secret" \
  -d '{"email": "admin@example.com"}'
```

### API Testing
Import the Postman collection from `docs/postman/` for comprehensive API testing.

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Configuration
- Update all `localhost` references to production domains
- Configure Firebase security rules for production
- Set up proper API key restrictions
- Enable monitoring and analytics

## 📊 Performance

- **Sub-300ms load times** with Next.js 15 optimization
- **60-80% image compression** with minimal quality loss
- **Bundle optimization** with code splitting and tree shaking
- **Core Web Vitals** compliance for excellent UX

## 🔐 Security

- **Enterprise-grade authentication** with Firebase Admin SDK
- **Rate limiting** to prevent brute force attacks
- **Input validation** and sanitization throughout
- **Secure cookie handling** with httpOnly flags
- **Admin-only access control** with custom claims

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for Zion Property Care.

## 📞 Support

For technical support or questions:
- Review the [complete documentation](docs/AUTH_GUIDE.md)
- Check existing issues and discussions
- Contact the development team

---

**Status**: ✅ Production Ready  
**Quality**: Enterprise Grade  
**Architecture**: Scalable & Secure
