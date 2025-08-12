import { useState } from 'react'
import { FundTransferService } from '../api/fund-transfer'
import { TransferFundRequest, TransferFundResponse } from '../types'

interface UseFundTransferReturn {
  // User-to-user transfer
  transferFundToUser: (
    request: TransferFundRequest,
    userToken: string
  ) => Promise<TransferFundResponse>
  
  // Admin transfer
  adminTransferFund: (
    request: TransferFundRequest,
    adminToken: string
  ) => Promise<TransferFundResponse>
  
  // Validation
  validateTransferRequest: (request: TransferFundRequest) => string[]
  
  // State
  isLoading: boolean
  error: string | null
  lastTransfer: TransferFundResponse | null
  
  // Utilities
  clearError: () => void
  reset: () => void
}

export const useFundTransfer = (): UseFundTransferReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastTransfer, setLastTransfer] = useState<TransferFundResponse | null>(null)

  const transferFundToUser = async (
    request: TransferFundRequest,
    userToken: string
  ): Promise<TransferFundResponse> => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await FundTransferService.transferFundToUser(request, userToken)
      setLastTransfer(result)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Transfer failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const adminTransferFund = async (
    request: TransferFundRequest,
    adminToken: string
  ): Promise<TransferFundResponse> => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await FundTransferService.adminTransferFund(request, adminToken)
      setLastTransfer(result)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Admin transfer failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const validateTransferRequest = (request: TransferFundRequest): string[] => {
    return FundTransferService.validateTransferRequest(request)
  }

  const clearError = () => setError(null)

  const reset = () => {
    setIsLoading(false)
    setError(null)
    setLastTransfer(null)
  }

  return {
    transferFundToUser,
    adminTransferFund,
    validateTransferRequest,
    isLoading,
    error,
    lastTransfer,
    clearError,
    reset,
  }
}
