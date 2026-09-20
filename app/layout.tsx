import type {Metadata} from 'next'
import './globals.css'
import {Providers} from './providers'

export const metadata: Metadata = {
  title: 'Adiel Creatives',
  description: 'A faceless outfit recommendation studio. Curated drops, premium taste.',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
