'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import VerifyUser from '../../utils/verifyUser'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <VerifyUser />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
