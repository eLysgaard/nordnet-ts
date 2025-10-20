import type { HttpClient } from '../client/HttpClient';
import type { NewsArticle, NewsSource } from '../types/api';

/**
 * News resource for news operations
 */
export class NewsResource {
  constructor(private http: HttpClient) {}

  /**
   * Get news articles
   * GET /news
   *
   * @param options - Optional parameters
   * @param options.instrumentId - Filter by instrument ID
   * @param options.limit - Maximum number of articles to return
   * @returns Array of news articles
   */
  async list(options?: {
    instrumentId?: number;
    limit?: number;
  }): Promise<NewsArticle[]> {
    const params: Record<string, number | undefined> = {};

    if (options?.instrumentId !== undefined) {
      params.instrument_id = options.instrumentId;
    }

    if (options?.limit !== undefined) {
      params.limit = options.limit;
    }

    return this.http.get<NewsArticle[]>('/news', { params });
  }

  /**
   * Get a specific news article
   * GET /news/{item_id}
   *
   * @param itemId - News item identifier
   * @returns News article
   */
  async get(itemId: number): Promise<NewsArticle> {
    return this.http.get<NewsArticle>(`/news/${itemId}`);
  }

  /**
   * Get news sources
   * GET /news_sources
   *
   * @returns Array of news sources
   */
  async getSources(): Promise<NewsSource[]> {
    return this.http.get<NewsSource[]>('/news_sources');
  }
}
