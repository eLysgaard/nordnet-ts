# Nordnet TypeScript SDK

A complete, type-safe TypeScript SDK for the [Nordnet External API](https://www.nordnet.dk/externalapi/docs/api).

## Features

- **Complete Type Safety**: Full TypeScript support with comprehensive type definitions
- **Universal**: Works in both Node.js (18+) and browser environments
- **Simple & Lean**: Minimal abstractions, straightforward API
- **Full API Coverage**: All Nordnet API v2.0 endpoints implemented
- **Authentication**: Supports both session ID and full login flow
- **Error Handling**: Comprehensive error types for better error management
- **Modern**: Built with latest TypeScript features and native fetch API

## Installation

```bash
npm install nordnet-ts
# or
yarn add nordnet-ts
# or
pnpm add nordnet-ts
```

## Quick Start

### With Existing Session ID

```typescript
import { NordnetClient } from 'nordnet-ts';

const client = new NordnetClient({
  sessionId: 'your-session-id',
});

// Get accounts
const accounts = await client.accounts.list();
console.log(accounts);

// Get positions
const positions = await client.accounts.getPositions(accounts[0].accid);
console.log(positions);
```

### With Login Flow

```typescript
import { NordnetClient } from 'nordnet-ts';

const client = await NordnetClient.login(
  {
    username: 'your-username',
    password: 'your-password',
  },
  async () => {
    // Prompt user for 2FA code
    return '123456'; // Return the 2FA code
  }
);

// Now you can use the client
const accounts = await client.accounts.list();
```

## Configuration

```typescript
const client = new NordnetClient({
  // Optional: Session ID if already authenticated
  sessionId: 'your-session-id',

  // Optional: Base URL (default: https://public.nordnet.se/api/2)
  baseUrl: 'https://public.nordnet.se/api/2',

  // Optional: Request timeout in milliseconds (default: 30000)
  timeout: 30000,

  // Optional: Preferred language for responses (default: 'en')
  language: 'sv', // 'da' | 'de' | 'en' | 'fi' | 'nb' | 'nn' | 'no' | 'sv'

  // Optional: Custom headers for all requests
  headers: {
    'X-Custom-Header': 'value',
  },

  // Optional: Enable debug logging (default: false)
  debug: true,
});
```

## API Reference

### Authentication

```typescript
// Start login process
const challenge = await client.auth.startLogin({
  username: 'user',
  password: 'pass',
});

// Verify login with 2FA code
const loginResponse = await client.auth.verifyLogin({
  challenge_response: '123456',
  session_key: challenge.session_key,
});

// Touch/refresh session
await client.auth.touchSession();

// Logout
await client.auth.logout();
```

### Accounts

```typescript
// List accounts
const accounts = await client.accounts.list({
  includeCreditAccounts: false,
});

// Get account information
const accountInfo = await client.accounts.getInfo(123456);

// Multiple accounts
const multipleAccountsInfo = await client.accounts.getInfo([123456, 789012]);

// Get ledger information
const ledgers = await client.accounts.getLedgers(123456);

// Get positions
const positions = await client.accounts.getPositions(123456, {
  includeInstrumentLoans: false,
  includeIntradayLimit: false,
});

// Get trades
const trades = await client.accounts.getTrades(123456, {
  days: 7, // 0-7 days, default 0 (today only)
});

// Get today's transactions
const transactions = await client.accounts.getTransactionsToday(123456);
```

### Orders

```typescript
// List orders
const orders = await client.orders.list(123456, {
  deleted: false, // Include deleted orders from today
});

// Create order
const orderReply = await client.orders.create(123456, {
  market_id: 11,
  identifier: '3456',
  side: 'BUY',
  volume: 100,
  price: 150.5,
  currency: 'SEK',
  order_type: 'LIMIT',
  valid_until: '2024-12-31',
  reference: 'My order reference',
});

// Modify order
const modifyReply = await client.orders.modify(123456, orderReply.order_id, {
  price: 151.0,
  volume: 150,
});

// Cancel order
await client.orders.delete(123456, orderReply.order_id);

// Activate inactive order
await client.orders.activate(123456, orderReply.order_id);

// Activate multiple orders
await client.orders.activate(123456, [orderId1, orderId2]);
```

### Instruments

```typescript
// Get instrument by ID
const instrument = await client.instruments.get(16105486);

// Lookup by ISIN or symbol
const byIsin = await client.instruments.lookup('isin', 'US0378331005');
const bySymbol = await client.instruments.lookup('symbol', 'AAPL');

// Get instrument types
const types = await client.instruments.getTypes();

// Get instrument trades
const trades = await client.instruments.getTrades(16105486);

// Get underlying instruments for derivatives
const underlyings = await client.instruments.getUnderlyings(
  'bull_bear',
  'SEK'
);

// Validate instrument suitability
const suitability = await client.instruments.validateSuitability(16105486);

// Search stock list
const stocks = await client.instruments.searchStockList({
  country: ['US'],
  currency: ['USD'],
  sector: ['Technology'],
  limit: 50,
  offset: 0,
});

// Search bull & bear list
const bullBear = await client.instruments.searchBullBearList({
  country: ['SE'],
  underlying_instrument: ['16105486'],
});

// Search option pairs
const options = await client.instruments.searchOptionPairs({
  underlying_instrument: ['16105486'],
  expiration_date: ['2024-12-20'],
});
```

### Markets

```typescript
// List all markets
const markets = await client.markets.list();

// Get market information
const marketInfo = await client.markets.get(11);
```

### News

```typescript
// List news
const news = await client.news.list({
  instrumentId: 16105486,
  limit: 20,
});

// Get specific news article
const article = await client.news.get(123456);

// Get news sources
const sources = await client.news.getSources();
```

### Search

```typescript
// Main search
const results = await client.search.search({
  query: 'AAPL',
  type: 'STOCK',
  limit: 10,
});
```

### Tradables

```typescript
// Get tradable information
const tradableInfo = await client.tradables.getInfo('11:3456');

// Multiple tradables
const multipleTradables = await client.tradables.getInfo('11:3456,12:7890');

// Get tradable trades
const trades = await client.tradables.getTrades('11:3456');

// Validate suitability
const suitability = await client.tradables.validateSuitability('11:3456');
```

### Countries

```typescript
// List all countries
const countries = await client.countries.list();

// Get specific country
const country = await client.countries.get('SE');
```

### System

```typescript
// Get system status
const status = await client.system.getStatus();

// Get tick sizes
const tickSizes = await client.system.getTickSizes();

// Get specific tick size table
const tickSize = await client.system.getTickSize(1);
```

## Error Handling

The SDK provides specific error types for better error handling:

```typescript
import {
  AuthenticationError,
  AuthorizationError,
  RateLimitError,
  NotFoundError,
  BadRequestError,
  ServiceUnavailableError,
  NetworkError,
  NordnetError,
} from 'nordnet-ts';

try {
  const accounts = await client.accounts.list();
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Session expired, please re-authenticate');
    // Handle re-authentication
  } else if (error instanceof RateLimitError) {
    console.error('Rate limit exceeded');
    console.log('Retry after:', error.retryAfter); // seconds
    // Wait and retry
  } else if (error instanceof NotFoundError) {
    console.error('Resource not found');
  } else if (error instanceof NetworkError) {
    console.error('Network error:', error.message);
  } else if (error instanceof NordnetError) {
    console.error('Nordnet SDK error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
}
```

### Error Types

- **AuthenticationError** (401): Invalid session or authentication failed
- **AuthorizationError** (403): User lacks privileges for the resource
- **BadRequestError** (400): Invalid request parameters
- **NotFoundError** (404): Resource not found
- **RateLimitError** (429): Rate limit exceeded (includes `retryAfter` property)
- **ServiceUnavailableError** (503): Service temporarily unavailable (includes `retryAfter` property)
- **NetworkError**: Network issues (timeout, connection failure, etc.)
- **NordnetError**: Base error class for all SDK errors

## TypeScript Support

The SDK provides comprehensive TypeScript types for all API operations:

```typescript
import type {
  Account,
  AccountInfo,
  Order,
  Position,
  Trade,
  Instrument,
  InstrumentInfo,
  Market,
  NewsArticle,
  OrderEntryRequest,
} from 'nordnet-ts';

// All API responses are fully typed
const accounts: Account[] = await client.accounts.list();
const positions: Position[] = await client.accounts.getPositions(123456);
const orders: Order[] = await client.orders.list(123456);
```

## Examples

Check the [examples](./examples) directory for complete usage examples:

- [basic-usage.ts](./examples/basic-usage.ts) - Basic SDK usage
- [login-flow.ts](./examples/login-flow.ts) - Complete authentication flow
- [trading.ts](./examples/trading.ts) - Trading operations
- [market-data.ts](./examples/market-data.ts) - Market data and search

## Rate Limiting

The Nordnet API has rate limits. When you exceed the rate limit, you'll receive a `RateLimitError` with a `retryAfter` property indicating how many seconds to wait before retrying.

```typescript
try {
  const result = await client.accounts.list();
} catch (error) {
  if (error instanceof RateLimitError) {
    const waitSeconds = error.retryAfter || 10;
    console.log(`Rate limited. Waiting ${waitSeconds} seconds...`);
    await new Promise((resolve) => setTimeout(resolve, waitSeconds * 1000));
    // Retry the request
  }
}
```

## Development

```bash
# Install dependencies
npm install

# Build the SDK
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Type check
npm run typecheck

# Lint
npm run lint

# Format code
npm run format
```

## Requirements

- Node.js >= 18.0.0 (for native fetch support)
- TypeScript >= 5.0.0 (if using TypeScript)

## Browser Support

The SDK works in modern browsers that support:
- Native `fetch` API
- `AbortController`
- `Promise`
- ES2022 features

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Disclaimer

This is an unofficial SDK and is not affiliated with or endorsed by Nordnet. Use at your own risk. Always test thoroughly before using in production.

## Support

For issues and questions:
- Open an issue on GitHub
- Check the [Nordnet API documentation](https://www.nordnet.dk/externalapi/docs/api)

## Changelog

### 1.0.0

- Initial release
- Complete API coverage for Nordnet API v2.0
- Full TypeScript support
- Comprehensive error handling
- Both Node.js and browser support
