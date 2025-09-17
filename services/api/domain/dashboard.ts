import { ENDPOINTS } from "../infrastructure";
import apiClient from "../infrastructure/client";
import { mockDelay, shouldUseMockData } from "../infrastructure/mock-data";

// Note: The actual API doesn't have dedicated dashboard endpoints
// Dashboard data would need to be constructed from other available endpoints
// like transactions, user profile, etc.

export const dashboardApi = {
  // Get basic dashboard statistics - constructed from available data
  getStats: async (): Promise<any> => {
    try {
      // This would need to be implemented by aggregating data from other endpoints
      // For now, return mock data
      throw new Error(
        "Dashboard statistics not directly supported by current API"
      );
    } catch (error) {
      throw new Error(`Failed to fetch dashboard stats: ${error}`);
    }
  },

  // Get recent transactions - uses actual transactions endpoint
  getRecentTransactions: async (limit: number = 10): Promise<any[]> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return [];
    }

    try {
      // This could use the actual transactions endpoint
      const response = await apiClient.get(ENDPOINTS.TRANSACTIONS.SEARCH, {
        params: { limit },
      });
      return response.data.data || [];
    } catch (error) {
      throw new Error(`Failed to fetch recent transactions: ${error}`);
    }
  },

  // Note: All other dashboard endpoints (analytics, service performance,
  // user activity, revenue breakdown, system health, alerts) are not supported
  // by the current API and would need to be implemented when those endpoints
  // become available
};
