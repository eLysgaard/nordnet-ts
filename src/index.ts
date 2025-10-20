/**
 * Nordnet TypeScript SDK
 *
 * A complete TypeScript SDK for the Nordnet External API
 *
 * @example
 * ```typescript
 * import { NordnetClient } from 'nordnet-ts';
 *
 * const client = new NordnetClient({
 *   sessionId: 'your-session-id',
 * });
 *
 * const accounts = await client.accounts.list();
 * ```
 */

export { NordnetClient } from './client/NordnetClient';
export { HttpClient } from './client/HttpClient';

// Export all types
export * from './types';

// Export all errors
export * from './errors';

// Export resources
export { AuthResource } from './resources/auth';
export { AccountsResource } from './resources/accounts';
export { OrdersResource } from './resources/orders';
export { InstrumentsResource } from './resources/instruments';
export { MarketsResource } from './resources/markets';
export { NewsResource } from './resources/news';
export { SearchResource } from './resources/search';
export { TradablesResource } from './resources/tradables';
export { CountriesResource } from './resources/countries';
export { SystemResource } from './resources/system';
