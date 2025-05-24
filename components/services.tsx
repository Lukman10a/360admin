"use client"

import { RefreshCw, Smartphone, Wifi, Zap } from "lucide-react"
import Link from "next/link"

export default function Services() {
  const services = [
    {
      id: 1,
      name: "Airtime TopUp",
      icon: Smartphone,
      path: "/services/airtime",
    },
    {
      id: 2,
      name: "Electricity",
      icon: Zap,
      path: "/services/electricity",
    },
    {
      id: 3,
      name: "Data Bundle",
      icon: Wifi,
      path: "/services/data",
    },
    {
      id: 4,
      name: "Airtime Conversion",
      icon: RefreshCw,
      path: "/services/conversion",
    },
  ]

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Page title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Services</h1>

      {/* Services grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
              <service.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">{service.name}</h3>
            <Link
              href={service.path}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors text-center text-sm font-medium"
            >
              Manage
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
