import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../components/providers/AuthProvider'
import "easymde/dist/easymde.min.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sanjeevini - Western Ghats Medicinal Plants',
  description: 'Discover traditional plants of Western Ghats - cultivation tips & medicinal properties',
  icons: {
    icon: '/sanjeevini-favicon.png',
    shortcut: '/sanjeevini-favicon.png',
    apple: '/sanjeevini-favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/sanjeevini-favicon.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
