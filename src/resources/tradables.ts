import type { HttpClient } from '../client/HttpClient';
import type {
  TradableInfo,
  TradablePublicTrades,
  TradableEligibility,
} from '../types/api';

/**
 * Tradables resource for tradable operations
 */
export class TradablesResource {
  constructor(private http: HttpClient) {}

  /**
   * Get tradable information
   * GET /tradables/info/{tradables}
   *
   * @param tradables - Comma-separated list of market_id:identifier pairs
   * @returns Array of tradable information
   */
  async getInfo(tradables: string): Promise<TradableInfo[]> {
    return this.http.get<TradableInfo[]>(`/tradables/info/${tradables}`);
  }

  /**
   * Get tradable trades
   * GET /tradables/trades/{tradables}
   *
   * @param tradables - Comma-separated list of market_id:identifier pairs
   * @returns Array of tradable trades
   */
  async getTrades(tradables: string): Promise<TradablePublicTrades[]> {
    return this.http.get<TradablePublicTrades[]>(
      `/tradables/trades/${tradables}`
    );
  }

  /**
   * Validate tradable suitability
   * GET /tradables/validation/suitability/{tradables}
   *
   * @param tradables - Comma-separated list of market_id:identifier pairs
   * @returns Array of suitability results
   */
  async validateSuitability(tradables: string): Promise<TradableEligibility[]> {
    return this.http.get<TradableEligibility[]>(
      `/tradables/validation/suitability/${tradables}`
    );
  }
}
