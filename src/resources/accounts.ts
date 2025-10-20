import type { HttpClient } from '../client/HttpClient';
import type {
  Account,
  AccountInfo,
  LedgerInformation,
  Position,
  Trade,
  AccountTransactionsToday,
} from '../types/api';

/**
 * Accounts resource for account operations
 */
export class AccountsResource {
  constructor(private http: HttpClient) {}

  /**
   * Get list of accounts
   * GET /accounts
   *
   * @param options - Optional parameters
   * @param options.includeCreditAccounts - Include credit accounts
   * @returns Array of accounts
   */
  async list(options?: {
    includeCreditAccounts?: boolean;
  }): Promise<Account[]> {
    const params: Record<string, boolean | undefined> = {};

    if (options?.includeCreditAccounts !== undefined) {
      params.include_credit_accounts = options.includeCreditAccounts;
    }

    return this.http.get<Account[]>('/accounts', { params });
  }

  /**
   * Get account information for one or more accounts
   * GET /accounts/{accid}/info
   *
   * @param accountIds - Single account ID or array of account IDs
   * @param options - Optional parameters
   * @param options.includeInterestRate - Include interest rate information
   * @param options.includeShortPosMargin - Include short position margin
   * @returns Array of account information
   */
  async getInfo(
    accountIds: number | number[],
    options?: {
      includeInterestRate?: boolean;
      includeShortPosMargin?: boolean;
    }
  ): Promise<AccountInfo[]> {
    const ids = Array.isArray(accountIds)
      ? accountIds.join(',')
      : String(accountIds);

    const params: Record<string, boolean | undefined> = {};

    if (options?.includeInterestRate !== undefined) {
      params.include_interest_rate = options.includeInterestRate;
    }

    if (options?.includeShortPosMargin !== undefined) {
      params.include_short_pos_margin = options.includeShortPosMargin;
    }

    return this.http.get<AccountInfo[]>(`/accounts/${ids}/info`, { params });
  }

  /**
   * Get account ledger information
   * GET /accounts/{accid}/ledgers
   *
   * @param accountId - Account identifier
   * @returns Ledger information
   */
  async getLedgers(accountId: number): Promise<LedgerInformation> {
    return this.http.get<LedgerInformation>(`/accounts/${accountId}/ledgers`);
  }

  /**
   * Get account positions
   * GET /accounts/{accid}/positions
   *
   * @param accountIds - Single account ID or array of account IDs
   * @param options - Optional parameters
   * @param options.includeInstrumentLoans - Include instrument loan positions
   * @param options.includeIntradayLimit - Include intraday limit
   * @returns Array of positions
   */
  async getPositions(
    accountIds: number | number[],
    options?: {
      includeInstrumentLoans?: boolean;
      includeIntradayLimit?: boolean;
    }
  ): Promise<Position[]> {
    const ids = Array.isArray(accountIds)
      ? accountIds.join(',')
      : String(accountIds);

    const params: Record<string, boolean | undefined> = {};

    if (options?.includeInstrumentLoans !== undefined) {
      params.include_instrument_loans = options.includeInstrumentLoans;
    }

    if (options?.includeIntradayLimit !== undefined) {
      params.include_intraday_limit = options.includeIntradayLimit;
    }

    return this.http.get<Position[]>(`/accounts/${ids}/positions`, { params });
  }

  /**
   * Get account trades
   * GET /accounts/{accid}/trades
   *
   * @param accountIds - Single account ID or array of account IDs
   * @param options - Optional parameters
   * @param options.days - Number of days to look back (0-7, default 0 for today only)
   * @returns Array of trades
   */
  async getTrades(
    accountIds: number | number[],
    options?: {
      days?: number;
    }
  ): Promise<Trade[]> {
    const ids = Array.isArray(accountIds)
      ? accountIds.join(',')
      : String(accountIds);

    const params: Record<string, number | undefined> = {};

    if (options?.days !== undefined) {
      params.days = options.days;
    }

    return this.http.get<Trade[]>(`/accounts/${ids}/trades`, { params });
  }

  /**
   * Get today's withdrawal/deposit transaction amounts
   * GET /accounts/{accid}/returns/transactions/today
   *
   * @param accountId - Account identifier
   * @param options - Optional parameters
   * @param options.includeCreditAccount - Include credit accounts
   * @returns Today's transaction information
   */
  async getTransactionsToday(
    accountId: number,
    options?: {
      includeCreditAccount?: boolean;
    }
  ): Promise<AccountTransactionsToday[]> {
    const params: Record<string, boolean | undefined> = {};

    if (options?.includeCreditAccount !== undefined) {
      params.include_credit_account = options.includeCreditAccount;
    }

    return this.http.get<AccountTransactionsToday[]>(
      `/accounts/${accountId}/returns/transactions/today`,
      { params }
    );
  }
}
