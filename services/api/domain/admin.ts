import {
  GenerateCouponRequest,
  GenerateCouponResponse,
  RefundRequest,
  RefundResponse,
} from "../../types";
import apiClient from "../infrastructure/client";
import { ENDPOINTS } from "../infrastructure/endpoint";
import { mockDelay, shouldUseMockData } from "../infrastructure/mock-data";

// Admin Operations API - enhanced with robust error handling and mock fallbacks
export const adminApi = {
  // Generate coupons
  generateCoupon: async (
    request: GenerateCouponRequest
  ): Promise<GenerateCouponResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        status: 200,
        status_code: "OK",
        msg: "Coupons generated successfully (mock)",
        data: {
          coupons: ["COUPON001", "COUPON002", "COUPON003"],
          expiryDate: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ).toISOString(), // 30 days from now
        },
      };
    }

    try {
      const response = await apiClient.post<GenerateCouponResponse>(
        ENDPOINTS.ADMIN.GENERATE_COUPON,
        request
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to generate coupons: ${error}`);
    }
  },

  // Process refund
  processRefund: async (
    transactionId: string,
    request: RefundRequest
  ): Promise<RefundResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        status: 200,
        status_code: "OK",
        msg: "Refund processed successfully (mock)",
        data: {
          refundId: `REFUND_${Date.now()}`,
          transactionId: transactionId,
          amount: request.amount || 0,
          status: "Success",
        },
      };
    }

    try {
      const response = await apiClient.post<RefundResponse>(
        ENDPOINTS.ADMIN.REFUND(transactionId),
        request
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to process refund: ${error}`);
    }
  },

  // Get admin statistics
  getStats: async (): Promise<any> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        status: 200,
        status_code: "OK",
        msg: "Admin stats retrieved successfully (mock)",
        data: {
          totalUsers: 1250,
          totalTransactions: 5432,
          totalRevenue: 1250000,
          pendingRefunds: 5,
          activeCoupons: 23,
        },
      };
    }

    try {
      const response = await apiClient.get("/admin/stats");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch admin stats: ${error}`);
    }
  },

  // Get system logs
  getSystemLogs: async (params?: {
    page?: number;
    limit?: number;
    level?: string;
  }): Promise<any> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        status: 200,
        status_code: "OK",
        msg: "System logs retrieved successfully (mock)",
        data: {
          logs: [
            {
              id: "log_1",
              level: "INFO",
              message: "User login successful",
              timestamp: new Date().toISOString(),
              userId: "user_123",
            },
            {
              id: "log_2",
              level: "WARN",
              message: "Failed login attempt",
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              userId: "user_456",
            },
          ],
          pagination: {
            page: params?.page || 1,
            limit: params?.limit || 50,
            total: 2,
            totalPages: 1,
          },
        },
      };
    }

    try {
      const response = await apiClient.get("/admin/logs", { params });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch system logs: ${error}`);
    }
  },
};
