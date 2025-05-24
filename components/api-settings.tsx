"use client"

import { useState } from "react"
import { Settings, CreditCard, Wifi } from "lucide-react"
import GeneralApiSettingsModal from "./general-api-settings-modal"
import MonnifySettingsModal from "./monnify-settings-modal"
import PaystackSettingsModal from "./paystack-settings-modal"
import SuccessMessage from "./success-message"

export default function ApiSettings() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successDetails, setSuccessDetails] = useState({
    title: "",
    message: "",
  })

  const handleUpdateSettings = (type: string, settings: any) => {
    setActiveModal(null)

    let successMessage = ""
    switch (type) {
      case "general":
        successMessage = "You have successfully updated your general API settings."
        break
      case "monnify":
        successMessage = "You have successfully updated your Monnify settings."
        break
      case "paystack":
        successMessage = "You have successfully updated your Paystack settings."
        break
    }

    setSuccessDetails({
      title: "Settings Updated Successfully",
      message: successMessage,
    })
    setShowSuccess(true)
  }

  const settingsCards = [
    {
      id: "general",
      title: "General API Settings",
      icon: Settings,
      description: "Configure API keys, timeouts, and general API settings",
    },
    {
      id: "monnify",
      title: "Monnify Settings",
      icon: CreditCard,
      description: "Configure Monnify payment gateway settings",
    },
    {
      id: "paystack",
      title: "Paystack Settings",
      icon: Wifi,
      description: "Configure Paystack payment gateway settings",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        {/* Page title */}
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">API Settings</h1>

        {/* Settings cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {settingsCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
                <card.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">{card.title}</h3>
              <button
                onClick={() => setActiveModal(card.id)}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                Manage
              </button>
            </div>
          ))}
        </div>

        {/* Modals */}
        <GeneralApiSettingsModal
          isOpen={activeModal === "general"}
          onClose={() => setActiveModal(null)}
          onUpdateSettings={(settings) => handleUpdateSettings("general", settings)}
        />

        <MonnifySettingsModal
          isOpen={activeModal === "monnify"}
          onClose={() => setActiveModal(null)}
          onUpdateSettings={(settings) => handleUpdateSettings("monnify", settings)}
        />

        <PaystackSettingsModal
          isOpen={activeModal === "paystack"}
          onClose={() => setActiveModal(null)}
          onUpdateSettings={(settings) => handleUpdateSettings("paystack", settings)}
        />

        {/* Success Message */}
        {showSuccess && (
          <SuccessMessage
            title={successDetails.title}
            message={successDetails.message}
            onClose={() => setShowSuccess(false)}
          />
        )}
      </div>
    </div>
  )
}
