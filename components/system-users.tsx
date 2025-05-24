"use client"

import { useState } from "react"
import { AlertTriangle, ArrowDown, Plus, Search } from "lucide-react"
import AddUserModal from "./add-user-modal"

export default function SystemUsers() {
  const [dateRange, setDateRange] = useState("Jan 6, 2025 - Jan 13, 2025")
  const [showPassword, setShowPassword] = useState<Record<number, boolean>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [users, setUsers] = useState([
    {
      id: 1,
      fullName: "Ahmad Ibrahim",
      role: "Super Admin",
      username: "Admin",
      password: "••••",
      status: "Active",
    },
    {
      id: 2,
      fullName: "Ahmad Ibrahim",
      role: "Super Admin",
      username: "Admin",
      password: "••••",
      status: "Active",
    },
  ])

  const togglePasswordVisibility = (userId: number) => {
    setShowPassword((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }))
  }

  const handleAddUser = (user: { fullName: string; username: string; password: string; role: string }) => {
    const newUser = {
      id: users.length + 1,
      fullName: user.fullName,
      role: user.role,
      username: user.username,
      password: "••••",
      status: "Active",
    }
    setUsers([...users, newUser])
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Page title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">System Users</h1>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search for system users"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm flex items-center justify-center">
          {dateRange}
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm flex items-center justify-center">
          <span className="mr-2">Filters</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 8H12M2 4H14M6 12H10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium flex items-center justify-center hover:bg-indigo-700 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </button>
      </div>

      {/* Users table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-medium">All system users</h3>
          <button className="text-gray-400 hover:text-gray-500">
            <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Password</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 flex items-center">
                  Action
                  <ArrowDown className="ml-1 w-3 h-3" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.fullName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.username}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span>{showPassword[user.id] ? "password123" : user.password}</span>
                      <button
                        className="text-xs text-indigo-600 hover:text-indigo-800"
                        onClick={() => togglePasswordVisibility(user.id)}
                      >
                        {showPassword[user.id] ? "Hide password" : "Show password"}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-600 mr-2"></div>
                      <span className="text-sm text-green-600">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center text-sm text-red-600 hover:text-red-800">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Block user
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">Page 1 of 10</div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm" disabled>
              Previous
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm">Next</button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddUser={handleAddUser} />
    </div>
  )
}
