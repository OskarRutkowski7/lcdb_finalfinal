"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Users, Shield, Menu, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "@/lib/react-utils"
import { useStableCallback } from "@/hooks/use-stable-callback"

// Update the navItems array to only include the requested sections
const navItems = [
  { name: "IDENTITY", href: "/identity", icon: Users },
  { name: "E.G.O.", href: "/ego", icon: Shield },
  { name: "TEAM BUILDER", href: "/team-builder", icon: Users },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Check if sidebar state is stored in localStorage on component mount
  useEffect(() => {
    const storedState = localStorage.getItem("sidebarCollapsed")
    if (storedState !== null) {
      setIsCollapsed(storedState === "true")
    }
  }, [])

  // Save sidebar state to localStorage when it changes
  const toggleCollapse = useStableCallback(() => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem("sidebarCollapsed", String(newState))
  })

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-card border-r border-border transition-all duration-200 ease-in-out md:sticky md:top-0 md:h-screen",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              {isCollapsed ? (
                <span className="font-bold text-xl">LC</span>
              ) : (
                <span className="font-bold text-xl">Limbus Company</span>
              )}
            </Link>

            {/* Integrated collapse toggle button */}
            <Button variant="ghost" size="sm" onClick={toggleCollapse} className="hidden md:flex">
              {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
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
                      isCollapsed ? "justify-center" : "",
                    )}
                    onClick={() => setIsOpen(false)}
                    title={isCollapsed ? item.name : ""}
                  >
                    <Icon className={cn("h-5 w-5", isCollapsed ? "" : "mr-3")} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </aside>
    </>
  )
}
