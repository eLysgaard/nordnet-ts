import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AccountsResource } from '../../src/resources/accounts';
import type { HttpClient } from '../../src/client/HttpClient';

describe('AccountsResource', () => {
  let accountsResource: AccountsResource;
  let mockHttp: HttpClient;

  beforeEach(() => {
    mockHttp = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    } as unknown as HttpClient;

    accountsResource = new AccountsResource(mockHttp);
  });

  describe('list', () => {
    it('should list accounts', async () => {
      const mockAccounts = [
        { accid: 123, accno: '123456', type: 'NORMAL', is_default: true, is_blocked: false },
      ];

      vi.mocked(mockHttp.get).mockResolvedValueOnce(mockAccounts);

      const result = await accountsResource.list();

      expect(result).toEqual(mockAccounts);
      expect(mockHttp.get).toHaveBeenCalledWith('/accounts', { params: {} });
    });

    it('should include credit accounts when requested', async () => {
      vi.mocked(mockHttp.get).mockResolvedValueOnce([]);

      await accountsResource.list({ includeCreditAccounts: true });

      expect(mockHttp.get).toHaveBeenCalledWith('/accounts', {
        params: { include_credit_accounts: true },
      });
    });
  });

  describe('getInfo', () => {
    it('should get info for single account', async () => {
      const mockInfo = [{ accid: 123, account_sum: 10000 }];

      vi.mocked(mockHttp.get).mockResolvedValueOnce(mockInfo);

      const result = await accountsResource.getInfo(123);

      expect(result).toEqual(mockInfo);
      expect(mockHttp.get).toHaveBeenCalledWith('/accounts/123/info', {
        params: {},
      });
    });

    it('should get info for multiple accounts', async () => {
      const mockInfo = [{ accid: 123 }, { accid: 456 }];

      vi.mocked(mockHttp.get).mockResolvedValueOnce(mockInfo);

      await accountsResource.getInfo([123, 456]);

      expect(mockHttp.get).toHaveBeenCalledWith('/accounts/123,456/info', {
        params: {},
      });
    });
  });

  describe('getPositions', () => {
    it('should get positions for account', async () => {
      const mockPositions = [{ accid: 123, qty: 100 }];

      vi.mocked(mockHttp.get).mockResolvedValueOnce(mockPositions);

      const result = await accountsResource.getPositions(123);

      expect(result).toEqual(mockPositions);
      expect(mockHttp.get).toHaveBeenCalledWith('/accounts/123/positions', {
        params: {},
      });
    });
  });

  describe('getTrades', () => {
    it('should get trades for account', async () => {
      const mockTrades = [{ trade_id: 'T123', volume: 50 }];

      vi.mocked(mockHttp.get).mockResolvedValueOnce(mockTrades);

      const result = await accountsResource.getTrades(123, { days: 7 });

      expect(result).toEqual(mockTrades);
      expect(mockHttp.get).toHaveBeenCalledWith('/accounts/123/trades', {
        params: { days: 7 },
      });
    });
  });
});
