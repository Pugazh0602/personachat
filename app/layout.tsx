"use client"

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { BottomNav } from "@/components/bottom-nav"
import { Toaster } from "@/components/ui/toaster"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const showBottomNav = pathname !== '/chat'

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={`min-h-screen w-full ${showBottomNav ? "pb-20" : ""}`}>
          <main className="flex-1">{children}</main>
        </div>
        {showBottomNav && <BottomNav />}
        <Toaster />
      </body>
    </html>
  )
}
