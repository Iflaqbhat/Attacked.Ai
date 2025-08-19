import type { Metadata } from 'next'
import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata: Metadata = {
  title: 'Attacked.AI News – Global Incident Intelligence',
  description: 'Live global incident awareness: cyber, geopolitics, disasters, and infrastructure.',
  icons: {
    icon: 'https://media.licdn.com/dms/image/v2/D560BAQEB9rDkLmZ7gg/company-logo_200_200/company-logo_200_200/0/1729705226338/attacked_ai_logo?e=1758153600&v=beta&t=RjmaFozozTG-QoF8Iintg5iX3dKk2R4cOeFzahdarU0'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrains.variable} bg-neutral-dark text-neutral-light antialiased`}>{children}</body>
    </html>
  )
}
