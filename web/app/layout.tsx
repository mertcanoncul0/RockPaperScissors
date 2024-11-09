import type { Metadata } from 'next'
import { Barlow_Semi_Condensed } from 'next/font/google'
import { AuthProvider } from '@/components/provider/auth-provider'

import './globals.css'
import Header from '@/components/header'

const font = Barlow_Semi_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Rock Paper Scissors',
  description: 'Rock Paper Scissors Game',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${font.className} antialiased bg-body-gradient pt-4 lg:pt-8 min-h-screen`}
      >
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
