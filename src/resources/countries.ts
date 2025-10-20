import type { HttpClient } from '../client/HttpClient';
import type { Country } from '../types/api';

/**
 * Countries resource for country operations
 */
export class CountriesResource {
  constructor(private http: HttpClient) {}

  /**
   * Get all countries
   * GET /countries
   *
   * @returns Array of countries
   */
  async list(): Promise<Country[]> {
    return this.http.get<Country[]>('/countries');
  }

  /**
   * Get specific country information
   * GET /countries/{country}
   *
   * @param country - Country code
   * @returns Country information
   */
  async get(country: string): Promise<Country> {
    return this.http.get<Country>(`/countries/${country}`);
  }
}
