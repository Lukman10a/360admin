"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface GeneralSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdateSettings: (settings: any) => void
}

export default function GeneralSettingsModal({ isOpen, onClose, onUpdateSettings }: GeneralSettingsModalProps) {
  const [websiteName, setWebsiteName] = useState("360 Data")
  const [websiteUrl, setWebsiteUrl] = useState("https://360data.com/")
  const [apiDocLink, setApiDocLink] = useState("https://360data.com/")
  const [agentUpgradeFee, setAgentUpgradeFee] = useState("1000")
  const [vendorUpgradeFee, setVendorUpgradeFee] = useState("2000")
  const [walletTransferCharges, setWalletTransferCharges] = useState("50")
  const [referralAccountUpgrade, setReferralAccountUpgrade] = useState("100")
  const [referralAirtimePurchase, setReferralAirtimePurchase] = useState("1")
  const [referralDataPurchase, setReferralDataPurchase] = useState("5")
  const [referralCableTV, setReferralCableTV] = useState("100")
  const [referralWalletFunding, setReferralWalletFunding] = useState("100")
  const [referralExamPin, setReferralExamPin] = useState("1")
  const [referralElectricityFee, setReferralElectricityFee] = useState("5")
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
      websiteName,
      websiteUrl,
      apiDocLink,
      agentUpgradeFee,
      vendorUpgradeFee,
      walletTransferCharges,
      referralAccountUpgrade,
      referralAirtimePurchase,
      referralDataPurchase,
      referralCableTV,
      referralWalletFunding,
      referralExamPin,
      referralElectricityFee,
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
            <div className="space-y-6">
              {/* Website Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website Name</label>
                  <input
                    type="text"
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter website name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter website URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API Documentation Link</label>
                  <input
                    type="url"
                    value={apiDocLink}
                    onChange={(e) => setApiDocLink(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter API documentation URL"
                  />
                </div>
              </div>

              {/* Fees Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Agent Upgrade Fee</label>
                  <input
                    type="number"
                    value={agentUpgradeFee}
                    onChange={(e) => setAgentUpgradeFee(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vendor Upgrade Fee</label>
                  <input
                    type="number"
                    value={vendorUpgradeFee}
                    onChange={(e) => setVendorUpgradeFee(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wallet To Wallet Transfer Charges
                  </label>
                  <input
                    type="number"
                    value={walletTransferCharges}
                    onChange={(e) => setWalletTransferCharges(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Referral Bonuses Section */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Referral Bonus (Account Upgrade)
                    </label>
                    <input
                      type="number"
                      value={referralAccountUpgrade}
                      onChange={(e) => setReferralAccountUpgrade(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Referral Bonus (Airtime Purchase)
                    </label>
                    <input
                      type="number"
                      value={referralAirtimePurchase}
                      onChange={(e) => setReferralAirtimePurchase(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Referral Bonus (Data Purchase)
                    </label>
                    <input
                      type="number"
                      value={referralDataPurchase}
                      onChange={(e) => setReferralDataPurchase(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Referral Bonus (Cable TV)</label>
                    <input
                      type="number"
                      value={referralCableTV}
                      onChange={(e) => setReferralCableTV(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Referral Bonus (Exam Pin)</label>
                    <input
                      type="number"
                      value={referralExamPin}
                      onChange={(e) => setReferralExamPin(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Referral Bonus (Electricity Fee)
                    </label>
                    <input
                      type="number"
                      value={referralElectricityFee}
                      onChange={(e) => setReferralElectricityFee(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Referral Bonus (Wallet Funding)
                    </label>
                    <input
                      type="number"
                      value={referralWalletFunding}
                      onChange={(e) => setReferralWalletFunding(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Referral Bonus (Exam Pin)</label>
                    <input
                      type="number"
                      value={referralExamPin}
                      onChange={(e) => setReferralExamPin(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Referral Bonus (Electricity Fee)
                    </label>
                    <input
                      type="number"
                      value={referralElectricityFee}
                      onChange={(e) => setReferralElectricityFee(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
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
