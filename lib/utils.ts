import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format amount to Nigerian Naira currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
}

/**
 * Network ID to name mapping
 */
export const NETWORK_NAMES = {
  "1": "MTN",
  "2": "GLO",
  "3": "AIRTEL",
  "4": "9MOBILE",
} as const;

/**
 * Network name to ID mapping
 */
export const NETWORK_IDS = {
  MTN: "1",
  GLO: "2",
  AIRTEL: "3",
  "9MOBILE": "4",
} as const;

/**
 * Get network name from ID
 */
export function getNetworkName(networkId: string): string {
  return NETWORK_NAMES[networkId as keyof typeof NETWORK_NAMES] || "Unknown";
}

/**
 * Get network ID from name
 */
export function getNetworkId(networkName: string): string | null {
  return (
    NETWORK_IDS[networkName.toUpperCase() as keyof typeof NETWORK_IDS] || null
  );
}

/**
 * Format date string to Nigerian locale
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
