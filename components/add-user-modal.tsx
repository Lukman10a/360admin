"use client"

import type React from "react"

import { useState } from "react"
import { Check } from "lucide-react"

interface AddUserModalProps {
  isOpen: boolean
  onClose: () => void
  onAddUser: (user: {
    fullName: string
    username: string
    password: string
    role: string
  }) => void
}

export default function AddUserModal({ isOpen, onClose, onAddUser }: AddUserModalProps) {
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("Super Admin")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddUser({
      fullName,
      username,
      password,
      role,
    })
    // Reset form
    setFullName("")
    setUsername("")
    setPassword("")
    setRole("Super Admin")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-60">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Enter your full name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Enter your username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Account Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-6 relative">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Document Type
            </label>
            <button
              type="button"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {role}
              <svg
                className={`w-5 h-5 transition-transform ${isDropdownOpen ? "transform rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                <div className="py-1">
                  <div className="px-3 py-2 text-sm text-gray-700">Select Document Type</div>
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      setRole("Super Admin")
                      setIsDropdownOpen(false)
                    }}
                  >
                    {role === "Super Admin" && <Check className="w-4 h-4 mr-2" />}
                    <span>Super admin</span>
                  </button>
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      setRole("Asst. Admin")
                      setIsDropdownOpen(false)
                    }}
                  >
                    {role === "Asst. Admin" && <Check className="w-4 h-4 mr-2" />}
                    <span>Asst. Admin</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add user
          </button>
        </form>
      </div>
    </div>
  )
}
