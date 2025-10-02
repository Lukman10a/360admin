import {
  AddDataPlanRequest,
  AddDataPlanResponse,
  BuyAirtimeRequest,
  BuyAirtimeResponse,
  BuyDataRequest,
  BuyDataResponse,
  BuyElectricityRequest,
  BuyElectricityResponse,
  DataPlanPrice,
  DeleteDataPlanResponse,
  GetDataPlanPricesResponse,
  GetDiscosResponse,
  GetUsersResponse,
  PaginationParams,
  UpdateDataPlanRequest,
  UpdateDataPlanResponse,
  ValidateMeterRequest,
  ValidateMeterResponse,
} from "../../types";
import apiClient from "../infrastructure/client";
import { ENDPOINTS } from "../infrastructure/endpoint";
import { mockDelay, shouldUseMockData } from "../infrastructure/mock-data";

// Data Plans API - aligned with actual API endpoints
export const dataPlansApi = {
  // Get all data plans
  getAll: async (
    params?: PaginationParams & { plan_type?: string; network?: string }
  ): Promise<DataPlanPrice[]> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return [];
    }

    try {
      const response = await apiClient.get<DataPlanPrice[]>(
        ENDPOINTS.PLANS.GET_ALL(),
        { params }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch data plans: ${error}`);
    }
  },

  // Get data plan prices by network
  getPricesByNetwork: async (
    networkId: string
  ): Promise<GetDataPlanPricesResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        status: 200,
        status_code: "OK",
        data: [],
        msg: "Mock data plan prices",
      };
    }

    try {
      const response = await apiClient.get<GetDataPlanPricesResponse>(
        ENDPOINTS.PLANS.PRICES(networkId)
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch data plan prices: ${error}`);
    }
  },

  // Add new data plan
  add: async (request: AddDataPlanRequest): Promise<AddDataPlanResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        status: 200,
        status_code: "OK",
        msg: "Data plan added successfully (mock)",
      };
    }

    try {
      const response = await apiClient.post<AddDataPlanResponse>(
        ENDPOINTS.PLANS.ADD,
        request
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to add data plan: ${error}`);
    }
  },

  // Update data plan
  update: async (
    request: UpdateDataPlanRequest
  ): Promise<UpdateDataPlanResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        status: 200,
        status_code: "OK",
        msg: "Data plan updated successfully (mock)",
      };
    }

    try {
      const response = await apiClient.patch<UpdateDataPlanResponse>(
        ENDPOINTS.PLANS.UPDATE,
        request
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update data plan: ${error}`);
    }
  },

  // Delete data plan
  delete: async (planId: string): Promise<DeleteDataPlanResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        status: 200,
        status_code: "OK",
        msg: "Data plan deleted successfully (mock)",
      };
    }

    try {
      const response = await apiClient.delete<DeleteDataPlanResponse>(
        ENDPOINTS.PLANS.DELETE(planId)
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete data plan: ${error}`);
    }
  },
};

// Users API - for admin user management
export const usersApi = {
  // Get all users with pagination
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<GetUsersResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        users: [],
        totalPages: 1,
        totalUsers: 0,
        totalBalance: 0,
        page: 1,
        limit: 30,
      };
    }

    try {
      const response = await apiClient.get<GetUsersResponse>(
        ENDPOINTS.ADMIN.USERS,
        { params }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error}`);
    }
  },
};

// Buy Services API - enhanced with robust error handling and mock fallbacks
export const buyServicesApi = {
  // Buy data
  buyData: async (request: BuyDataRequest): Promise<BuyDataResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        status_code: "OK",
        msg: "Data purchase successful (mock)",
        data: {
          trans_Id: `TXN${Date.now()}`,
          trans_By: "mock_user",
          trans_UserName: "Mock User",
          trans_Type: "data",
          trans_Network: request.network,
          phone_number: request.mobile_number,
          trans_amount: 500,
          trans_profit: 50,
          trans_volume_ratio: 1,
          balance_Before: 1000,
          balance_After: 500,
          trans_Date: new Date().toISOString(),
          trans_Status: "success",
          createdAt: new Date().toISOString(),
          _id: `mock_${Date.now()}`,
          __v: 0,
        },
      };
    }

    try {
      const response = await apiClient.post<BuyDataResponse>(
        ENDPOINTS.BUY.DATA,
        request
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to buy data: ${error}`);
    }
  },

  // Buy airtime
  buyAirtime: async (
    request: BuyAirtimeRequest
  ): Promise<BuyAirtimeResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        status: 200,
        status_code: "OK",
        msg: "Airtime purchase successful (mock)",
        data: {
          trans_Id: `TXN${Date.now()}`,
          trans_By: "mock_user",
          trans_UserName: "Mock User",
          trans_Type: "airtime",
          trans_Network: request.network.toString(),
          phone_number: request.mobile_number,
          trans_amount: request.amount,
          trans_profit: request.amount * 0.1,
          trans_volume_ratio: 1,
          balance_Before: 1000,
          balance_After: 1000 - request.amount,
          trans_Date: new Date().toISOString(),
          trans_Status: "success",
          createdAt: new Date().toISOString(),
          _id: `mock_${Date.now()}`,
          __v: 0,
        },
      };
    }

    try {
      const response = await apiClient.post<BuyAirtimeResponse>(
        ENDPOINTS.BUY.AIRTIME,
        request
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to buy airtime: ${error}`);
    }
  },

  // Validate electricity meter
  validateMeter: async (
    request: ValidateMeterRequest
  ): Promise<ValidateMeterResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        invalid: false,
        name: "Mock Customer",
        address: "Mock Address",
      };
    }

    try {
      const response = await apiClient.post<ValidateMeterResponse>(
        ENDPOINTS.BUY.VALIDATE_METER,
        request
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to validate meter: ${error}`);
    }
  },

  // Buy electricity
  buyElectricity: async (
    request: BuyElectricityRequest
  ): Promise<BuyElectricityResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        status: 200,
        status_code: "OK",
        msg: "Electricity purchase successful (mock)",
        data: {
          trans_Id: `TXN${Date.now()}`,
          trans_By: "mock_user",
          trans_Type: "electricity",
          trans_Network: "electricity",
          phone_number: request.meterNumber,
          trans_amount: parseFloat(request.amount),
          trans_profit: parseFloat(request.amount) * 0.05,
          trans_volume_ratio: 1,
          balance_Before: 1000,
          balance_After: 1000 - parseFloat(request.amount),
          trans_Date: new Date().toISOString(),
          trans_Status: "success",
          createdAt: new Date().toISOString(),
          _id: `mock_${Date.now()}`,
          __v: 0,
        },
      };
    }

    try {
      const response = await apiClient.post<BuyElectricityResponse>(
        ENDPOINTS.BUY.ELECTRICITY,
        request
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to buy electricity: ${error}`);
    }
  },

  // Get available discos
  getDiscos: async (): Promise<GetDiscosResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        discos: [
          { id: "1", name: "Mock Disco 1", code: "MD1" },
          { id: "2", name: "Mock Disco 2", code: "MD2" },
        ],
      };
    }

    try {
      const response = await apiClient.get<GetDiscosResponse>(
        ENDPOINTS.BUY.GET_DISCOS
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch discos: ${error}`);
    }
  },
};
