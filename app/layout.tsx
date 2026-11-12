import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import GradualBlur from '@/components/GradualBlur'
import './globals.css'

export const metadata: Metadata = {
  title: 'Venport — Intelligence for international trade',
  description: 'Venport is building intelligent infrastructure for customs compliance, trade documentation and global trade operations.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48 64x64', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <GradualBlur
          position="bottom"
          target="page"
          height="6rem"
          strength={1.5}
          layers={8}
          curve="ease-out"
          exponential
          opacity={0.85}
          saturation={1}
          tint="rgba(8, 8, 8, 0.35)"
          autoHide
          duration={0.35}
          easing="ease-out"
          zIndex={30}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
