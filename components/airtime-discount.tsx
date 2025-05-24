"use client"

import { useState } from "react"
import { Edit, Plus } from "lucide-react"
import AddDiscountModal from "./add-discount-modal"
import SuccessMessage from "./success-message"

export default function AirtimeDiscount() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [editData, setEditData] = useState<any>(null)
  const [successDetails, setSuccessDetails] = useState({
    title: "",
    message: "",
  })
  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      network: "MTN",
      userPays: "99",
      agentPays: "98",
      vendorPays: "96",
    },
    {
      id: 2,
      network: "Glo",
      userPays: "99",
      agentPays: "98",
      vendorPays: "96",
    },
    {
      id: 3,
      network: "Airtel",
      userPays: "99",
      agentPays: "98",
      vendorPays: "96",
    },
    {
      id: 4,
      network: "9mobile",
      userPays: "99",
      agentPays: "98",
      vendorPays: "96",
    },
  ])

  const handleAddDiscount = (discount: {
    network: string
    userPays: string
    agentPrice: string
    vendorPrice: string
  }) => {
    if (editData) {
      // Update existing discount
      setDiscounts(
        discounts.map((d) =>
          d.id === editData.id
            ? {
                ...d,
                network: discount.network,
                userPays: discount.userPays,
                agentPays: discount.agentPrice,
                vendorPays: discount.vendorPrice,
              }
            : d,
        ),
      )
      setSuccessDetails({
        title: "Discount Updated Successfully",
        message: `You have successfully updated the discount for ${discount.network}.`,
      })
    } else {
      // Add new discount
      const newDiscount = {
        id: discounts.length + 1,
        network: discount.network,
        userPays: discount.userPays,
        agentPays: discount.agentPrice,
        vendorPays: discount.vendorPrice,
      }
      setDiscounts([...discounts, newDiscount])
      setSuccessDetails({
        title: "Discount Added Successfully",
        message: `You have successfully added a discount plan for ${discount.network}.`,
      })
    }

    setIsModalOpen(false)
    setEditData(null)
    setShowSuccess(true)
  }

  const handleEdit = (discount: any) => {
    setEditData({
      id: discount.id,
      network: discount.network,
      userPays: discount.userPays,
      agentPrice: discount.agentPays,
      vendorPrice: discount.vendorPays,
    })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditData(null)
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Page title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Airtime Discount</h1>

      {/* Add button */}
      <div className="flex justify-end mb-6">
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium flex items-center justify-center hover:bg-indigo-700 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Discount Plan
        </button>
      </div>

      {/* Discounts table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium">All Discount</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-4 md:px-6 py-3">Network</th>
                <th className="px-4 md:px-6 py-3">User Pays (%)</th>
                <th className="px-4 md:px-6 py-3">Agent Pays (%)</th>
                <th className="px-4 md:px-6 py-3">Vendor Pays (%)</th>
                <th className="px-4 md:px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {discounts.map((discount) => (
                <tr key={discount.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">{discount.network}</td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">{discount.userPays}</td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">{discount.agentPays}</td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">{discount.vendorPays}</td>
                  <td className="px-4 md:px-6 py-4">
                    <button className="text-indigo-600 hover:text-indigo-800" onClick={() => handleEdit(discount)}>
                      <Edit className="w-5 h-5" />
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

      {/* Add/Edit Discount Modal */}
      <AddDiscountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddDiscount={handleAddDiscount}
        editData={editData}
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
