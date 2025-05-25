'use client'

import { useState } from 'react'
import { useSystemUsers, useCreateSystemUser } from '@/services/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * Example component demonstrating API integration
 * 
 * This shows how to:
 * 1. Fetch data with useQuery hooks
 * 2. Create data with useMutation hooks
 * 3. Handle loading and error states
 * 4. Display data in the UI
 */
export default function ApiExample() {
  const [newUserName, setNewUserName] = useState('')
  const [newUserEmail, setNewUserEmail] = useState('')

  // Fetch system users with React Query
  const { 
    data: users, 
    isLoading, 
    error, 
    refetch 
  } = useSystemUsers({ page: 1, limit: 5 })

  // Create user mutation
  const createUserMutation = useCreateSystemUser()

  const handleCreateUser = async () => {
    if (!newUserName || !newUserEmail) return

    try {
      await createUserMutation.mutateAsync({
        fullName: newUserName,
        username: newUserName.toLowerCase().replace(/\s+/g, ''),
        email: newUserEmail,
        password: 'password123', // In real app, generate secure password
        role: 'Admin'
      })
      
      // Clear form
      setNewUserName('')
      setNewUserEmail('')
      
      // Show success message (in real app, use toast)
      alert('User created successfully!')
      
    } catch (error: any) {
      // Handle error (in real app, use proper error handling)
      alert(`Failed to create user: ${error.message}`)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Integration Example</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
          {/* Create User Form */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Create New User</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Full Name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
              <Input
                placeholder="Email"
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
              <Button 
                onClick={handleCreateUser}
                disabled={createUserMutation.isPending || !newUserName || !newUserEmail}
              >
                {createUserMutation.isPending ? 'Creating...' : 'Create User'}
              </Button>
            </div>
          </div>

          {/* Users List */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">System Users</h3>
              <Button variant="outline" onClick={() => refetch()}>
                Refresh
              </Button>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading users...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">
                  Error loading users: {error.message}
                </p>
                <p className="text-sm text-red-600 mt-1">
                  This is expected if the backend API is not running.
                </p>
              </div>
            )}

            {/* Success State */}
            {users && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Total users: {users.meta?.total || users.data.length}
                </p>
                <div className="grid gap-2">
                  {users.data.map((user) => (
                    <div 
                      key={user.id} 
                      className="border rounded-lg p-3 bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{user.fullName}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">
                            Role: {user.role} | Status: {user.status}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Data State */}
            {users && users.data.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No users found
              </div>
            )}
          </div>

          {/* API Status Info */}
          <div className={`border rounded-lg p-4 ${
            process.env.NEXT_PUBLIC_API_BASE_URL 
              ? 'bg-green-50 border-green-200' 
              : 'bg-yellow-50 border-yellow-200'
          }`}>
            <h4 className={`font-medium mb-2 ${
              process.env.NEXT_PUBLIC_API_BASE_URL 
                ? 'text-green-800' 
                : 'text-yellow-800'
            }`}>
              API Integration Status
            </h4>
            <div className={`text-sm space-y-1 ${
              process.env.NEXT_PUBLIC_API_BASE_URL 
                ? 'text-green-700' 
                : 'text-yellow-700'
            }`}>
              <p>✅ Axios client configured</p>
              <p>✅ React Query hooks ready</p>
              <p>✅ TypeScript types defined</p>
              <p>✅ Error handling implemented</p>
              <p>✅ Mock data fallback active</p>
              {process.env.NEXT_PUBLIC_API_BASE_URL ? (
                <p className="text-green-600 font-medium">
                  🟢 Connected to API: {process.env.NEXT_PUBLIC_API_BASE_URL}
                </p>
              ) : (
                <p className="text-yellow-600 font-medium">
                  🟡 Using mock data - Set NEXT_PUBLIC_API_BASE_URL in .env.local to connect to real API
                </p>
              )}
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  )
} 