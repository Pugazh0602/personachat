"use client"

import { Home, Users, MessageSquare, BarChart3, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Personas",
    url: "/personas",
    icon: Users,
  },
  {
    title: "Chat",
    url: "/chat",
    icon: MessageSquare,
  },
  {
    title: "Insights",
    url: "/insights",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-cyber-dark/95 backdrop-blur-sm border-t border-cyber-cyan/20 z-50">
      <div className="flex items-center justify-around py-2 px-4">
        {menuItems.map((item) => (
          <Link 
            key={item.title}
            href={item.url} 
            className={`flex flex-col items-center gap-1 px-3 py-2 transition-all duration-300 group ${
              pathname === item.url 
                ? "text-cyber-cyan" 
                : "text-cyber-grey hover:text-cyber-cyan"
            }`}
          >
            <item.icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">{item.title}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
} 