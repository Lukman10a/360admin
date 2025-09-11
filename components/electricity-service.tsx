"use client";

import { useBuyElectricity, useDiscos } from "@/services/hooks";
import { Disco, ValidateMeterResponse } from "@/services/types";
import { AlertCircle, CheckCircle, Search, Zap } from "lucide-react";
import { useState } from "react";

export default function ElectricityService() {
  const [selectedDisco, setSelectedDisco] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [meterType, setMeterType] = useState<"PREPAID" | "POSTPAID">("PREPAID");
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] =
    useState<ValidateMeterResponse | null>(null);

  // API hooks
  const { data: discosData, isLoading: discosLoading } = useDiscos();
  const buyElectricityMutation = useBuyElectricity();

  const discos: Disco[] = discosData?.discos || [];

  // Manual validation function
  const validateMeter = async () => {
    if (!meterNumber || !selectedDisco) {
      alert("Please enter meter number and select a disco");
      return;
    }

    setIsValidating(true);
    try {
      // For now, we'll simulate validation since the API might not be fully implemented
      setTimeout(() => {
        setValidationResult({
          invalid: false,
          name: "John Doe",
          address: "123 Main Street, Lagos",
        });
        setIsValidating(false);
      }, 2000);
    } catch (error) {
      console.error("Validation failed:", error);
      setIsValidating(false);
    }
  };

  const handlePurchase = () => {
    if (!validationResult || !amount || !phoneNumber) {
      alert("Please validate meter and fill all fields");
      return;
    }

    const purchaseData = {
      meterId: selectedDisco,
      meterNumber,
      amount,
      meterType,
    };

    buyElectricityMutation.mutate(purchaseData, {
      onSuccess: (data) => {
        alert(
          `Electricity purchase successful! Transaction ID: ${
            data.data?.trans_Id || "N/A"
          }`
        );
        // Reset form
        setMeterNumber("");
        setAmount("");
        setPhoneNumber("");
        setValidationResult(null);
      },
      onError: (error) => {
        alert("Purchase failed. Please try again.");
        console.error("Purchase error:", error);
      },
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      {/* Page title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        Electricity Purchase
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Purchase Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-500" />
            Purchase Electricity
          </h2>

          <div className="space-y-4">
            {/* Disco Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Disco
              </label>
              <select
                value={selectedDisco}
                onChange={(e) => setSelectedDisco(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Choose a disco...</option>
                {discosLoading ? (
                  <option disabled>Loading...</option>
                ) : (
                  discos.map((disco: any) => (
                    <option key={disco.id} value={disco.id}>
                      {disco.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Meter Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meter Number
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={meterNumber}
                  onChange={(e) => setMeterNumber(e.target.value)}
                  placeholder="Enter meter number"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  onClick={validateMeter}
                  disabled={isValidating || !meterNumber || !selectedDisco}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isValidating ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  Validate
                </button>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (₦)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Purchase Button */}
            <button
              onClick={handlePurchase}
              disabled={buyElectricityMutation.isPending || !validationResult}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {buyElectricityMutation.isPending ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <Zap className="w-5 h-5 mr-2" />
              )}
              {buyElectricityMutation.isPending
                ? "Processing..."
                : "Purchase Electricity"}
            </button>
          </div>
        </div>

        {/* Validation Result */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            Meter Validation
          </h2>

          {isValidating ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <span className="ml-2 text-gray-600">Validating meter...</span>
            </div>
          ) : validationResult ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-md">
                <span className="text-sm font-medium text-green-800">
                  Customer Name:
                </span>
                <span className="text-sm text-green-700">
                  {validationResult.name}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                <span className="text-sm font-medium text-blue-800">
                  Address:
                </span>
                <span className="text-sm text-blue-700">
                  {validationResult.address}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-md">
                <span className="text-sm font-medium text-purple-800">
                  Meter Type:
                </span>
                <span className="text-sm text-purple-700">{meterType}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-md">
                <span className="text-sm font-medium text-yellow-800">
                  Status:
                </span>
                <span className="text-sm text-yellow-700">
                  {validationResult.invalid ? "Invalid" : "Valid"}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>
                Please enter meter details and click validate to see customer
                information.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Purchases */}
      <div className="mt-8 bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium">Recent Electricity Purchases</h3>
        </div>
        <div className="p-4 text-center text-gray-500">
          <p>No recent purchases found.</p>
        </div>
      </div>
    </div>
  );
}
