"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export default function Transactions() {
  const [dateRange, setDateRange] = useState("Jan 6, 2025 - Jan 13, 2025")
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      refId: "234567894234",
      user: "Ibrahim@gmail.com",
      userType: "Subscriber",
      phone: "09167299921",
      service: "Wallet Credit",
      description: "N 1,000 wallet credit for user Ibrahim@gmail.com",
    },
  ])

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Page title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Transactions</h1>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search Transactions"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm flex items-center justify-center whitespace-nowrap">
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
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium flex items-center justify-center hover:bg-indigo-700 transition-colors whitespace-nowrap">
          Next 100 Transactions
        </button>
      </div>

      {/* Transactions table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium">All Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-4 md:px-6 py-3">Ref Id</th>
                <th className="px-4 md:px-6 py-3">User</th>
                <th className="px-4 md:px-6 py-3">User Type</th>
                <th className="px-4 md:px-6 py-3">Phone</th>
                <th className="px-4 md:px-6 py-3">Service</th>
                <th className="px-4 md:px-6 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">{transaction.refId}</td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">{transaction.user}</td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">{transaction.userType}</td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">{transaction.phone}</td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">{transaction.service}</td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">{transaction.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 gap-3">
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
