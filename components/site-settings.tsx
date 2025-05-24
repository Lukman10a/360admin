"use client"

import { useState } from "react"
import { Settings, ContactRound, Wifi } from "lucide-react"
import GeneralSettingsModal from "./general-settings-modal"
import ContactDetailsModal from "./contact-details-modal"
import NetworkSettingsModal from "./network-settings-modal"
import SuccessMessage from "./success-message"

export default function SiteSettings() {
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
        successMessage = "You have successfully updated your site general settings."
        break
      case "contact":
        successMessage = "You have successfully updated your contact details settings."
        break
      case "network":
        successMessage = "You have successfully updated your network settings."
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
      title: "General Settings",
      icon: Settings,
    },
    {
      id: "contact",
      title: "Contact Details",
      icon: ContactRound,
    },
    {
      id: "network",
      title: "Network Settings",
      icon: Wifi,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        {/* Page title */}
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">Site Settings</h1>

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
        <GeneralSettingsModal
          isOpen={activeModal === "general"}
          onClose={() => setActiveModal(null)}
          onUpdateSettings={(settings) => handleUpdateSettings("general", settings)}
        />

        <ContactDetailsModal
          isOpen={activeModal === "contact"}
          onClose={() => setActiveModal(null)}
          onUpdateSettings={(settings) => handleUpdateSettings("contact", settings)}
        />

        <NetworkSettingsModal
          isOpen={activeModal === "network"}
          onClose={() => setActiveModal(null)}
          onUpdateSettings={(settings) => handleUpdateSettings("network", settings)}
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
