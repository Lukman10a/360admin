"use client"
import { Check } from "lucide-react"

interface SuccessMessageProps {
  title: string
  message: string
  onClose?: () => void
}

export default function SuccessMessage({ title, message, onClose }: SuccessMessageProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center p-8 max-w-md w-full text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white">
            <Check className="w-8 h-8" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">{title}</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">{message}</p>
        {onClose && (
          <button onClick={onClose} className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
            Back to settings
          </button>
        )}
        <div className="absolute bottom-8 text-center text-sm text-gray-500 w-full left-0">
          © 2025 360 Data. Designed by Rykelabs
        </div>
      </div>
    </div>
  )
}
