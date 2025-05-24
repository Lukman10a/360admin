"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Check } from "lucide-react"

interface AddDataPlanModalProps {
  isOpen: boolean
  onClose: () => void
  onAddPlan: (plan: {
    network: string
    name: string
    dataType: string
    planId: string
    duration: string
    buyingPrice: string
    userPrice: string
    agentPrice: string
    vendorPrice: string
  }) => void
}

export default function AddDataPlanModal({ isOpen, onClose, onAddPlan }: AddDataPlanModalProps) {
  const [network, setNetwork] = useState("")
  const [name, setName] = useState("")
  const [dataType, setDataType] = useState("")
  const [planId, setPlanId] = useState("")
  const [duration, setDuration] = useState("")
  const [buyingPrice, setBuyingPrice] = useState("")
  const [userPrice, setUserPrice] = useState("")
  const [agentPrice, setAgentPrice] = useState("")
  const [vendorPrice, setVendorPrice] = useState("")
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false)
  const [isDataTypeDropdownOpen, setIsDataTypeDropdownOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const networks = ["MTN", "Glo", "Airtel", "9mobile"]
  const dataTypes = ["Gifting", "SME", "Corporate", "Direct"]

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
    onAddPlan({
      network,
      name,
      dataType,
      planId,
      duration,
      buyingPrice,
      userPrice,
      agentPrice,
      vendorPrice,
    })
    // Reset form
    setNetwork("")
    setName("")
    setDataType("")
    setPlanId("")
    setDuration("")
    setBuyingPrice("")
    setUserPrice("")
    setAgentPrice("")
    setVendorPrice("")
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
                    <div className="px-3 py-2 text-sm text-gray-700">Select Network</div>
                    {networks.map((net) => (
                      <button
                        key={net}
                        type="button"
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center"
                        onClick={() => {
                          setNetwork(net)
                          setIsNetworkDropdownOpen(false)
                        }}
                      >
                        {network === net && <Check className="w-4 h-4 mr-2" />}
                        <span>{net}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="dataType" className="block text-sm font-medium text-gray-700 mb-1">
                Data type
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  onClick={() => setIsDataTypeDropdownOpen(!isDataTypeDropdownOpen)}
                >
                  {dataType || "Select Type"}
                  <svg
                    className={`w-5 h-5 transition-transform ${isDataTypeDropdownOpen ? "transform rotate-180" : ""}`}
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

                {isDataTypeDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1">
                      {dataTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                          onClick={() => {
                            setDataType(type)
                            setIsDataTypeDropdownOpen(false)
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="planId" className="block text-sm font-medium text-gray-700 mb-1">
                Plan id
              </label>
              <input
                type="text"
                id="planId"
                value={planId}
                onChange={(e) => setPlanId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration in days
              </label>
              <input
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Days"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="buyingPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Buying Price
            </label>
            <input
              type="number"
              id="buyingPrice"
              value={buyingPrice}
              onChange={(e) => setBuyingPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Price"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label htmlFor="userPrice" className="block text-sm font-medium text-gray-700 mb-1">
                User Price
              </label>
              <input
                type="number"
                id="userPrice"
                value={userPrice}
                onChange={(e) => setUserPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="User Price"
                required
              />
            </div>
            <div>
              <label htmlFor="agentPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Agent Price
              </label>
              <input
                type="number"
                id="agentPrice"
                value={agentPrice}
                onChange={(e) => setAgentPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Agent Price"
                required
              />
            </div>
            <div>
              <label htmlFor="vendorPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Vendor Price
              </label>
              <input
                type="number"
                id="vendorPrice"
                value={vendorPrice}
                onChange={(e) => setVendorPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Vendor Price"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Plan
          </button>
        </form>
      </div>
    </div>
  )
}
