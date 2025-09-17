import { GetPricesRequest, GetPricesResponse } from "../../types";
import apiClient from "../infrastructure/client";
import { ENDPOINTS } from "../infrastructure/endpoint";
import { mockDelay, shouldUseMockData } from "../infrastructure/mock-data";

// Prices API - enhanced with robust error handling and mock fallbacks
export const pricesApi = {
  // Get all prices with optional network filter
  getAll: async (request?: GetPricesRequest): Promise<GetPricesResponse> => {
    try {
      const response = await apiClient.post<GetPricesResponse>(
        ENDPOINTS.PRICES.GET_ALL,
        request || {}
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch prices: ${error}`);
    }
  },

  // Get prices by network
  getByNetwork: async (network: string): Promise<GetPricesResponse> => {
    return pricesApi.getAll({ network });
  },

  // Get airtime prices
  getAirtimePrices: async (): Promise<GetPricesResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        status: 200,
        status_code: "OK",
        data: [
          {
            id: "airtime_100",
            network: "ALL",
            plan: "Airtime Top-up",
            amount: 100,
            validity: "Instant",
            description: "Instant airtime top-up",
          },
          {
            id: "airtime_200",
            network: "ALL",
            plan: "Airtime Top-up",
            amount: 200,
            validity: "Instant",
            description: "Instant airtime top-up",
          },
          {
            id: "airtime_500",
            network: "ALL",
            plan: "Airtime Top-up",
            amount: 500,
            validity: "Instant",
            description: "Instant airtime top-up",
          },
        ],
        msg: "Airtime prices retrieved successfully (mock)",
      };
    }

    try {
      const response = await apiClient.get<GetPricesResponse>(
        ENDPOINTS.PRICES.AIRTIME
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch airtime prices: ${error}`);
    }
  },

  // Get electricity prices
  getElectricityPrices: async (): Promise<GetPricesResponse> => {
    try {
      const response = await apiClient.get<GetPricesResponse>(
        "/prices/electricity"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch electricity prices: ${error}`);
    }
  },

  // Get cable TV prices
  getCableTVPrices: async (): Promise<GetPricesResponse> => {
    try {
      const response = await apiClient.get<GetPricesResponse>(
        "/prices/cabletv"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch cable TV prices: ${error}`);
    }
  },
};
