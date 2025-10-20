import type { NordnetConfig, RequestOptions } from '../types/config';
import type { Language } from '../types/api';
import {
  APIError,
  AuthenticationError,
  AuthorizationError,
  RateLimitError,
  NotFoundError,
  BadRequestError,
  ServiceUnavailableError,
  NetworkError,
} from '../errors';

/**
 * HTTP client for making requests to the Nordnet API
 */
export class HttpClient {
  private baseUrl: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;
  private debug: boolean;
  private sessionId: string | undefined;
  private language: Language;

  constructor(config: NordnetConfig) {
    this.baseUrl = config.baseUrl || 'https://public.nordnet.se/api/2';
    this.timeout = config.timeout || 30000;
    this.language = config.language || 'en';
    this.debug = config.debug || false;
    this.sessionId = config.sessionId;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': this.language,
      ...config.headers,
    };
  }

  /**
   * Set the session ID for authentication
   */
  setSessionId(sessionId: string): void {
    this.sessionId = sessionId;
  }

  /**
   * Get the current session ID
   */
  getSessionId(): string | undefined {
    return this.sessionId;
  }

  /**
   * Clear the session ID
   */
  clearSession(): void {
    this.sessionId = undefined;
  }

  /**
   * Make a GET request
   */
  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('GET', path, undefined, options);
  }

  /**
   * Make a POST request
   */
  async post<T>(
    path: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>('POST', path, body, options);
  }

  /**
   * Make a PUT request
   */
  async put<T>(
    path: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>('PUT', path, body, options);
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('DELETE', path, undefined, options);
  }

  /**
   * Make an HTTP request
   */
  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const url = this.buildUrl(path, options?.params);
    const headers = this.buildHeaders(options?.headers);
    const controller = new AbortController();
    const timeoutMs = options?.timeout || this.timeout;

    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      if (this.debug) {
        console.log(`[Nordnet SDK] ${method} ${url}`);
        if (body) {
          console.log('[Nordnet SDK] Request body:', body);
        }
      }

      const requestInit: RequestInit = {
        method,
        headers,
        signal: controller.signal,
      };

      if (body !== undefined) {
        requestInit.body = JSON.stringify(body);
      }

      const response = await fetch(url, requestInit);

      clearTimeout(timeoutId);

      return await this.handleResponse<T>(response);
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === 'AbortError') {
        throw new NetworkError('Request timeout', error);
      }

      if (error instanceof APIError) {
        throw error;
      }

      throw new NetworkError(
        error instanceof Error ? error.message : 'Network error',
        error instanceof Error ? error : undefined
      );
    }
  }

  /**
   * Build the full URL with query parameters
   */
  private buildUrl(
    path: string,
    params?: Record<string, unknown>
  ): string {
    const url = new URL(`${this.baseUrl}${path}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            // Handle array parameters
            value.forEach((v) => url.searchParams.append(key, String(v)));
          } else if (typeof value === 'object') {
            // Handle nested objects by JSON stringifying
            url.searchParams.append(key, JSON.stringify(value));
          } else {
            url.searchParams.append(key, String(value));
          }
        }
      });
    }

    return url.toString();
  }

  /**
   * Build request headers
   */
  private buildHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      ...this.defaultHeaders,
      ...customHeaders,
    };

    // Add authorization header if session ID is available
    if (this.sessionId) {
      const credentials = Buffer.from(
        `${this.sessionId}:${this.sessionId}`
      ).toString('base64');
      headers['Authorization'] = `Basic ${credentials}`;
    }

    return headers;
  }

  /**
   * Handle HTTP response
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (this.debug) {
      console.log(`[Nordnet SDK] Response status: ${response.status}`);
    }

    // Handle successful responses
    if (response.ok) {
      // 204 No Content
      if (response.status === 204) {
        return undefined as T;
      }

      const data = await response.json();

      if (this.debug) {
        console.log('[Nordnet SDK] Response data:', data);
      }

      return data as T;
    }

    // Handle error responses
    await this.handleErrorResponse(response);

    // This line should never be reached due to the throw in handleErrorResponse
    throw new APIError('Unknown error', response.status);
  }

  /**
   * Handle error response
   */
  private async handleErrorResponse(response: Response): Promise<never> {
    let errorBody: unknown;
    let errorMessage = `Request failed with status ${response.status}`;

    try {
      errorBody = await response.json();
      if (
        errorBody &&
        typeof errorBody === 'object' &&
        'message' in errorBody
      ) {
        errorMessage =
          (errorBody as { message: string }).message || errorMessage;
      }
    } catch {
      // If JSON parsing fails, try to get text
      try {
        const text = await response.text();
        if (text) {
          errorMessage = text;
        }
      } catch {
        // Ignore text parsing errors
      }
    }

    if (this.debug) {
      console.error(`[Nordnet SDK] Error ${response.status}:`, errorMessage);
    }

    // Map status codes to specific error types
    switch (response.status) {
      case 400:
        throw new BadRequestError(errorMessage);
      case 401:
        throw new AuthenticationError(errorMessage);
      case 403:
        throw new AuthorizationError(errorMessage);
      case 404:
        throw new NotFoundError(errorMessage);
      case 429: {
        const retryAfter = response.headers.get('Retry-After');
        throw new RateLimitError(
          errorMessage,
          retryAfter ? parseInt(retryAfter, 10) : undefined
        );
      }
      case 503: {
        const retryAfter = response.headers.get('Retry-After');
        throw new ServiceUnavailableError(
          errorMessage,
          retryAfter ? parseInt(retryAfter, 10) : undefined
        );
      }
      default:
        throw new APIError(
          errorMessage,
          response.status,
          undefined,
          errorBody
        );
    }
  }
}
