"use client";

import { useBuyAirtime } from "@/services/hooks";
import { Loader2, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import SuccessMessage from "./success-message";

export default function BuyAirtime() {
  const [formData, setFormData] = useState({
    mobile_number: "",
    network: "",
    amount: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successDetails, setSuccessDetails] = useState({
    title: "",
    message: "",
  });
  const [savedNumbers, setSavedNumbers] = useState<string[]>([]);

  // Load saved numbers from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("savedPhoneNumbers");
    if (saved) {
      setSavedNumbers(JSON.parse(saved));
    }
  }, []);

  const buyAirtimeMutation = useBuyAirtime();

  const networks = [
    { id: "1", name: "MTN" },
    { id: "2", name: "GLO" },
    { id: "3", name: "AIRTEL" },
    { id: "4", name: "9MOBILE" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-detect network based on phone number
    if (name === "mobile_number" && value.length >= 4) {
      const prefix = value.replace(/^(\+?234|0)/, "").substring(0, 3);
      const networkMap: { [key: string]: string } = {
        703: "1",
        704: "1",
        706: "1",
        803: "1",
        806: "1",
        810: "1",
        813: "1",
        814: "1",
        816: "1",
        903: "1",
        906: "1",
        913: "1",
        916: "1", // MTN
        705: "2",
        805: "2",
        807: "2",
        811: "2",
        815: "2",
        905: "2", // GLO
        701: "3",
        708: "3",
        802: "3",
        808: "3",
        812: "3",
        902: "3",
        907: "3",
        901: "3",
        912: "3", // AIRTEL
        809: "4",
        817: "4",
        818: "4",
        908: "4",
        909: "4", // 9MOBILE
      };
      const detectedNetwork = networkMap[prefix];
      if (detectedNetwork && !formData.network) {
        setFormData((prev) => ({
          ...prev,
          network: detectedNetwork,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.mobile_number || !formData.network || !formData.amount) {
      alert("Please fill in all fields");
      return;
    }

    // Basic phone number validation
    const phoneRegex = /^(\+?234|0)[789]\d{9}$/;
    if (!phoneRegex.test(formData.mobile_number)) {
      alert("Please enter a valid Nigerian phone number");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (amount < 1) {
      alert("Amount must be at least ₦1");
      return;
    }

    const request = {
      mobile_number: formData.mobile_number,
      network: parseInt(formData.network),
      amount: amount,
    };

    try {
      await buyAirtimeMutation.mutateAsync(request);
      setSuccessDetails({
        title: "Airtime Purchase Successful",
        message: `You have successfully purchased ₦${amount.toLocaleString()} airtime for ${
          formData.mobile_number
        }.`,
      });
      setShowSuccess(true);
      // Reset form
      setFormData({
        mobile_number: "",
        network: "",
        amount: "",
      });
    } catch (error) {
      alert(`Failed to purchase airtime: ${error}`);
    }
  };

  const savePhoneNumber = (number: string) => {
    if (!savedNumbers.includes(number)) {
      const updated = [...savedNumbers, number];
      setSavedNumbers(updated);
      localStorage.setItem("savedPhoneNumbers", JSON.stringify(updated));
    }
  };

  const selectSavedNumber = (number: string) => {
    setFormData((prev) => ({ ...prev, mobile_number: number }));
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Page title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        Buy Airtime
      </h1>

      {/* Buy Airtime Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-md">
        <div className="flex items-center mb-6">
          <Smartphone className="w-8 h-8 text-indigo-600 mr-3" />
          <h2 className="text-lg font-semibold text-gray-900">
            Purchase Airtime
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Network Selection */}
          <div>
            <label
              htmlFor="network"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Network
            </label>
            <select
              id="network"
              name="network"
              value={formData.network}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select Network</option>
              {networks.map((network) => (
                <option key={network.id} value={network.id}>
                  {network.name}
                </option>
              ))}
            </select>
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="mobile_number"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                id="mobile_number"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <button
                type="button"
                onClick={() =>
                  formData.mobile_number &&
                  savePhoneNumber(formData.mobile_number)
                }
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm transition-colors"
                disabled={!formData.mobile_number}
              >
                Save
              </button>
            </div>
            {/* Saved Numbers */}
            {savedNumbers.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Saved Numbers:</p>
                <div className="flex flex-wrap gap-2">
                  {savedNumbers.map((number) => (
                    <button
                      key={number}
                      type="button"
                      onClick={() => selectSavedNumber(number)}
                      className="px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded transition-colors"
                    >
                      {number}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Amount */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount (₦)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              min="1"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {/* Quick amount buttons */}
            <div className="flex flex-wrap gap-2 mt-2">
              {[100, 200, 500, 1000, 2000, 5000].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      amount: amount.toString(),
                    }))
                  }
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  ₦{amount}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={buyAirtimeMutation.isPending}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {buyAirtimeMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Purchase Airtime"
            )}
          </button>
        </form>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <SuccessMessage
          title={successDetails.title}
          message={successDetails.message}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}
