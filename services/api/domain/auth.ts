import {
  ApiResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  DeleteUserResponse,
  GetUsersResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RequestPasswordResetRequest,
  RequestPasswordResetResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UpgradeUserResponse,
  User,
} from "../../types";
import apiClient, { setAuthToken } from "../infrastructure/client";
import { ENDPOINTS } from "../infrastructure/endpoint";
import {
  mockDelay,
  mockLoginResponse,
  shouldUseMockData,
} from "../infrastructure/mock-data";

export const authApi = {
  // Login user
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginResponse>(
        ENDPOINTS.USER.LOGIN,
        credentials
      );

      // Set token in client and localStorage
      if (response.data.token) {
        setAuthToken(response.data.token);
      }

      return response.data;
    } catch (error: any) {
      // In development, fall back to mock data if API fails
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "API login failed, falling back to mock data:",
          error.message
        );

        // Try mock validation as fallback
        if (
          credentials.userName === "testing@gmail.com" &&
          credentials.password === "testing"
        ) {
          await mockDelay();
          setAuthToken(mockLoginResponse.token);
          return mockLoginResponse;
        } else {
          throw new Error(
            "Invalid credentials (API unavailable, using mock validation)"
          );
        }
      }

      console.error("Login API call failed:", error);
      throw error;
    }
  },

  // User registration
  register: async (request: RegisterRequest): Promise<RegisterResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        status: 200,
        status_code: "OK",
        token: mockLoginResponse.token,
        data: mockLoginResponse.data,
        msg: "Registration successful (mock)",
      };
    }

    try {
      const response = await apiClient.post<RegisterResponse>(
        ENDPOINTS.USER.SIGNUP,
        request
      );

      // Set token if provided
      if (response.data.token) {
        setAuthToken(response.data.token);
      }

      return response.data;
    } catch (error: any) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "API registration failed, falling back to mock data:",
          error.message
        );
        await mockDelay();
        return {
          status: 200,
          status_code: "OK",
          token: mockLoginResponse.token,
          data: mockLoginResponse.data,
          msg: "Registration successful (mock)",
        };
      }
      throw error;
    }
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>(
      ENDPOINTS.USER.PROFILE
    );
    return response.data.data;
  },

  // Update user profile
  updateUser: async (
    id: string,
    request: UpdateUserRequest
  ): Promise<UpdateUserResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        msg: "User updated successfully (mock)",
      };
    }

    const response = await apiClient.patch<UpdateUserResponse>(
      ENDPOINTS.USER.UPDATE_PROFILE(id),
      request
    );
    return response.data;
  },

  // Delete user
  deleteUser: async (id: string): Promise<DeleteUserResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        msg: "User deleted successfully (mock)",
      };
    }

    const response = await apiClient.get<DeleteUserResponse>(
      ENDPOINTS.USER.DELETE_USER(id)
    );
    return response.data;
  },

  // Upgrade user
  upgradeUser: async (): Promise<UpgradeUserResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        msg: "User upgraded successfully (mock)",
      };
    }

    const response = await apiClient.get<UpgradeUserResponse>(
      ENDPOINTS.USER.UPGRADE
    );
    return response.data;
  },

  // Request password reset
  requestPasswordReset: async (
    request: RequestPasswordResetRequest
  ): Promise<RequestPasswordResetResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        msg: "Password reset email sent (mock)",
      };
    }

    const response = await apiClient.post<RequestPasswordResetResponse>(
      ENDPOINTS.USER.REQUEST_PASSWORD_RESET,
      request
    );
    return response.data;
  },

  // Reset password with token
  resetPassword: async (
    request: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        msg: "Password reset successfully (mock)",
      };
    }

    const response = await apiClient.post<ResetPasswordResponse>(
      ENDPOINTS.USER.PASSWORD_RESET,
      request
    );
    return response.data;
  },

  // Change password
  changePassword: async (
    request: ChangePasswordRequest
  ): Promise<ChangePasswordResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        msg: "Password changed successfully (mock)",
      };
    }

    const response = await apiClient.post<ChangePasswordResponse>(
      ENDPOINTS.USER.CHANGE_PASSWORD,
      request
    );
    return response.data;
  },

  // Get all users (admin only)
  getAllUsers: async (): Promise<GetUsersResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        status: 200,
        status_code: "OK",
        data: [mockLoginResponse.data],
        msg: "Users retrieved successfully (mock)",
      };
    }

    const response = await apiClient.get<GetUsersResponse>(
      ENDPOINTS.USER.GET_ALL_USERS
    );
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    // In development or when using mock data, just clear the token
    if (shouldUseMockData()) {
      console.log("Logout: Clearing mock session");
      setAuthToken(null);
      return;
    }

    // Always clear local token regardless of API response
    try {
      // Try to notify server about logout (if API is available)
      if (process.env.NEXT_PUBLIC_API_BASE_URL) {
        await apiClient.post("/auth/logout");
        console.log("Logout: Server notified successfully");
      }
    } catch (error) {
      // Even if logout fails on server, we still clear local token
      console.warn(
        "Logout: Server notification failed, but clearing local session:",
        error
      );
    } finally {
      // Always clear local authentication data
      setAuthToken(null);
      console.log("Logout: Local session cleared");
    }
  },

  // Refresh token
  refreshToken: async (): Promise<{ token: string }> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return { token: mockLoginResponse.token };
    }

    const response = await apiClient.post<ApiResponse<{ token: string }>>(
      "/auth/refresh"
    );

    // Update token in client and localStorage
    if (response.data.success && response.data.data.token) {
      setAuthToken(response.data.data.token);
    }

    return response.data.data;
  },

  // Verify token validity
  verifyToken: async (): Promise<boolean> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return true;
    }

    try {
      await apiClient.get("/auth/verify");
      return true;
    } catch (error) {
      setAuthToken(null);
      return false;
    }
  },
};
