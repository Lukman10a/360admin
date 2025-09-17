import { PaginationParams } from "../../types";
import {
  GetTransactionsResponse,
  SearchTransactionsResponse,
  Transaction,
  TransactionSearchParams,
  TransferFundRequest,
  TransferFundResponse,
} from "../../types/api-endpoints";
import apiClient from "../infrastructure/client";
import { ENDPOINTS } from "../infrastructure/endpoint";
import { mockDelay, shouldUseMockData } from "../infrastructure/mock-data";

// Transactions API - enhanced with robust error handling and mock fallbacks
export const transactionsApi = {
  // Get all transactions
  getAll: async (
    params?: PaginationParams
  ): Promise<GetTransactionsResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        status: 200,
        status_code: "OK",
        data: [],
        msg: "Mock transactions",
      };
    }

    try {
      const response = await apiClient.get<GetTransactionsResponse>(
        ENDPOINTS.TRANSACTIONS.GET_ALL,
        { params }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch transactions: ${error}`);
    }
  },

  // Search transactions
  search: async (
    params: TransactionSearchParams & PaginationParams
  ): Promise<SearchTransactionsResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        status: 200,
        status_code: "OK",
        data: {
          stat: [
            {
              network: "MTN SME",
              profit: 0,
              total_volume_sold: 0,
            },
          ],
          totalPages: 0,
          totalSales: 0,
          totalProfit: 0,
          transactions: [],
        },
        page: params.page || 1,
        limit: params.limit || 100,
        msg: "Mock search results",
      };
    }

    try {
      const response = await apiClient.get<SearchTransactionsResponse>(
        ENDPOINTS.TRANSACTIONS.SEARCH,
        { params }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to search transactions: ${error}`);
    }
  },

  // Get transaction by ID (using search with transactionId filter)
  getById: async (transactionId: string): Promise<Transaction | null> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        _id: transactionId,
        trans_Id: transactionId,
        trans_By: "mock_user",
        trans_Type: "data",
        trans_Network: "MTN",
        phone_number: "08012345678",
        trans_amount: 500,
        trans_profit: 50,
        trans_volume_ratio: 1,
        balance_Before: 1000,
        balance_After: 500,
        trans_Date: new Date().toISOString(),
        trans_Status: "success",
        createdAt: new Date().toISOString(),
        __v: 0,
      };
    }

    try {
      const response = await apiClient.get<SearchTransactionsResponse>(
        ENDPOINTS.TRANSACTIONS.SEARCH,
        {
          params: { transactionId },
        }
      );
      return response.data.data.transactions[0] || null;
    } catch (error) {
      throw new Error(`Failed to fetch transaction: ${error}`);
    }
  },

  // Get user transactions (using search with userName filter)
  getUserTransactions: async (
    userName: string,
    params?: PaginationParams
  ): Promise<SearchTransactionsResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        status: 200,
        status_code: "OK",
        data: {
          stat: [
            {
              network: "MTN SME",
              profit: 0,
              total_volume_sold: 0,
            },
          ],
          totalPages: 0,
          totalSales: 0,
          totalProfit: 0,
          transactions: [],
        },
        page: params?.page || 1,
        limit: params?.limit || 100,
        msg: "Mock user transactions",
      };
    }

    try {
      const response = await apiClient.get<SearchTransactionsResponse>(
        ENDPOINTS.TRANSACTIONS.SEARCH,
        {
          params: { userName, ...params },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user transactions: ${error}`);
    }
  },
};

// Fund Transfer API - enhanced with robust error handling and mock fallbacks
export const fundTransferApi = {
  // Transfer funds between users
  transfer: async (
    request: TransferFundRequest
  ): Promise<TransferFundResponse> => {
    try {
      const response = await apiClient.post<TransferFundResponse>(
        ENDPOINTS.FUND_TRANSFER.USER_WALLET,
        request
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to transfer funds: ${error}`);
    }
  },

  // Admin transfer funds to user
  adminTransfer: async (
    request: TransferFundRequest
  ): Promise<TransferFundResponse> => {
    try {
      const response = await apiClient.post<TransferFundResponse>(
        ENDPOINTS.FUND_TRANSFER.ADMIN_TRANSFER,
        request
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to admin transfer funds: ${error}`);
    }
  },

  // Get transfer history (using transaction search with wallet type)
  getHistory: async (
    params?: PaginationParams
  ): Promise<SearchTransactionsResponse> => {
    try {
      const response = await apiClient.get<SearchTransactionsResponse>(
        ENDPOINTS.TRANSACTIONS.SEARCH,
        {
          params: { type: "wallet", ...params },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch transfer history: ${error}`);
    }
  },
};
