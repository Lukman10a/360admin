'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getAuthToken } from '@/services/api/client'

interface AuthWrapperProps {
  children: React.ReactNode
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      const token = getAuthToken()
      const isAuth = !!token
      setIsAuthenticated(isAuth)
      setIsLoading(false)

      // If not authenticated and not on login page, redirect to login
      if (!isAuth && pathname !== '/login') {
        router.push('/login')
        return
      }

      // If authenticated and on login page, redirect to dashboard
      if (isAuth && pathname === '/login') {
        router.push('/')
        return
      }
    }

    checkAuth()
  }, [pathname, router])

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  // If on login page, show without auth check
  if (pathname === '/login') {
    return <>{children}</>
  }

  // If authenticated, show the protected content
  if (isAuthenticated) {
    return <>{children}</>
  }

  // If not authenticated and not on login page, show loading (will redirect)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  )
} 