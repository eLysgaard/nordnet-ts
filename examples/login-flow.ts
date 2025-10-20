import { NordnetClient } from '../src';
import { AuthenticationError } from '../src/errors';

/**
 * Login flow example - Complete authentication process
 */
async function loginFlow() {
  try {
    // Login with username and password
    const client = await NordnetClient.login(
      {
        username: process.env.NORDNET_USERNAME!,
        password: process.env.NORDNET_PASSWORD!,
      },
      async () => {
        // In a real app, prompt user for 2FA code
        // This could be from a UI input, SMS, or authenticator app
        return process.env.NORDNET_2FA_CODE || '';
      }
    );

    console.log('Successfully logged in!');
    console.log('Session ID:', client.getSessionId());

    // Now you can use the client
    const accounts = await client.accounts.list();
    console.log('Accounts:', accounts);

    // Touch session to keep it alive
    await client.auth.touchSession();
    console.log('Session refreshed');

    // Logout when done
    await client.auth.logout();
    console.log('Logged out');
  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.error('Authentication failed:', error.message);
    } else {
      console.error('Error:', error);
    }
  }
}

loginFlow();
