import type { Language } from './api';

/**
 * Configuration options for the Nordnet API client
 */
export interface NordnetConfig {
  /**
   * Session ID for authentication (if already authenticated)
   */
  sessionId?: string;

  /**
   * Base URL for the API
   * @default 'https://public.nordnet.se/api/2'
   */
  baseUrl?: string;

  /**
   * Request timeout in milliseconds
   * @default 30000
   */
  timeout?: number;

  /**
   * Preferred language for API responses
   * @default 'en'
   */
  language?: Language;

  /**
   * Custom headers to include in all requests
   */
  headers?: Record<string, string>;

  /**
   * Enable debug logging
   * @default false
   */
  debug?: boolean;
}

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG: Required<Omit<NordnetConfig, 'sessionId'>> = {
  baseUrl: 'https://public.nordnet.se/api/2',
  timeout: 30000,
  language: 'en',
  headers: {},
  debug: false,
};

/**
 * Request options for individual API calls
 */
export interface RequestOptions {
  /**
   * Custom timeout for this request
   */
  timeout?: number;

  /**
   * Custom headers for this request
   */
  headers?: Record<string, string>;

  /**
   * Query parameters (can include arrays, objects, etc.)
   */
  params?: Record<string, unknown> | undefined;
}
