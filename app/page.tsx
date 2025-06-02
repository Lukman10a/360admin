'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAuthToken } from '@/services/api/client'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = getAuthToken()
    if (token) {
      // If authenticated, go to dashboard
      router.push('/dashboard')
    } else {
      // If not authenticated, go to login
      router.push('/login')
    }
  }, [router])

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p className="text-sm text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
}
