import apiClient from '../infrastructure/client'
import { shouldUseMockData, mockDelay } from '../infrastructure/mock-data'

// Note: The actual API doesn't have dedicated notification management endpoints
// Notifications would need to be handled through other available endpoints
// or implemented when those endpoints become available

export const notificationsApi = {
  // Note: All notification endpoints (getAll, getById, getByAudience, getActive,
  // create, update, delete, toggleStatus, send, schedule, getDeliveryStatus,
  // getStats, bulkDelete, export, import, templates) are not supported by the
  // current API and would need to be implemented when those endpoints become available

  // Placeholder for future implementation
  getAll: async () => {
    throw new Error('Notification management not supported by current API')
  },
  getById: async () => {
    throw new Error('Notification management not supported by current API')
  },
  create: async () => {
    throw new Error('Notification management not supported by current API')
  },
  update: async () => {
    throw new Error('Notification management not supported by current API')
  },
  delete: async () => {
    throw new Error('Notification management not supported by current API')
  },
  toggleStatus: async () => {
    throw new Error('Notification management not supported by current API')
  },
  send: async () => {
    throw new Error('Notification management not supported by current API')
  },
  schedule: async () => {
    throw new Error('Notification management not supported by current API')
  },
  getDeliveryStatus: async () => {
    throw new Error('Notification management not supported by current API')
  },
  getStats: async () => {
    throw new Error('Notification management not supported by current API')
  },
  bulkDelete: async () => {
    throw new Error('Notification management not supported by current API')
  },
} 