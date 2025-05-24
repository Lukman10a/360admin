"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface AddDiscountModalProps {
  isOpen: boolean
  onClose: () => void
  onAddDiscount: (discount: {
    network: string
    userPays: string
    agentPrice: string
    vendorPrice: string
  }) => void
  editData?: {
    network: string
    userPays: string
    agentPrice: string
    vendorPrice: string
  } | null
}

export default function AddDiscountModal({ isOpen, onClose, onAddDiscount, editData }: AddDiscountModalProps) {
  const [network, setNetwork] = useState("")
  const [userPays, setUserPays] = useState("")
  const [agentPrice, setAgentPrice] = useState("")
  const [vendorPrice, setVendorPrice] = useState("")
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const networks = ["MTN", "Glo", "Airtel", "9mobile"]

  useEffect(() => {
    if (editData) {
      setNetwork(editData.network)
      setUserPays(editData.userPays)
      setAgentPrice(editData.agentPrice)
      setVendorPrice(editData.vendorPrice)
    } else {
      setNetwork("")
      setUserPays("")
      setAgentPrice("")
      setVendorPrice("")
    }
  }, [editData, isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddDiscount({
      network,
      userPays,
      agentPrice,
      vendorPrice,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-60 p-4">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="network" className="block text-sm font-medium text-gray-700 mb-1">
              Network
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
              >
                {network || "Select Network"}
                <svg
                  className={`w-5 h-5 transition-transform ${isNetworkDropdownOpen ? "transform rotate-180" : ""}`}
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

              {isNetworkDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="py-1">
                    {networks.map((net) => (
                      <button
                        key={net}
                        type="button"
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                        onClick={() => {
                          setNetwork(net)
                          setIsNetworkDropdownOpen(false)
                        }}
                      >
                        {net}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="userPays" className="block text-sm font-medium text-gray-700 mb-1">
              User Pays (%)
            </label>
            <input
              type="number"
              id="userPays"
              value={userPays}
              onChange={(e) => setUserPays(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="agentPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Agent Price (%)
            </label>
            <input
              type="number"
              id="agentPrice"
              value={agentPrice}
              onChange={(e) => setAgentPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="vendorPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Vendor Price (%)
            </label>
            <input
              type="number"
              id="vendorPrice"
              value={vendorPrice}
              onChange={(e) => setVendorPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {editData ? "Update Discount" : "Add Discount"}
          </button>
        </form>
      </div>
    </div>
  )
}
