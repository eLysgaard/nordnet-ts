import type { HttpClient } from '../client/HttpClient';
import type { Status, TicksizeTable } from '../types/api';

/**
 * System resource for system status and configuration
 */
export class SystemResource {
  constructor(private http: HttpClient) {}

  /**
   * Get system status
   * GET /
   *
   * @returns System status information
   */
  async getStatus(): Promise<Status> {
    return this.http.get<Status>('/');
  }

  /**
   * Get all tick sizes
   * GET /tick_sizes
   *
   * @returns Array of tick size tables
   */
  async getTickSizes(): Promise<TicksizeTable[]> {
    return this.http.get<TicksizeTable[]>('/tick_sizes');
  }

  /**
   * Get specific tick size table
   * GET /tick_sizes/{tick_size_id}
   *
   * @param tickSizeId - Tick size table identifier
   * @returns Tick size table
   */
  async getTickSize(tickSizeId: number): Promise<TicksizeTable> {
    return this.http.get<TicksizeTable>(`/tick_sizes/${tickSizeId}`);
  }
}
