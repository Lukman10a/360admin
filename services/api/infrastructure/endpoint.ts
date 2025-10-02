export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://mobileappserver-3hcm.onrender.com/api/v1";

export const ENDPOINTS = {
  USER: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/register",
    PROFILE: "/auth",
    UPDATE_PROFILE: (id: string) => `/auth/user/${id}`,
    REQUEST_PASSWORD_RESET: "/auth/requestPasswordReset",
    CHANGE_PASSWORD: "/auth/changePassword",
    PASSWORD_RESET: "/auth/resetPassword",
    UPGRADE: "/auth/upgrade",
    DELETE_USER: (id: string) => `/auth/user/${id}`,
    GET_ALL_USERS: "/auth/users", // New endpoint for getting all users
  },
  CONTACT: {
    ADD: "/auth/contact",
    GET_ALL: "/auth/contact",
    UPDATE: (id: string) => `/auth/contact/${id}`,
    DELETE: (id: string) => `/auth/contact/${id}`,
  },
  BUY: {
    DATA: "/buy/data",
    AIRTIME: "/buy/airtime",
    GET_DISCOS: "/buy/fetchDiscos",
    ELECTRICITY: "/buy/electricity",
    VALIDATE_METER: "/buy/validatemeter",
  },
  PLANS: {
    PRICES: (networkId: string) => `/dataPlan/prices/${networkId}`,
    GET_ALL: () => `/dataPlan`,
    ADD: "/dataPlan/add",
    UPDATE: "/dataPlan/update",
    DELETE: (planId: string) => `/dataPlan/delete?planId=${planId}`,
  },
  TRANSACTIONS: {
    GET_ALL: "/transactions/all",
    SEARCH: "/transactions", // Supports query parameters: type, phoneNumber, transactionId, userName, status
  },
  FUND_TRANSFER: {
    USER_WALLET: "/auth/transferFund", // For user-to-user transfers
    ADMIN_TRANSFER: "/admin/transferFund", // For admin transfers to users
  },
  ADMIN: {
    USERS: "/admin/users",
    GENERATE_COUPON: "/admin/generatecoupon",
    REFUND: (transactionId: string) => `/admin/refund/${transactionId}`,
  },
  PRICES: {
    GET_ALL: "/prices", // Supports POST with network parameter
    AIRTIME: "/prices/airtime", //NOT AVAILABLE ON THE BACKEND YET
    DATA: "/prices/data", //NOT AVAILABLE ON THE BACKEND YET
    ELECTRICITY: "/prices/electricity", //NOT AVAILABLE ON THE BACKEND YET
    CABLE_TV: "/prices/cabletv", //NOT AVAILABLE ON THE BACKEND YET
  },
} as const;
