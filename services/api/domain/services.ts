import apiClient from '../infrastructure/client'
import {
  DataPlan,
  AddDataPlanRequest,
  UpdateDataPlanRequest,
  GetDataPlansResponse,
  AddDataPlanResponse,
  UpdateDataPlanResponse,
  DeleteDataPlanResponse,
  GetDataPlanPricesResponse,
  PaginationParams,
} from '../../types'
import { ENDPOINTS } from '../infrastructure/endpoint'
import { shouldUseMockData, mockDelay } from '../infrastructure/mock-data'

// Data Plans API - aligned with actual API endpoints
export const dataPlansApi = {
  // Get all data plans
  getAll: async (params?: PaginationParams & { plan_type?: string }): Promise<GetDataPlansResponse> => {
    if (shouldUseMockData()) {
      await mockDelay()
      return {
        status: 200,
        status_code: "OK",
        data: [],
        msg: "Mock data plans"
      }
    }

    try {
      const response = await apiClient.get<GetDataPlansResponse>(ENDPOINTS.PLANS.GET_ALL(), { params })
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch data plans: ${error}`)
    }
  },

  // Get data plan prices by network
  getPricesByNetwork: async (networkId: string): Promise<GetDataPlanPricesResponse> => {
    if (shouldUseMockData()) {
      await mockDelay()
      return {
        status: 200,
        status_code: "OK",
        data: [],
        msg: "Mock data plan prices"
      }
    }

    try {
      const response = await apiClient.get<GetDataPlanPricesResponse>(ENDPOINTS.PLANS.PRICES(networkId))
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch data plan prices: ${error}`)
    }
  },

  // Create new data plan
  create: async (data: AddDataPlanRequest): Promise<AddDataPlanResponse> => {
    if (shouldUseMockData()) {
      await mockDelay()
      return {
        status: 200,
        status_code: "OK",
        msg: "Mock data plan created successfully"
      }
    }

    try {
      const response = await apiClient.post<AddDataPlanResponse>(ENDPOINTS.PLANS.ADD, data)
      return response.data
    } catch (error) {
      throw new Error(`Failed to create data plan: ${error}`)
    }
  },

  // Update data plan
  update: async (data: UpdateDataPlanRequest): Promise<UpdateDataPlanResponse> => {
    if (shouldUseMockData()) {
      await mockDelay()
      return {
        status: 200,
        status_code: "OK",
        msg: "Mock data plan updated successfully"
      }
    }

    try {
      const response = await apiClient.post<UpdateDataPlanResponse>(ENDPOINTS.PLANS.UPDATE, data)
      return response.data
    } catch (error) {
      throw new Error(`Failed to update data plan: ${error}`)
    }
  },

  // Delete data plan
  delete: async (planId: string): Promise<DeleteDataPlanResponse> => {
    if (shouldUseMockData()) {
      await mockDelay()
      return {
        status: 200,
        status_code: "OK",
        msg: "Mock data plan deleted successfully"
      }
    }

    try {
      const response = await apiClient.delete<DeleteDataPlanResponse>(ENDPOINTS.PLANS.DELETE(planId))
      return response.data
    } catch (error) {
      throw new Error(`Failed to delete data plan: ${error}`)
    }
  },
}

// Service Statistics API - for dashboard and analytics
export const serviceStatsApi = {
  // Get service statistics
  getStats: async (): Promise<any> => {
    if (shouldUseMockData()) {
      await mockDelay()
      return {
        totalDataPlans: 25,
        totalTransactions: 1500,
        totalRevenue: 2500000,
        activeServices: 8
      }
    }

    try {
      // This would be a real API call when available
      const response = await apiClient.get('/stats')
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch service stats: ${error}`)
    }
  }
}

// Note: Airtime discounts are not part of the actual API structure
// They are handled through the pricing system instead 