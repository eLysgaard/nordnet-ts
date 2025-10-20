import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HttpClient } from '../../src/client/HttpClient';
import {
  AuthenticationError,
  RateLimitError,
  NotFoundError,
  NetworkError,
} from '../../src/errors';

describe('HttpClient', () => {
  let httpClient: HttpClient;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    httpClient = new HttpClient({
      sessionId: 'test-session',
      baseUrl: 'https://api.test.com',
      timeout: 5000,
    });

    fetchMock = vi.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET requests', () => {
    it('should make successful GET request', async () => {
      const mockData = { accid: 123, accno: '123456' };

      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      const result = await httpClient.get('/accounts');

      expect(result).toEqual(mockData);
      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.test.com/accounts',
        expect.objectContaining({
          method: 'GET',
        })
      );
    });

    it('should include query parameters', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [],
      });

      await httpClient.get('/accounts', {
        params: { limit: 10, offset: 20 },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.test.com/accounts?limit=10&offset=20',
        expect.any(Object)
      );
    });

    it('should include authorization header', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [],
      });

      await httpClient.get('/accounts');

      const call = fetchMock.mock.calls[0];
      const headers = call[1].headers;

      expect(headers.Authorization).toContain('Basic');
    });
  });

  describe('POST requests', () => {
    it('should make successful POST request', async () => {
      const mockResponse = { order_id: 456 };
      const requestBody = { side: 'BUY', volume: 100 };

      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      });

      const result = await httpClient.post('/orders', requestBody);

      expect(result).toEqual(mockResponse);
      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.test.com/orders',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(requestBody),
        })
      );
    });
  });

  describe('error handling', () => {
    it('should throw AuthenticationError on 401', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ message: 'Unauthorized' }),
      });

      await expect(httpClient.get('/accounts')).rejects.toThrow(
        AuthenticationError
      );
    });

    it('should throw RateLimitError on 429', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 429,
        headers: new Map([['Retry-After', '60']]),
        json: async () => ({ message: 'Too many requests' }),
      });

      await expect(httpClient.get('/accounts')).rejects.toThrow(
        RateLimitError
      );
    });

    it('should throw NotFoundError on 404', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ message: 'Not found' }),
      });

      await expect(httpClient.get('/accounts/999')).rejects.toThrow(
        NotFoundError
      );
    });

    it('should throw NetworkError on timeout', async () => {
      const abortError = new Error('Aborted');
      abortError.name = 'AbortError';
      fetchMock.mockRejectedValueOnce(abortError);

      await expect(httpClient.get('/accounts')).rejects.toThrow(NetworkError);
    });
  });

  describe('session management', () => {
    it('should set session ID', () => {
      httpClient.setSessionId('new-session-id');
      expect(httpClient.getSessionId()).toBe('new-session-id');
    });

    it('should clear session ID', () => {
      httpClient.clearSession();
      expect(httpClient.getSessionId()).toBeUndefined();
    });
  });
});
