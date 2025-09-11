"use client"

import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react"
import { useState } from "react"

export default function AirtimeConversion() {
  const [network, setNetwork] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [isConverting, setIsConverting] = useState(false)
  const [conversionResult, setConversionResult] = useState<any>(null)

  const networks = [
    { id: "1", name: "MTN", color: "bg-yellow-500" },
    { id: "2", name: "GLO", color: "bg-green-500" },
    { id: "3", name: "Airtel", color: "bg-red-500" },
    { id: "4", name: "9Mobile", color: "bg-green-600" },
  ]

  const handleConversion = async () => {
    if (!network || !phoneNumber || !amount) {
      alert("Please fill all fields")
      return
    }

    setIsConverting(true)

    // Simulate API call
    setTimeout(() => {
      const conversionRate = 0.85 // 85% conversion rate
      const convertedAmount = parseFloat(amount) * conversionRate

      setConversionResult({
        originalAmount: parseFloat(amount),
        convertedAmount,
        network: networks.find(n => n.id === network)?.name,
        transactionId: `CONV${Date.now()}`,
        status: "success"
      })
      setIsConverting(false)
    }, 3000)
  }

  const resetForm = () => {
    setNetwork("")
    setPhoneNumber("")
    setAmount("")
    setConversionResult(null)
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      {/* Page title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Airtime Conversion</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <RefreshCw className="w-5 h-5 mr-2 text-blue-500" />
            Convert Airtime to Wallet
          </h2>

          <div className="space-y-4">
            {/* Network Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Network
              </label>
              <div className="grid grid-cols-2 gap-2">
                {networks.map((net) => (
                  <button
                    key={net.id}
                    onClick={() => setNetwork(net.id)}
                    className={`p-3 rounded-md border-2 transition-all ${
                      network === net.id
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${net.color} mr-2`}></div>
                      <span className="text-sm font-medium">{net.name}</span>
                    </div>
                  </button>
                ))}
              </div>
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

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (₦)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount to convert"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {amount && (
                <p className="text-xs text-gray-500 mt-1">
                  You'll receive: ₦{(parseFloat(amount) * 0.85).toFixed(2)}
                </p>
              )}
            </div>

            {/* Conversion Info */}
            <div className="bg-blue-50 p-3 rounded-md">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Conversion Rate</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• 85% conversion rate applied</li>
                <li>• Minimum conversion: ₦100</li>
                <li>• Maximum conversion: ₦50,000</li>
                <li>• Processing time: 1-5 minutes</li>
              </ul>
            </div>

            {/* Convert Button */}
            <button
              onClick={handleConversion}
              disabled={isConverting || !network || !phoneNumber || !amount}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isConverting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <RefreshCw className="w-5 h-5 mr-2" />
              )}
              {isConverting ? "Converting..." : "Convert Airtime"}
            </button>
          </div>
        </div>

        {/* Conversion Result */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            Conversion Status
          </h2>

          {isConverting ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-600 mb-2">Converting airtime to wallet...</p>
              <p className="text-sm text-gray-500">This may take a few minutes</p>
            </div>
          ) : conversionResult ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Conversion Successful!</h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <span className="text-sm font-medium text-gray-700">Transaction ID:</span>
                  <span className="text-sm text-gray-900">{conversionResult.transactionId}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <span className="text-sm font-medium text-gray-700">Network:</span>
                  <span className="text-sm text-gray-900">{conversionResult.network}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <span className="text-sm font-medium text-gray-700">Original Amount:</span>
                  <span className="text-sm text-gray-900">₦{conversionResult.originalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-md">
                  <span className="text-sm font-medium text-green-800">Converted Amount:</span>
                  <span className="text-sm text-green-700">₦{conversionResult.convertedAmount.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={resetForm}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
              >
                Convert Another
              </button>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>Fill the form and start converting your airtime to wallet balance.</p>
            </div>
          )}
        </div>
      </div>

      {/* Conversion History */}
      <div className="mt-8 bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium">Recent Conversions</h3>
        </div>
        <div className="p-4 text-center text-gray-500">
          <p>No recent conversions found.</p>
        </div>
      </div>
    </div>
  )
}
