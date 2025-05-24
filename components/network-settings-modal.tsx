"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface NetworkSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdateSettings: (settings: any) => void
}

export default function NetworkSettingsModal({ isOpen, onClose, onUpdateSettings }: NetworkSettingsModalProps) {
  const [selectedNetwork, setSelectedNetwork] = useState("MTN")
  const [mtnGeneral, setMtnGeneral] = useState("Enable")
  const [mtnAirtime, setMtnAirtime] = useState("Enable")
  const [mtnSME, setMtnSME] = useState("Enable")
  const [mtnGifting, setMtnGifting] = useState("Enable")
  const [mtnCorporate, setMtnCorporate] = useState("Enable")
  const modalRef = useRef<HTMLDivElement>(null)

  const networks = ["MTN", "Glo", "Airtel", "9mobile"]
  const statusOptions = ["Enable", "Disable"]

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
    onUpdateSettings({
      selectedNetwork,
      mtnGeneral,
      mtnAirtime,
      mtnSME,
      mtnGifting,
      mtnCorporate,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div ref={modalRef} className="bg-white rounded-xl w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Network settings</h2>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* First Row: Network and MTN General */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Network</label>
                  <select
                    value={selectedNetwork}
                    onChange={(e) => setSelectedNetwork(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  >
                    {networks.map((network) => (
                      <option key={network} value={network}>
                        {network}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">MTN General (All)</label>
                  <select
                    value={mtnGeneral}
                    onChange={(e) => setMtnGeneral(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Second Row: MTN Airtime and MTN SME */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">MTN Airtime</label>
                  <select
                    value={mtnAirtime}
                    onChange={(e) => setMtnAirtime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">MTN SME</label>
                  <select
                    value={mtnSME}
                    onChange={(e) => setMtnSME(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Third Row: MTN Gifting and MTN Corporate */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">MTN Gifting</label>
                  <select
                    value={mtnGifting}
                    onChange={(e) => setMtnGifting(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">MTN Corporate</label>
                  <select
                    value={mtnCorporate}
                    onChange={(e) => setMtnCorporate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors font-medium"
              >
                Update settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
