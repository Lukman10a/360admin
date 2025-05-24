"use client"

import { useState } from "react"
import { ArrowDown, ChevronRight, Search, Trash2 } from "lucide-react"
import Link from "next/link"

export default function Notifications() {
  const [dateRange, setDateRange] = useState("Jan 6, 2025 - Jan 13, 2025")

  const notifications = [
    {
      id: 1,
      product: "Airtime TopUp",
      description: "Mtn ₦500 airtime top up",
      amount: "₦400",
      date: "Jan 13, 2025",
      status: "Processing",
    },
    {
      id: 2,
      product: "Airtime TopUp",
      description: "Airtel ₦200 airtime top up",
      amount: "₦200",
      date: "Jan 13, 2025",
      status: "Success",
    },
    {
      id: 3,
      product: "Data Bundle",
      description: "Mtn 5GB data Bundle",
      amount: "₦4900",
      date: "Jan 13, 2025",
      status: "Success",
    },
    {
      id: 4,
      product: "Electricity",
      description: "IBEDC prepaid",
      amount: "₦1850",
      date: "Jan 13, 2025",
      status: "Declined",
    },
    {
      id: 5,
      product: "Airtime Conversion",
      description: "Square, Inc.",
      amount: "₦5000",
      date: "Jan 12, 2025",
      status: "Success",
    },
    {
      id: 6,
      product: "Data Bundle",
      description: "Mtn 5GB data Bundle",
      amount: "₦2000",
      date: "Jan 12, 2025",
      status: "Success",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
        return "text-green-600"
      case "Processing":
        return "text-blue-600"
      case "Declined":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusDot = (status) => {
    switch (status) {
      case "Success":
        return "bg-green-600"
      case "Processing":
        return "bg-blue-600"
      case "Declined":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-gray-500 hover:text-indigo-600">
          Dashboard
        </Link>
        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
        <span className="text-gray-900 font-medium">Notifications</span>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search for notifications"
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
      </div>

      {/* Notifications table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium">All notifications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3 flex items-center">
                  Transaction date
                  <ArrowDown className="ml-1 w-3 h-3" />
                </th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 sr-only">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <tr key={notification.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <div>
                        <div className="font-medium text-gray-900">{notification.product}</div>
                        <div className="text-sm text-gray-500">{notification.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{notification.amount}</td>
                  <td className="px-6 py-4 text-sm">{notification.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${getStatusDot(notification.status)}`}></div>
                      <span className={`text-sm ${getStatusColor(notification.status)}`}>{notification.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-red-600">
                      <Trash2 className="w-5 h-5" />
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
    </div>
  )
}
