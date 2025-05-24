"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface AddNotificationModalProps {
  isOpen: boolean
  onClose: () => void
  onAddNotification: (notification: {
    subject: string
    messageFor: string
    message: string
  }) => void
}

export default function AddNotificationModal({ isOpen, onClose, onAddNotification }: AddNotificationModalProps) {
  const [subject, setSubject] = useState("")
  const [messageFor, setMessageFor] = useState("")
  const [message, setMessage] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const messageForOptions = ["General", "Subscribers", "Agents", "Vendors", "System Users"]

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
    onAddNotification({
      subject,
      messageFor,
      message,
    })
    // Reset form
    setSubject("")
    setMessageFor("")
    setMessage("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-60 p-4">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Subject"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="messageFor" className="block text-sm font-medium text-gray-700 mb-1">
              Message for
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {messageFor || "General"}
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
                    {messageForOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                        onClick={() => {
                          setMessageFor(option)
                          setIsDropdownOpen(false)
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              placeholder="Message..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Notification
          </button>
        </form>
      </div>
    </div>
  )
}
