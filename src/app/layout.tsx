import type { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import { AuthProvider } from '@/hooks/useAuth'
import { BUSINESS_INFO, SITE_CONFIG } from '@/lib/constants'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://zionpropertycare.com'),
  title: {
    default: SITE_CONFIG.title,
    template: SITE_CONFIG.titleTemplate
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: BUSINESS_INFO.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: SITE_CONFIG.defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${BUSINESS_INFO.name} Logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.defaultOgImage],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="overflow-x-hidden" suppressHydrationWarning={true}>
        <AuthProvider>
          <Layout>
            {children}
          </Layout>
        </AuthProvider>
      </body>
    </html>
  )
}
