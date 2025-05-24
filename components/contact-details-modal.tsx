"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface ContactDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdateSettings: (settings: any) => void
}

export default function ContactDetailsModal({ isOpen, onClose, onUpdateSettings }: ContactDetailsModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [whatsappLink, setWhatsappLink] = useState("")
  const [instagramLink, setInstagramLink] = useState("")
  const [facebookLink, setFacebookLink] = useState("")
  const [twitterLink, setTwitterLink] = useState("")
  const [telegramUsername, setTelegramUsername] = useState("")
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
      phoneNumber,
      email,
      whatsappLink,
      instagramLink,
      facebookLink,
      twitterLink,
      telegramUsername,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div ref={modalRef} className="bg-white rounded-xl w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Contact Details</h2>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Phone and Email Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              {/* Social Media Links */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Group Link</label>
                <input
                  type="url"
                  value={whatsappLink}
                  onChange={(e) => setWhatsappLink(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter WhatsApp group link"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Link</label>
                <input
                  type="url"
                  value={instagramLink}
                  onChange={(e) => setInstagramLink(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter Instagram profile link"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Link</label>
                <input
                  type="url"
                  value={facebookLink}
                  onChange={(e) => setFacebookLink(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter Facebook page link"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">X (Twitter) Link</label>
                <input
                  type="url"
                  value={twitterLink}
                  onChange={(e) => setTwitterLink(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter X (Twitter) profile link"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telegram Username</label>
                <input
                  type="text"
                  value={telegramUsername}
                  onChange={(e) => setTelegramUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter Telegram username"
                />
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
