import type { HttpClient } from '../client/HttpClient';
import type {
  ApiKeyStartLoginRequest,
  ChallengeResponse,
  ApiKeyVerifyLoginRequest,
  ApiKeyLoginResponse,
  LoggedInStatus,
} from '../types/api';

/**
 * Authentication resource for login/logout operations
 */
export class AuthResource {
  constructor(private http: HttpClient) {}

  /**
   * Start login process
   * POST /login/start
   *
   * @param credentials - Username and password
   * @returns Challenge response requiring 2FA verification
   */
  async startLogin(
    credentials: ApiKeyStartLoginRequest
  ): Promise<ChallengeResponse> {
    return this.http.post<ChallengeResponse>('/login/start', credentials);
  }

  /**
   * Verify login with 2FA response
   * POST /login/verify
   *
   * @param verification - Challenge response and session key
   * @returns Complete login response with session key
   */
  async verifyLogin(
    verification: ApiKeyVerifyLoginRequest
  ): Promise<ApiKeyLoginResponse> {
    const response = await this.http.post<ApiKeyLoginResponse>(
      '/login/verify',
      verification
    );

    // Set the session ID in the HTTP client
    if (response.session_key) {
      this.http.setSessionId(response.session_key);
    }

    return response;
  }

  /**
   * Touch/refresh session
   * PUT /login
   *
   * @returns Login status
   */
  async touchSession(): Promise<LoggedInStatus> {
    return this.http.put<LoggedInStatus>('/login');
  }

  /**
   * Logout and invalidate session
   * DELETE /login
   *
   * @returns Login status (should be logged_in: false)
   */
  async logout(): Promise<LoggedInStatus> {
    const response = await this.http.delete<LoggedInStatus>('/login');

    // Clear the session from the HTTP client
    this.http.clearSession();

    return response;
  }
}
