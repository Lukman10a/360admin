"use client"

import type React from "react"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Bell, CreditCard, LayoutDashboard, LogOut, Mail, Menu, Settings, Users, Wallet, X } from "lucide-react"
import Link from "next/link"
import { useLogout } from "@/services/hooks"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const logoutMutation = useLogout()

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "System Users", icon: Users, path: "/system-users" },
    { name: "Subscribers", icon: Users, path: "/subscribers" },
    { name: "Credit Users", icon: Users, path: "/credit-users" },
    { name: "Services", icon: CreditCard, path: "/services" },
    { name: "Transactions", icon: Wallet, path: "/transactions" },
    { name: "Notifications", icon: Bell, path: "/notifications-management" },
    { name: "Messages", icon: Mail, path: "/messages" },
    { name: "API Settings", icon: Settings, path: "/api-settings" },
    { name: "Site Settings", icon: Settings, path: "/settings" },
  ]

  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") return true
    if (path !== "/dashboard" && pathname.startsWith(path)) return true
    return false
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      // Successful logout - redirect to login
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
      // Force logout even if API call fails - clear local data and redirect
      router.push('/login')
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-20 md:hidden bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 text-indigo-600 font-semibold">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <span className="text-xs">360</span>
          </div>
          <span>360 Data</span>
        </Link>
        <button 
          onClick={toggleSidebar} 
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b md:hidden">
          <Link href="/dashboard" className="flex items-center gap-2 text-indigo-600 font-semibold">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              <span className="text-xs">360</span>
            </div>
            <span>360 Data</span>
          </Link>
          <button 
            onClick={toggleSidebar} 
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b hidden md:block">
          <Link href="/dashboard" className="flex items-center gap-2 text-indigo-600 font-semibold">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              <span className="text-xs">360</span>
            </div>
            <span>360 Data</span>
          </Link>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`flex items-center w-full px-4 py-2 text-sm ${
                    isActive(item.path) ? "text-indigo-600 bg-indigo-50 font-medium" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setSidebarOpen(false)
                    }
                  }}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto border-t">
          <ul className="py-4">
            <li>
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Users className="w-5 h-5 mr-3" />
                <span>Manage Account</span>
              </button>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {logoutMutation.isPending ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-3"></div>
                ) : (
                  <LogOut className="w-5 h-5 mr-3" />
                )}
                <span>{logoutMutation.isPending ? 'Logging out...' : 'Logout'}</span>
              </button>
            </li>
          </ul>

          <div className="p-4 border-t flex items-center">
            <div className="w-8 h-8 rounded-full bg-indigo-100 mr-3 flex items-center justify-center">
              <Users className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Abdulsalam Abdulsalam</p>
              <p className="text-xs text-gray-500 truncate">abdulsalam@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="mb-6 hidden md:flex justify-between items-center p-4 md:p-6 border-b bg-white">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Type a command or search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              aria-label="Search"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <Link href="/notifications-management" className="p-2 text-gray-500 hover:text-indigo-600 transition-colors">
              <Bell className="w-5 h-5" />
            </Link>
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}
