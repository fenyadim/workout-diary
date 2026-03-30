import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Toaster } from '@/shared/ui/sonner'

import './globals.css'

const interFont = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const syncFont = Syne({
  variable: '--font-heading-stack',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Workdi — дневник тренировок',
  description: 'Создавай программы, тренируйся с партнёром, следи за результатами',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className={cn(interFont.variable, syncFont.variable, 'min-h-full')}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
