import type { HttpClient } from '../client/HttpClient';
import type { MainSearchResponse, SearchParams } from '../types/api';

/**
 * Search resource for main search operations
 */
export class SearchResource {
  constructor(private http: HttpClient) {}

  /**
   * Perform main search across all instrument types
   * GET /main_search
   *
   * @param params - Search parameters
   * @returns Search results
   */
  async search(params: SearchParams): Promise<MainSearchResponse> {
    const queryParams: Record<string, string | number | undefined> = {
      query: params.query,
    };

    if (params.type !== undefined) {
      queryParams.type = params.type;
    }

    if (params.limit !== undefined) {
      queryParams.limit = params.limit;
    }

    return this.http.get<MainSearchResponse>('/main_search', {
      params: queryParams,
    });
  }
}
