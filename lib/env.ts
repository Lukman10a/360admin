// Environment configuration helper

export const env = {
  // Check if we're in development mode
  isDevelopment: process.env.NODE_ENV === 'development',
  
  // Check if we're in production mode
  isProduction: process.env.NODE_ENV === 'production',
  
  // API configuration
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  
  // Check if API is configured
  isApiConfigured: !!process.env.NEXT_PUBLIC_API_BASE_URL,
  
  // Check if we should use mock data (development mode without API)
  shouldUseMockData: process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_API_BASE_URL,
}

// Helper to get environment-specific console logging
export const createLogger = (context: string) => ({
  info: (...args: any[]) => {
    if (env.isDevelopment) {
      console.info(`[${context}]`, ...args)
    }
  },
  warn: (...args: any[]) => {
    if (env.isDevelopment) {
      console.warn(`[${context}]`, ...args)
    }
  },
  error: (...args: any[]) => {
    if (env.isDevelopment) {
      console.error(`[${context}]`, ...args)
    }
  },
  debug: (...args: any[]) => {
    if (env.isDevelopment && env.isApiConfigured) {
      console.debug(`[${context}]`, ...args)
    }
  }
}) 