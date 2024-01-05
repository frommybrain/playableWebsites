'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import VerifyUser from '../../utils/verifyUser'
import { ChakraProvider } from '@chakra-ui/react'
import Header from '@/components/ui/header'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <VerifyUser />
      <body className={inter.className}>
        <ChakraProvider>
          <Header />
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
