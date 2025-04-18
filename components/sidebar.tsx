"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Users, Shield, Menu, X } from "lucide-react"
import { useState } from "react"

// Update the navItems array to only include the requested sections
const navItems = [
  { name: "IDENTITY", href: "/identity", icon: Users },
  { name: "E.G.O.", href: "/ego", icon: Shield },
  { name: "TEAM BUILDER", href: "/team-builder", icon: Users },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">Limbus Company</span>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      pathname === item.href || pathname.startsWith(`${item.href}/`)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-primary/5",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-border">
            <Link href="/donate">
              <Button variant="outline" className="w-full">
                Donate
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
