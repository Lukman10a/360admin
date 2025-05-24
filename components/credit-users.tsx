"use client"

import type React from "react"

import { useState } from "react"
import { Check } from "lucide-react"

type FormState = "form" | "processing" | "success"

export default function CreditUsers() {
  const [formState, setFormState] = useState<FormState>("form")
  const [email, setEmail] = useState("")
  const [action, setAction] = useState("")
  const [amount, setAmount] = useState("")
  const [reason, setReason] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [transactionDetails, setTransactionDetails] = useState({
    amount: "",
    oldBalance: "",
    newBalance: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("processing")

    // Simulate API call
    setTimeout(() => {
      setTransactionDetails({
        amount: `N${amount}`,
        oldBalance: "N0",
        newBalance: `N${amount}`,
      })
      setFormState("success")
    }, 2000)
  }

  const resetForm = () => {
    setEmail("")
    setAction("")
    setAmount("")
    setReason("")
    setFormState("form")
  }

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      {/* Page title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Credit User</h1>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {formState === "form" && (
          <div className="p-6">
            <h2 className="text-lg font-medium mb-6">Credit/Debit User Wallet</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    User Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="user@example.com"
                    required
                  />
                </div>

                <div className="relative">
                  <label htmlFor="action" className="block text-sm font-medium text-gray-700 mb-1">
                    Action
                  </label>
                  <button
                    type="button"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {action || "Select action"}
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
                            setAction("Credit")
                            setIsDropdownOpen(false)
                          }}
                        >
                          {action === "Credit" && <Check className="w-4 h-4 mr-2" />}
                          <span>Credit</span>
                        </button>
                        <button
                          type="button"
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center"
                          onClick={() => {
                            setAction("Debit")
                            setIsDropdownOpen(false)
                          }}
                        >
                          {action === "Debit" && <Check className="w-4 h-4 mr-2" />}
                          <span>Debit</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g 100"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for action
                  </label>
                  <input
                    type="text"
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Reason"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Upgrade Wallet
                </button>
              </div>
            </form>
          </div>
        )}

        {formState === "processing" && (
          <div className="p-6 flex justify-center">
            <button
              disabled
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md flex items-center justify-center"
            >
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing
            </button>
          </div>
        )}

        {formState === "success" && (
          <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white">
                <Check className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Operation Successful</h2>
            <div className="text-center text-gray-600 space-y-1 mb-8">
              <p>Account credited with {transactionDetails.amount}.</p>
              <p>Old balance is {transactionDetails.oldBalance}.</p>
              <p>New Balance is {transactionDetails.newBalance}.</p>
            </div>
            <button onClick={resetForm} className="text-indigo-600 hover:text-indigo-800 font-medium">
              Back to form
            </button>
            <div className="absolute bottom-4 text-center text-sm text-gray-500 w-full left-0">
              © 2025 360 Data. Designed by Rykelabs
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
