"use client";

import { useTransactions } from "@/services/hooks";
import { Transaction } from "@/services/types/api-endpoints";
import { useAuthLoading, useUser } from "@/stores/user-store";
import {
  ArrowRight,
  Bell,
  CreditCard,
  RefreshCw,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const user = useUser();
  const userLoading = useAuthLoading();
  const { data: transactionsData, isLoading: transactionsLoading } =
    useTransactions();

  // Helper function to get transaction icon
  const getTransactionIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case "data":
        return Wifi;
      case "airtime":
        return Smartphone;
      case "electricity":
        return Zap;
      case "wallet":
        return CreditCard;
      default:
        return RefreshCw;
    }
  };

  // Process transactions data
  const transactions =
    transactionsData?.data?.slice(0, 8).map((transaction: Transaction) => ({
      id: transaction._id || transaction.trans_Id,
      type: getTransactionTypeLabel(transaction.trans_Type),
      description: `${transaction.trans_Network} ${transaction.trans_Type} for ${transaction.phone_number}`,
      amount: transaction.trans_amount || 0,
      time: transaction.createdAt
        ? new Date(transaction.createdAt).toLocaleDateString()
        : "Recent",
      icon: getTransactionIcon(transaction.trans_Type),
    })) || [];

  // Helper function to get transaction type label
  const getTransactionTypeLabel = (type: string) => {
    switch (type?.toLowerCase()) {
      case "data":
        return "Data Bundle";
      case "airtime":
        return "Airtime TopUp";
      case "electricity":
        return "Electricity";
      case "wallet":
        return "Wallet Credit";
      default:
        return "Transaction";
    }
  };

  const services = [
    {
      id: 1,
      name: "Airtime",
      fullName: "Airtime TopUp",
      icon: Smartphone,
    },
    {
      id: 2,
      name: "Data",
      fullName: "Data Bundle",
      icon: Wifi,
    },
    {
      id: 3,
      name: "Electricity",
      fullName: "Electricity",
      icon: Zap,
    },
    {
      id: 4,
      name: "Conversion",
      fullName: "Airtime Conversion",
      icon: RefreshCw,
    },
  ];

  // Get user display info
  const userName = user?.fullName || user?.userName || "User";
  const userBalance = user?.balance || 0;

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Dashboard header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Welcome, {userLoading ? "Loading..." : userName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Notification icon for mobile */}
          <div className="md:hidden">
            <Link
              href="/notifications-management"
              className="p-2 text-gray-500 hover:text-indigo-600 transition-colors rounded-md hover:bg-gray-100"
            >
              <Bell className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Balance card */}
      <div className="mb-6 bg-indigo-600 rounded-lg p-4 md:p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 6V2h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="flex justify-between items-start mb-4 md:mb-8">
          <div className="flex items-center">
            <span className="font-medium text-sm md:text-base">
              Current Balance
            </span>
            <svg
              className="ml-2 w-4 h-4 md:w-5 md:h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                fill="currentColor"
              />
              <path
                d="M2 12.6757V11.3243C2 10.7413 2.474 10.2673 3.057 10.2673C4.358 10.2673 5.069 9.1503 4.502 7.9893C4.214 7.4133 4.425 6.7223 5.001 6.4343L6.3013 5.7153C6.8138 5.4553 7.4363 5.6303 7.6963 6.1423L7.7673 6.2713C8.334 7.4313 9.7443 7.4313 10.311 6.2713L10.382 6.1423C10.642 5.6303 11.2645 5.4553 11.777 5.7153L13.0773 6.4343C13.6543 6.7223 13.8643 7.4133 13.5763 7.9893C13.0093 9.1503 13.7203 10.2673 15.0213 10.2673C15.6043 10.2673 16.0783 10.7413 16.0783 11.3243V12.6757C16.0783 13.2587 15.6043 13.7327 15.0213 13.7327C13.7203 13.7327 13.0093 14.8497 13.5763 16.0107C13.8643 16.5867 13.6543 17.2777 13.0773 17.5657L11.777 18.2847C11.2645 18.5447 10.642 18.3697 10.382 17.8577L10.311 17.7287C9.7443 16.5687 8.334 16.5687 7.7673 17.7287L7.6963 17.8577C7.4363 18.3697 6.8138 18.5447 6.3013 18.2847L5.001 17.5657C4.425 17.2777 4.214 16.5867 4.502 16.0107C5.069 14.8497 4.358 13.7327 3.057 13.7327C2.474 13.7327 2 13.2587 2 12.6757Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <Link
            href="/transactions"
            className="flex items-center text-indigo-100 hover:text-white text-xs md:text-sm transition-colors"
          >
            <span>Transaction History</span>
            <ArrowRight className="ml-1 w-3 h-3 md:w-4 md:h-4" />
          </Link>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
            ₦
            {userLoading
              ? "..."
              : userBalance.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
          </h2>
          <button className="bg-white text-indigo-600 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center w-full md:w-auto hover:bg-gray-50 transition-colors shadow-sm">
            <CreditCard className="mr-2 w-4 h-4" />
            Fund Wallet
          </button>
        </div>
      </div>

      {/* Services */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 mb-6">
        {services.map((service) => (
          <Link
            href="/services"
            key={service.id}
            className="bg-white p-2 md:p-4 rounded-lg border border-gray-200 flex flex-col items-center justify-center hover:shadow-md transition-all hover:border-indigo-200"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-1 md:mb-3">
              <service.icon className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <span className="text-xs md:text-sm font-medium text-center">
              {service.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex justify-between items-center p-3 md:p-4 border-b border-gray-200">
          <h3 className="text-sm md:text-base font-medium">
            Recent Transactions
          </h3>
          <Link
            href="/transactions"
            className="text-xs md:text-sm text-gray-500 flex items-center hover:text-indigo-600 transition-colors"
          >
            View all
            <ArrowRight className="ml-1 w-3 h-3 md:w-4 md:h-4" />
          </Link>
        </div>
        <div className="divide-y divide-gray-200">
          {transactionsLoading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="p-3 md:p-4 flex items-center justify-between animate-pulse"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
              </div>
            ))
          ) : transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-3 md:p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                    <transaction.icon className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-medium">
                      {transaction.type}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                      {transaction.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm md:text-base font-medium ${
                      transaction.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.amount > 0
                      ? `+₦${Math.abs(transaction.amount)}`
                      : `-₦${Math.abs(transaction.amount)}`}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">
                    {transaction.time}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>No transactions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
