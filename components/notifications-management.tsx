"use client"

import { useState } from "react"
import { Plus, Search, Trash2 } from "lucide-react"
import AddNotificationModal from "./add-notification-modal"
import SuccessMessage from "./success-message"

export default function NotificationsManagement() {
  const [dateRange, setDateRange] = useState("Jan 6, 2025 - Jan 13, 2025")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successDetails, setSuccessDetails] = useState({
    title: "",
    message: "",
  })
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      subject: "Welcome Message",
      for: "General",
      message:
        "Hi, you are welcome, we're your one-stop platform for all your bills payment, airtime, data plans and cable tv subscription. All our services are available for you at a discount rate. Our customer support team is available to you 24/7. Thanks",
    },
  ])

  const handleAddNotification = (notification: { subject: string; messageFor: string; message: string }) => {
    const newNotification = {
      id: notifications.length + 1,
      subject: notification.subject,
      for: notification.messageFor,
      message: notification.message,
    }

    setNotifications([...notifications, newNotification])
    setIsModalOpen(false)

    // Show success message
    setSuccessDetails({
      title: "Notification Added Successfully",
      message: `You have successfully added a ${notification.subject} for ${notification.messageFor} message.`,
    })
    setShowSuccess(true)
  }

  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Page title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Notifications</h1>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search Notifications"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm flex items-center justify-center whitespace-nowrap">
          {dateRange}
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm flex items-center justify-center">
          <span className="mr-2">Filters</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 8H12M2 4H14M6 12H10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium flex items-center justify-center hover:bg-indigo-700 transition-colors whitespace-nowrap"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Notification
        </button>
      </div>

      {/* Notifications table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium">All Notifications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-4 md:px-6 py-3">Subject</th>
                <th className="px-4 md:px-6 py-3">For</th>
                <th className="px-4 md:px-6 py-3">Message</th>
                <th className="px-4 md:px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <tr key={notification.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">{notification.subject}</td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">{notification.for}</td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500 max-w-md">
                    <div className="truncate">{notification.message}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteNotification(notification.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 gap-3">
          <div className="text-sm text-gray-700">Page 1 of 1</div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm" disabled>
              Previous
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm">Next</button>
          </div>
        </div>
      </div>

      {/* Add Notification Modal */}
      <AddNotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddNotification={handleAddNotification}
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
  )
}
