"use client";

import { formatCurrency } from "@/lib/utils";
import { useUsers } from "@/services/hooks";
import { User } from "@/services/types/api-endpoints";
import { ArrowDown, Loader2, Plus, Search } from "lucide-react";
import { useState } from "react";
import AddSubscriberModal from "./add-subscriber-modal";

export default function Subscribers() {
  const [dateRange, setDateRange] = useState("Jan 6, 2025 - Jan 13, 2025");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: usersResponse, isLoading, error } = useUsers();
  const users: User[] = usersResponse?.data || [];

  // Filter users based on search term
  const filteredUsers: User[] = users.filter(
    (user) =>
      user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber?.includes(searchTerm) ||
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubscriber = (subscriber: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    state: string;
  }) => {
    // This will be handled by the modal and API call
    console.log("New subscriber:", subscriber);
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <span className="ml-2 text-gray-600">Loading subscribers...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 mb-2">Failed to load subscribers</p>
            <p className="text-sm text-gray-600">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Page title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        Subscribers
      </h1>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search for subscribers"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
          Add New Subscriber
        </button>
      </div>

      {/* Subscribers table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-medium">All Subscribers</h3>
          <button className="text-gray-400 hover:text-gray-500">
            <svg
              width="16"
              height="4"
              viewBox="0 0 16 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-4 md:px-6 py-3">Full Name</th>
                <th className="px-4 md:px-6 py-3">Phone</th>
                <th className="px-4 md:px-6 py-3">Email</th>
                <th className="px-4 md:px-6 py-3">Wallet</th>
                <th className="px-4 md:px-6 py-3">Account</th>
                <th className="px-4 md:px-6 py-3">Status</th>
                <th className="px-4 md:px-6 py-3">Reg. Date</th>
                <th className="px-4 md:px-6 py-3 flex items-center">
                  Last Activity
                  <ArrowDown className="ml-1 w-3 h-3" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">
                    {user.fullName || user.userName}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                    {user.phoneNumber}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                    {formatCurrency(user.balance)}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                    {user.userType || "User"}
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-600 mr-2"></div>
                      <span className="text-sm text-green-600">Active</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                    <div>
                      <div>
                        {new Date(user.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(user.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                    <div>
                      <div>
                        {new Date(user.updatedAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(user.updatedAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 gap-3">
          <div className="text-sm text-gray-700">Page 1 of 10</div>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm"
              disabled
            >
              Previous
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Subscriber Modal */}
      <AddSubscriberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddSubscriber={handleAddSubscriber}
      />
    </div>
  );
}
