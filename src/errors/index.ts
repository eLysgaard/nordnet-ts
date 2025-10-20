/**
 * Custom error classes for Nordnet SDK
 */

/**
 * Base error class for all Nordnet SDK errors
 */
export class NordnetError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NordnetError';
    Object.setPrototypeOf(this, NordnetError.prototype);
  }
}

/**
 * API error with HTTP status and response details
 */
export class APIError extends NordnetError {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public response?: unknown
  ) {
    super(message);
    this.name = 'APIError';
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

/**
 * Authentication error (401)
 */
export class AuthenticationError extends APIError {
  constructor(message: string = 'Invalid session or authentication failed') {
    super(message, 401);
    this.name = 'AuthenticationError';
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

/**
 * Authorization error (403)
 */
export class AuthorizationError extends APIError {
  constructor(
    message: string = 'User does not have privileges to access this resource'
  ) {
    super(message, 403);
    this.name = 'AuthorizationError';
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

/**
 * Rate limit error (429)
 */
export class RateLimitError extends APIError {
  constructor(
    message: string = 'Rate limit exceeded',
    public retryAfter?: number
  ) {
    super(message, 429);
    this.name = 'RateLimitError';
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}

/**
 * Not found error (404)
 */
export class NotFoundError extends APIError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Bad request error (400)
 */
export class BadRequestError extends APIError {
  constructor(message: string = 'Invalid request parameters') {
    super(message, 400);
    this.name = 'BadRequestError';
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

/**
 * Service unavailable error (503)
 */
export class ServiceUnavailableError extends APIError {
  constructor(
    message: string = 'Service temporarily unavailable',
    public retryAfter?: number
  ) {
    super(message, 503);
    this.name = 'ServiceUnavailableError';
    Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
  }
}

/**
 * Network error (timeout, connection failure, etc.)
 */
export class NetworkError extends NordnetError {
  constructor(
    message: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

/**
 * Configuration error
 */
export class ConfigurationError extends NordnetError {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
    Object.setPrototypeOf(this, ConfigurationError.prototype);
  }
}
