import { NordnetClient } from '../src';

/**
 * Basic usage example - Using existing session ID
 */
async function basicUsage() {
  // Create client with existing session ID
  const client = new NordnetClient({
    sessionId: process.env.NORDNET_SESSION_ID,
    language: 'en',
  });

  try {
    // Get system status
    const status = await client.system.getStatus();
    console.log('System status:', status);

    // List accounts
    const accounts = await client.accounts.list();
    console.log('Accounts:', accounts);

    // Get detailed account information
    if (accounts.length > 0) {
      const accountInfo = await client.accounts.getInfo(accounts[0].accid);
      console.log('Account info:', accountInfo);

      // Get positions
      const positions = await client.accounts.getPositions(accounts[0].accid);
      console.log('Positions:', positions);

      // Get orders
      const orders = await client.orders.list(accounts[0].accid);
      console.log('Orders:', orders);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

basicUsage();
