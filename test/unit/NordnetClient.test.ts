import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NordnetClient } from '../../src';
import { ConfigurationError } from '../../src/errors';

describe('NordnetClient', () => {
  describe('initialization', () => {
    it('should create client with session ID', () => {
      const client = new NordnetClient({
        sessionId: 'test-session-123',
      });

      expect(client).toBeInstanceOf(NordnetClient);
      expect(client.getSessionId()).toBe('test-session-123');
    });

    it('should create client without session ID', () => {
      const client = new NordnetClient();

      expect(client).toBeInstanceOf(NordnetClient);
      expect(client.getSessionId()).toBeUndefined();
    });

    it('should create client with custom config', () => {
      const client = new NordnetClient({
        baseUrl: 'https://custom.api.com',
        timeout: 5000,
        language: 'sv',
      });

      expect(client).toBeInstanceOf(NordnetClient);
    });

    it('should throw on invalid timeout', () => {
      expect(
        () =>
          new NordnetClient({
            timeout: -1,
          })
      ).toThrow(ConfigurationError);
    });
  });

  describe('session management', () => {
    it('should set session ID', () => {
      const client = new NordnetClient();

      expect(client.getSessionId()).toBeUndefined();

      client.setSessionId('new-session');
      expect(client.getSessionId()).toBe('new-session');
    });

    it('should clear session', () => {
      const client = new NordnetClient({
        sessionId: 'test-session',
      });

      expect(client.getSessionId()).toBe('test-session');

      client.clearSession();
      expect(client.getSessionId()).toBeUndefined();
    });
  });

  describe('resources', () => {
    it('should have all resource properties', () => {
      const client = new NordnetClient();

      expect(client.auth).toBeDefined();
      expect(client.accounts).toBeDefined();
      expect(client.orders).toBeDefined();
      expect(client.instruments).toBeDefined();
      expect(client.markets).toBeDefined();
      expect(client.news).toBeDefined();
      expect(client.search).toBeDefined();
      expect(client.tradables).toBeDefined();
      expect(client.countries).toBeDefined();
      expect(client.system).toBeDefined();
    });
  });
});
