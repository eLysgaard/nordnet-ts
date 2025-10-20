import type { HttpClient } from '../client/HttpClient';
import type { Market, MarketInfo } from '../types/api';

/**
 * Markets resource for market operations
 */
export class MarketsResource {
  constructor(private http: HttpClient) {}

  /**
   * Get all markets
   * GET /markets
   *
   * @returns Array of markets
   */
  async list(): Promise<Market[]> {
    return this.http.get<Market[]>('/markets');
  }

  /**
   * Get market information
   * GET /markets/{market_id}
   *
   * @param marketId - Market identifier
   * @returns Market information
   */
  async get(marketId: number): Promise<MarketInfo> {
    return this.http.get<MarketInfo>(`/markets/${marketId}`);
  }
}
