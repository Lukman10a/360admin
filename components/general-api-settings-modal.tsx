"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface GeneralApiSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdateSettings: (settings: any) => void
}

export default function GeneralApiSettingsModal({ isOpen, onClose, onUpdateSettings }: GeneralApiSettingsModalProps) {
  const [dataApiKey, setDataApiKey] = useState("")
  const [dataApiUrl, setDataApiUrl] = useState("")
  const [dataBalanceCheckUrl, setDataBalanceCheckUrl] = useState("")
  const [dataFundAccount, setDataFundAccount] = useState("")
  const [vtuApiKey, setVtuApiKey] = useState("")
  const [vtuApiUrl, setVtuApiUrl] = useState("")
  const [vtuBalanceCheckUrl, setVtuBalanceCheckUrl] = useState("")
  const [vtuFundAccount, setVtuFundAccount] = useState("")
  const [cableTvApiKey, setCableTvApiKey] = useState("")
  const [cableTvIucVerificationUrl, setCableTvIucVerificationUrl] = useState("")
  const [electricityMeterApiKey, setElectricityMeterApiKey] = useState("")
  const [electricityMeterVerificationUrl, setElectricityMeterVerificationUrl] = useState("")
  const [electricityApiUrl, setElectricityApiUrl] = useState("")
  const [examApiKey, setExamApiKey] = useState("")
  const [electricityCheckerApiUrl, setElectricityCheckerApiUrl] = useState("")
  const modalRef = useRef<HTMLDivElement>(null)

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
      dataApiKey,
      dataApiUrl,
      dataBalanceCheckUrl,
      dataFundAccount,
      vtuApiKey,
      vtuApiUrl,
      vtuBalanceCheckUrl,
      vtuFundAccount,
      cableTvApiKey,
      cableTvIucVerificationUrl,
      electricityMeterApiKey,
      electricityMeterVerificationUrl,
      electricityApiUrl,
      examApiKey,
      electricityCheckerApiUrl,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div ref={modalRef} className="bg-white rounded-xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data API Key</label>
                  <input
                    type="text"
                    value={dataApiKey}
                    onChange={(e) => setDataApiKey(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data Balance Check URL</label>
                  <input
                    type="text"
                    value={dataBalanceCheckUrl}
                    onChange={(e) => setDataBalanceCheckUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">VTU API Key</label>
                  <input
                    type="text"
                    value={vtuApiKey}
                    onChange={(e) => setVtuApiKey(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">VTU Balance Check URL</label>
                  <input
                    type="text"
                    value={vtuBalanceCheckUrl}
                    onChange={(e) => setVtuBalanceCheckUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cable Tv API Key</label>
                  <input
                    type="text"
                    value={cableTvApiKey}
                    onChange={(e) => setCableTvApiKey(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Electricity Meter API Key</label>
                  <input
                    type="text"
                    value={electricityMeterApiKey}
                    onChange={(e) => setElectricityMeterApiKey(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Electricity API URL</label>
                  <input
                    type="text"
                    value={electricityApiUrl}
                    onChange={(e) => setElectricityApiUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Electricity Checker API URL</label>
                  <input
                    type="text"
                    value={electricityCheckerApiUrl}
                    onChange={(e) => setElectricityCheckerApiUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data API URL</label>
                  <input
                    type="text"
                    value={dataApiUrl}
                    onChange={(e) => setDataApiUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data Fund Account</label>
                  <input
                    type="text"
                    value={dataFundAccount}
                    onChange={(e) => setDataFundAccount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">VTU API URL</label>
                  <input
                    type="text"
                    value={vtuApiUrl}
                    onChange={(e) => setVtuApiUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">VTU Fund Account</label>
                  <input
                    type="text"
                    value={vtuFundAccount}
                    onChange={(e) => setVtuFundAccount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cable Tv IUC Verification URL</label>
                  <input
                    type="text"
                    value={cableTvIucVerificationUrl}
                    onChange={(e) => setCableTvIucVerificationUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Electricity Meter Verification URL
                  </label>
                  <input
                    type="text"
                    value={electricityMeterVerificationUrl}
                    onChange={(e) => setElectricityMeterVerificationUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exam API Key</label>
                  <input
                    type="text"
                    value={examApiKey}
                    onChange={(e) => setExamApiKey(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
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
