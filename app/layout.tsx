
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'First CRUD App',
  description: 'Application CRUD complète avec Next.js, Prisma et PostgreSQL',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}