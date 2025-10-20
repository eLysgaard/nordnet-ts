import { NordnetClient } from '../src';
import { RateLimitError, AuthenticationError } from '../src/errors';

/**
 * Trading example - Place, modify, and cancel orders
 */
async function trading() {
  const client = new NordnetClient({
    sessionId: process.env.NORDNET_SESSION_ID,
  });

  try {
    // Get accounts
    const accounts = await client.accounts.list();
    const accountId = accounts[0].accid;

    // Search for an instrument
    const searchResults = await client.search.search({
      query: 'AAPL',
      type: 'STOCK',
      limit: 5,
    });

    console.log('Search results:', searchResults);

    if (searchResults.results.length > 0) {
      const instrument = searchResults.results[0];

      // Create a limit buy order
      const orderReply = await client.orders.create(accountId, {
        market_id: instrument.market_id,
        identifier: String(instrument.instrument_id),
        side: 'BUY',
        volume: 10,
        price: 150.5,
        currency: 'USD',
        order_type: 'LIMIT',
        valid_until: '2024-12-31',
      });

      console.log('Order created:', orderReply);

      if (orderReply.order_id) {
        // Modify the order
        const modifyReply = await client.orders.modify(
          accountId,
          orderReply.order_id,
          {
            price: 151.0,
            volume: 15,
          }
        );

        console.log('Order modified:', modifyReply);

        // Cancel the order
        const deleteReply = await client.orders.delete(
          accountId,
          orderReply.order_id
        );

        console.log('Order cancelled:', deleteReply);
      }
    }

    // Get trade history
    const trades = await client.accounts.getTrades(accountId, { days: 7 });
    console.log('Recent trades:', trades);
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('Rate limit exceeded. Retry after:', error.retryAfter);
    } else if (error instanceof AuthenticationError) {
      console.error('Authentication failed:', error.message);
    } else {
      console.error('Error:', error);
    }
  }
}

trading();
