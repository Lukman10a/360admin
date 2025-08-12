import apiClient from '../infrastructure/client'
import { ENDPOINTS } from '../infrastructure/endpoint'
import { shouldUseMockData, mockDelay } from '../infrastructure/mock-data'

// Note: The actual API only supports basic transaction viewing and searching
// Advanced transaction management features are not supported

export const transactionsApi = {
  // Get all transactions - uses actual API endpoint
  getAll: async (params?: any): Promise<any> => {
    if (shouldUseMockData()) {
      await mockDelay()
      return {
        status: 200,
        status_code: "OK",
        data: [],
        msg: "Mock transactions"
      }
    }

    try {
      const response = await apiClient.get(ENDPOINTS.TRANSACTIONS.GET_ALL, { params })
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch transactions: ${error}`)
    }
  },

  // Search transactions - uses actual API endpoint
  search: async (params?: any): Promise<any> => {
    if (shouldUseMockData()) {
      await mockDelay()
      return {
        status: 200,
        status_code: "OK",
        data: [],
        msg: "Mock transaction search"
      }
    }

    try {
      const response = await apiClient.get(ENDPOINTS.TRANSACTIONS.SEARCH, { params })
      return response.data
    } catch (error) {
      throw new Error(`Failed to search transactions: ${error}`)
    }
  },

  // Note: All other transaction endpoints (getById, getByRefId, getUserTransactions,
  // getByStatus, getByType, getByDateRange, create, updateStatus, retry, cancel,
  // refund, getStats, export, bulk operations) are not supported by the current API
  // and would need to be implemented when those endpoints become available
} 