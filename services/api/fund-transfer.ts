import apiClient from './client'
import { ENDPOINTS } from './endpoint'
import { 
  TransferFundRequest, 
  TransferFundResponse, 
  FundTransferError,
  ApiResponse 
} from '../types'

/**
 * Fund Transfer API Service
 * Handles all fund transfer operations including user-to-user and admin transfers
 */

export class FundTransferService {
  /**
   * Transfer funds from one user to another (user-to-user transfer)
   * Uses x-auth-token header for user authentication
   */
  static async transferFundToUser(
    request: TransferFundRequest,
    userToken: string
  ): Promise<TransferFundResponse> {
    try {
      const response = await apiClient.post<TransferFundResponse>(
        ENDPOINTS.FUND_TRANSFER.USER_WALLET,
        request,
        {
          headers: {
            'x-auth-token': userToken,
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data
    } catch (error: any) {
      if (error.response?.data) {
        throw new Error(error.response.data.msg || 'Transfer failed')
      }
      throw new Error('Network error occurred during transfer')
    }
  }

  /**
   * Admin transfer funds to a user
   * Uses Bearer token for admin authentication
   */
  static async adminTransferFund(
    request: TransferFundRequest,
    adminToken: string
  ): Promise<TransferFundResponse> {
    try {
      const response = await apiClient.post<TransferFundResponse>(
        ENDPOINTS.FUND_TRANSFER.ADMIN_TRANSFER,
        request,
        {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data
    } catch (error: any) {
      if (error.response?.data) {
        const errorData = error.response.data as FundTransferError
        throw new Error(errorData.msg || 'Admin transfer failed')
      }
      throw new Error('Network error occurred during admin transfer')
    }
  }

  /**
   * Validate transfer request data
   */
  static validateTransferRequest(request: TransferFundRequest): string[] {
    const errors: string[] = []
    
    if (!request.userName || request.userName.trim() === '') {
      errors.push('Username is required')
    }
    
    if (!request.amount || request.amount <= 0) {
      errors.push('Amount must be greater than 0')
    }
    
    if (request.amount > 1000000) {
      errors.push('Amount cannot exceed ₦1,000,000')
    }
    
    return errors
  }
}

// Export individual functions for convenience
export const transferFundToUser = FundTransferService.transferFundToUser
export const adminTransferFund = FundTransferService.adminTransferFund
export const validateTransferRequest = FundTransferService.validateTransferRequest
