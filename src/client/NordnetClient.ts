import { HttpClient } from './HttpClient';
import { AuthResource } from '../resources/auth';
import { AccountsResource } from '../resources/accounts';
import { OrdersResource } from '../resources/orders';
import { InstrumentsResource } from '../resources/instruments';
import { MarketsResource } from '../resources/markets';
import { NewsResource } from '../resources/news';
import { SearchResource } from '../resources/search';
import { TradablesResource } from '../resources/tradables';
import { CountriesResource } from '../resources/countries';
import { SystemResource } from '../resources/system';
import type { NordnetConfig } from '../types/config';
import type { ApiKeyStartLoginRequest } from '../types/api';
import { ConfigurationError } from '../errors';

/**
 * Main Nordnet API client
 *
 * @example
 * ```typescript
 * // With existing session ID
 * const client = new NordnetClient({
 *   sessionId: 'your-session-id',
 * });
 *
 * // Or use the login flow
 * const client = await NordnetClient.login({
 *   username: 'your-username',
 *   password: 'your-password',
 * }, '2fa-code');
 * ```
 */
export class NordnetClient {
  private http: HttpClient;

  /** Authentication operations */
  public readonly auth: AuthResource;

  /** Account operations */
  public readonly accounts: AccountsResource;

  /** Order operations */
  public readonly orders: OrdersResource;

  /** Instrument operations */
  public readonly instruments: InstrumentsResource;

  /** Market operations */
  public readonly markets: MarketsResource;

  /** News operations */
  public readonly news: NewsResource;

  /** Search operations */
  public readonly search: SearchResource;

  /** Tradable operations */
  public readonly tradables: TradablesResource;

  /** Country operations */
  public readonly countries: CountriesResource;

  /** System status and configuration */
  public readonly system: SystemResource;

  /**
   * Create a new Nordnet API client
   *
   * @param config - Client configuration
   */
  constructor(config: NordnetConfig = {}) {
    this.http = new HttpClient(this.validateConfig(config));

    // Initialize all resource classes
    this.auth = new AuthResource(this.http);
    this.accounts = new AccountsResource(this.http);
    this.orders = new OrdersResource(this.http);
    this.instruments = new InstrumentsResource(this.http);
    this.markets = new MarketsResource(this.http);
    this.news = new NewsResource(this.http);
    this.search = new SearchResource(this.http);
    this.tradables = new TradablesResource(this.http);
    this.countries = new CountriesResource(this.http);
    this.system = new SystemResource(this.http);
  }

  /**
   * Login helper - performs the full login flow
   *
   * @param credentials - Username and password
   * @param challenge2FA - Function that returns the 2FA code when called
   * @returns Configured Nordnet client with active session
   *
   * @example
   * ```typescript
   * const client = await NordnetClient.login(
   *   { username: 'user', password: 'pass' },
   *   async () => prompt('Enter 2FA code:')
   * );
   * ```
   */
  static async login(
    credentials: ApiKeyStartLoginRequest,
    challenge2FA: () => Promise<string> | string
  ): Promise<NordnetClient> {
    // Create a temporary client without session
    const client = new NordnetClient();

    // Start login
    const challengeResponse = await client.auth.startLogin(credentials);

    // Get 2FA code from user
    const twoFactorCode =
      typeof challenge2FA === 'function' ? await challenge2FA() : challenge2FA;

    // Verify login
    const loginResponse = await client.auth.verifyLogin({
      challenge_response: twoFactorCode,
      session_key: challengeResponse.session_key,
    });

    // Return a new client with the session
    return new NordnetClient({
      sessionId: loginResponse.session_key,
    });
  }

  /**
   * Get the current session ID
   */
  getSessionId(): string | undefined {
    return this.http.getSessionId();
  }

  /**
   * Set a new session ID
   *
   * @param sessionId - Session identifier
   */
  setSessionId(sessionId: string): void {
    this.http.setSessionId(sessionId);
  }

  /**
   * Clear the current session
   */
  clearSession(): void {
    this.http.clearSession();
  }

  /**
   * Validate configuration
   */
  private validateConfig(config: NordnetConfig): NordnetConfig {
    // Validate timeout
    if (config.timeout !== undefined && config.timeout < 0) {
      throw new ConfigurationError('Timeout must be a positive number');
    }

    return config;
  }
}
