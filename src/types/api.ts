/**
 * Nordnet API Type Definitions
 * Generated from Nordnet External API v2.0
 */

// ============================================================================
// Configuration & Common Types
// ============================================================================

export type Language = 'da' | 'de' | 'en' | 'fi' | 'nb' | 'nn' | 'no' | 'sv';
export type SortOrder = 'asc' | 'desc';

export interface BasicAuth {
  username: string;
  password: string;
}

// ============================================================================
// Error Types
// ============================================================================

export interface ErrorResponse {
  message?: string;
  code?: string;
  details?: unknown;
}

// ============================================================================
// Amount & Currency Types
// ============================================================================

export interface Amount {
  value: number;
  currency: string;
}

export interface PriceWithDecimals {
  price: number;
  decimals: number;
}

export interface DiffWithDecimals {
  diff: number;
  decimals: number;
}

// ============================================================================
// Status & System Types
// ============================================================================

export interface Status {
  system_open: boolean;
  timestamp: number;
  valid_version: boolean;
}

export interface LoggedInStatus {
  logged_in: boolean;
}

// ============================================================================
// Authentication Types
// ============================================================================

export interface ApiKeyStartLoginRequest {
  username: string;
  password: string;
}

export interface ChallengeResponse {
  challenge_method: string;
  challenge_type: string;
  challenge_value?: string;
  session_key: string;
}

export interface ApiKeyVerifyLoginRequest {
  challenge_response: string;
  session_key: string;
}

export interface Feed {
  hostname: string;
  port: number;
  public_feed: boolean;
  secure: boolean;
}

export interface ApiKeyLoginResponse {
  country: string;
  environment: string;
  logged_in: boolean;
  public_feed: Feed;
  private_feed?: Feed;
  session_key: string;
}

// ============================================================================
// Account Types
// ============================================================================

export interface Account {
  accid: number;
  accno: string;
  type: string;
  is_default: boolean;
  is_blocked: boolean;
  alias?: string;
}

export interface AccountInfo {
  accid: number;
  accno: string;
  account_capital: number;
  account_capital_start_of_year: number;
  account_credit: number;
  account_currency: string;
  account_sum: number;
  account_type: string;
  buying_power: number;
  collateral: number;
  collateral_start_of_year: number;
  credit_balance: number;
  equity: number;
  equity_start_of_year: number;
  interest_rate?: number;
  interest_rate_days?: number;
  is_blocked: boolean;
  is_default: boolean;
  loan_factor: number;
  own_capital: number;
  own_capital_morning: number;
  own_capital_start_of_year: number;
  pawn_value: number;
  short_position_margin?: number;
  trading_power: number;
  alias?: string;
}

export interface AccountTransactionsToday {
  accid: number;
  transactions: number;
}

export interface Ledger {
  currency: string;
  account_sum: number;
  account_sum_acc: number;
  collateral: number;
  collateral_acc: number;
  credit_balance: number;
  exchange_rate: number;
}

export interface LedgerInformation {
  account_currency: string;
  total_account_sum_acc: number;
  total_collateral_acc: number;
  ledgers: Ledger[];
}

// ============================================================================
// Order Types
// ============================================================================

export type OrderTypeCode = 'FAK' | 'FOK' | 'NORMAL' | 'LIMIT' | 'STOP_LIMIT' | 'STOP_TRAILING' | 'OCO';

export type OrderActionState =
  | 'ACTIVATED'
  | 'CAN_BE_ACTIVATED'
  | 'DELETED'
  | 'DELETED_CHANGE_DENY'
  | 'DELETED_CONFIRM_MISSING'
  | 'DELETED_NO_ANSWER'
  | 'DELETED_ORDER_NOT_ACKNOWLEDGED'
  | 'DELETED_ROUTING_ERROR'
  | 'DELETED_TOO_LATE_CANCEL'
  | 'DONE'
  | 'LOCAL'
  | 'ON_MARKET'
  | 'PART_DONE'
  | 'SENT'
  | 'WAITING';

export type OrderState = 'DELETED' | 'LOCAL' | 'ON_MARKET' | 'LOCKED';

export type PriceCondition = 'LIMIT' | 'AT_MARKET';

export type VolumeCondition = 'NORMAL' | 'ALL_OR_NOTHING';

export type ActivationConditionType =
  | 'STOP_ACTPRICE'
  | 'STOP_ACTPRICE_PERC'
  | 'MANUAL'
  | 'OCO_STOP_ACTPRICE';

export interface ActivationCondition {
  type: ActivationConditionType;
  trailing_value?: number;
  trigger_value?: number;
  trigger_condition?: string;
  target_value?: number;
}

export type ValidityType = 'DAY' | 'UNTIL_DATE' | 'EXTENDED_HOURS' | 'IMMEDIATE';

export interface Validity {
  type: ValidityType;
  valid_until?: string;
}

export interface TradableId {
  identifier: string;
  market_id: number;
}

export interface Order {
  accno: string;
  action_state: OrderActionState;
  activation_condition?: ActivationCondition;
  currency: string;
  deleted_timestamp?: number;
  instrument_type: string;
  market_id: number;
  order_id: number;
  order_state: OrderState;
  order_type: string;
  price: number;
  side: 'BUY' | 'SELL';
  tradable: TradableId;
  transaction_timestamp?: number;
  validity: Validity;
  volume: number;
  reference?: string;
  open_volume?: number;
  traded_volume?: number;
}

export interface OrderType {
  name: string;
  type: OrderTypeCode;
}

export interface OrderReply {
  order_id: number;
  result_code: string;
  order_state?: OrderState;
  message?: string;
}

export interface OrderEntryRequest {
  market_id: number;
  identifier?: string;
  side: 'BUY' | 'SELL';
  volume: number;
  price?: number;
  currency?: string;
  order_type?: OrderTypeCode;
  valid_until?: string;
  open_volume?: number;
  activation_condition?: string;
  trigger_value?: number;
  trigger_condition?: string;
  target_value?: number;
  reference?: string;
}

export interface OrderModifyRequest {
  price?: number;
  volume?: number;
  open_volume?: number;
  currency?: string;
}

// ============================================================================
// Position Types
// ============================================================================

export interface Position {
  accid: number;
  accno: string;
  acq_price: PriceWithDecimals;
  acq_price_acc: number;
  instrument: TradableId;
  intraday_limit?: number;
  main_market_id: number;
  market_value: number;
  market_value_acc: number;
  morning_price: number;
  pawn_percent: number;
  qty: number;
}

// ============================================================================
// Trade Types
// ============================================================================

export interface Trade {
  accno: string;
  broker_trade_id: string;
  currency: string;
  instrument_type: string;
  market_id: number;
  price: number;
  side: 'BUY' | 'SELL';
  trade_id: string;
  trade_timestamp: number;
  tradable: TradableId;
  volume: number;
}

export interface PublicTrade {
  broker: string;
  currency: string;
  price: number;
  tick_timestamp: number;
  trade_id: string;
  trade_timestamp: number;
  trade_type: string;
  volume: number;
}

export interface InstrumentPublicTrades {
  instrument_id: number;
  trades: PublicTrade[];
}

export interface TradablePublicTrades {
  market_id: number;
  identifier: string;
  trades: PublicTrade[];
}

// ============================================================================
// Instrument Types
// ============================================================================

export interface KeyInformationDocuments {
  sv_url?: string;
  en_url?: string;
  da_url?: string;
  no_url?: string;
  fi_url?: string;
}

export interface UnderlyingInfo {
  instrument_id: number;
  symbol: string;
  isin_code: string;
  currency: string;
}

export interface Tradable {
  identifier: string;
  market_id: number;
  tick_size_id: number;
  lot_size: number;
  display_order: number;
}

export interface Instrument {
  asset_class: string;
  currency: string;
  instrument_id: number;
  instrument_type: string;
  isin_code?: string;
  market_view: string;
  multiplier: number;
  pawn_percent: number;
  sector?: string;
  sector_group?: string;
  strike_price?: number;
  symbol: string;
  tradables: Tradable[];
  instrument_group_type?: string;
  issuer_id?: number;
  issuer_name?: string;
  key_information_documents?: KeyInformationDocuments;
  leverage?: number;
  main_market_id?: number;
  name?: string;
  number_of_securities?: number;
  prospectus_url?: string;
  underlying_currency?: string;
  underlying_instrument_id?: number;
  underlying_symbol?: string;
}

export interface InstrumentType {
  instrument_type: string;
  name: string;
}

export interface InstrumentEligibility {
  tradables: TradableId[];
}

export interface TradableEligibility {
  market_id: number;
  identifier: string;
  eligible: boolean;
}

export interface CalendarDay {
  date: string;
  open: boolean;
  description?: string;
}

export interface TradableInfo {
  market_id: number;
  identifier: string;
  tick_size_id: number;
  lot_size: number;
  display_order: number;
  market?: MarketInfo;
  price_info?: PriceInfo;
  exchange_info?: ExchangeInfo;
  key_ratios_info?: KeyRatiosInfo;
  historical_returns_info?: HistoricalReturnsInfo;
  calendar?: CalendarDay[];
}

export interface InstrumentInfo {
  instrument_id: number;
  symbol: string;
  isin_code?: string;
  instrument_type: string;
  currency: string;
  multiplier: number;
  pawn_percent: number;
  sector?: string;
  sector_group?: string;
  asset_class: string;
  name?: string;
  main_market_id?: number;
  tradables?: TradableInfo[];
  underlying_info?: UnderlyingInfo;
  derivative_info?: DerivativeInfo;
  option_info?: OptionInfo;
  etp_info?: EtpInfo;
  certificate_info?: CertificateInfo;
  company_info?: CompanyInfo;
  statistical_info?: StatisticalInfo;
}

// ============================================================================
// Market Types
// ============================================================================

export interface Market {
  country: string;
  market_id: number;
  name: string;
}

export interface MarketInfo {
  market_id: number;
  country: string;
  name: string;
  trading_calendar?: CalendarDay[];
}

export interface StatusInfo {
  status: string;
  source_updated: number;
}

export interface PriceInfo {
  ask: number;
  ask_volume: number;
  bid: number;
  bid_volume: number;
  close: number;
  diff: number;
  diff_pct: number;
  high: number;
  instrument_id: number;
  last: number;
  last_updated: number;
  low: number;
  open: number;
  spread: number;
  tick_timestamp: number;
  total_value_traded: number;
  total_volume_traded: number;
  turnover: number;
}

export interface ExchangeInfo {
  country: string;
  exchange_code: string;
  name: string;
}

export interface HistoricalReturnsInfo {
  one_day: number;
  one_week: number;
  one_month: number;
  three_months: number;
  this_year: number;
  one_year: number;
  three_years: number;
  five_years: number;
}

export interface KeyRatiosInfo {
  price_earnings_ratio: number;
  price_book_ratio: number;
  price_sales_ratio: number;
  earnings_per_share: number;
  dividend_per_share: number;
}

export interface CompanyInfo {
  annual_meeting_date?: string;
  ex_dividend_date?: string;
  interest_payment_date?: string;
  report_date?: string;
}

export interface StatisticalInfo {
  [key: string]: unknown;
}

export interface TicksizeInterval {
  decimals: number;
  from_price: number;
  to_price: number;
  tick: number;
}

export interface TicksizeTable {
  tick_size_id: number;
  ticks: TicksizeInterval[];
}

// ============================================================================
// Derivative Types
// ============================================================================

export interface DerivativeInfo {
  expiration_date?: string;
  settlement_price?: number;
  leverage?: number;
  issuer_id?: number;
  issuer_name?: string;
  underlying_instrument_id?: number;
  underlying_symbol?: string;
  underlying_isin_code?: string;
  underlying_currency?: string;
}

export interface OptionInfo {
  american_european?: string;
  contract_size?: number;
  exercise_type?: string;
  option_type?: string;
  strike_price?: number;
}

export interface EtpInfo {
  leveraged?: boolean;
  short?: boolean;
  ucits?: boolean;
}

export interface CertificateInfo {
  issuer_id?: number;
  issuer_name?: string;
  underlying_instrument_id?: number;
}

export interface KoInfo {
  ko_level?: number;
  stop_loss?: number;
}

export interface KoCalcInfo {
  financing_cost?: number;
  ko_distance?: number;
}

export interface PriceKoInfo {
  ko_level?: number;
  stop_loss?: number;
}

// ============================================================================
// Search Types
// ============================================================================

export type AttributeGroup =
  | 'ASSET_CLASS'
  | 'COUNTRY'
  | 'CURRENCY'
  | 'EXCHANGE'
  | 'EXPIRATION_DATE'
  | 'INDEX'
  | 'INSTRUMENT_GROUP_TYPE'
  | 'INSTRUMENT_TYPE'
  | 'ISSUER'
  | 'MARKET'
  | 'MULTIPLIER'
  | 'OPTION_TYPE'
  | 'SECTOR'
  | 'SECTOR_GROUP'
  | 'STRIKE_PRICE'
  | 'UNDERLYING_CURRENCY'
  | 'UNDERLYING_INSTRUMENT';

export type EntityType =
  | 'STOCK'
  | 'FUND'
  | 'BOND'
  | 'OPTION'
  | 'FUTURE_FORWARD'
  | 'CERTIFICATE'
  | 'WARRANT'
  | 'ETF'
  | 'INDEX'
  | 'PREMIUM_BOND'
  | 'SUBSCRIPTION_OPTION';

export interface FilterVal {
  name: string;
  value: string;
}

export interface FilterDetails {
  type: AttributeGroup;
  values: FilterVal[];
}

export interface AttributeResult {
  type: AttributeGroup;
  values: string[];
}

export interface AttributeResults {
  attributes: AttributeResult[];
}

export interface Stocklist {
  ask: number;
  bid: number;
  change: number;
  country: string;
  currency: string;
  high: number;
  instrument_id: number;
  instrument_type: string;
  isin: string;
  last: number;
  last_updated: number;
  low: number;
  market_id: number;
  name: string;
  symbol: string;
  turnover: number;
  volume: number;
}

export interface StocklistResults {
  results: Stocklist[];
  total_hits: number;
}

export interface BullBearEntity {
  ask: number;
  bid: number;
  change: number;
  country: string;
  currency: string;
  expiration_date: string;
  instrument_id: number;
  instrument_type: string;
  issuer: string;
  isin: string;
  ko_level: number;
  last: number;
  last_updated: number;
  leverage: number;
  market_id: number;
  name: string;
  stop_loss: number;
  strike: number;
  symbol: string;
  underlying_isin: string;
  underlying_symbol: string;
}

export interface BullBearListResults {
  results: BullBearEntity[];
  total_hits: number;
}

export interface MinifutureEntity {
  ask: number;
  bid: number;
  change: number;
  country: string;
  currency: string;
  expiration_date: string;
  instrument_id: number;
  instrument_type: string;
  issuer: string;
  isin: string;
  ko_level: number;
  last: number;
  last_updated: number;
  leverage: number;
  market_id: number;
  name: string;
  stop_loss: number;
  strike: number;
  symbol: string;
  underlying_isin: string;
  underlying_symbol: string;
}

export interface MinifutureListResults {
  results: MinifutureEntity[];
  total_hits: number;
}

export interface UnlimitedTurboEntity {
  ask: number;
  bid: number;
  change: number;
  country: string;
  currency: string;
  expiration_date: string;
  instrument_id: number;
  instrument_type: string;
  issuer: string;
  isin: string;
  ko_level: number;
  last: number;
  last_updated: number;
  leverage: number;
  market_id: number;
  name: string;
  stop_loss: number;
  strike: number;
  symbol: string;
  underlying_isin: string;
  underlying_symbol: string;
}

export interface UnlimitedTurboListResults {
  results: UnlimitedTurboEntity[];
  total_hits: number;
}

export interface OptionlistEntity {
  ask: number;
  bid: number;
  change: number;
  country: string;
  currency: string;
  expiration_date: string;
  instrument_id: number;
  instrument_type: string;
  isin: string;
  last: number;
  last_updated: number;
  market_id: number;
  name: string;
  option_type: string;
  strike: number;
  symbol: string;
  underlying_isin: string;
  underlying_symbol: string;
  volume: number;
}

export interface OptionlistPair {
  call: OptionlistEntity;
  put: OptionlistEntity;
}

export interface OptionListResults {
  pairs: OptionlistPair[];
  total_hits: number;
}

export interface LeverageFilter {
  max?: number;
  min?: number;
}

export interface Issuer {
  issuer_id: number;
  name: string;
}

// ============================================================================
// News Types
// ============================================================================

export type NewsSourceLevel = 'DELAYED' | 'REALTIME' | 'FLASH';

export interface NewsArticle {
  headline: string;
  news_id: number;
  news_source: string;
  published_time: number;
  text?: string;
  instruments?: number[];
  lang?: string;
}

export interface NewsSource {
  country: string;
  level: NewsSourceLevel;
  name: string;
  news_source_id: number;
}

// ============================================================================
// Main Search Types
// ============================================================================

export interface MainSearchResponseRow {
  ask: number;
  asset_class: string;
  bid: number;
  change: number;
  country: string;
  currency: string;
  expiration_date?: string;
  high: number;
  instrument_group_type?: string;
  instrument_id: number;
  instrument_type: string;
  isin?: string;
  issuer?: string;
  ko_level?: number;
  last: number;
  last_updated: number;
  leverage?: number;
  list?: string;
  low: number;
  main_market_id: number;
  market_id: number;
  multiplier?: number;
  name: string;
  option_type?: string;
  sector?: string;
  sector_group?: string;
  stop_loss?: number;
  strike_price?: number;
  symbol: string;
  turnover: number;
  underlying_currency?: string;
  underlying_instrument_id?: number;
  underlying_isin?: string;
  underlying_symbol?: string;
  volume: number;
}

export interface MainSearchResponse {
  results: MainSearchResponseRow[];
  total_hits: number;
}

// ============================================================================
// Country Types
// ============================================================================

export interface Country {
  country: string;
  name: string;
}

// ============================================================================
// Lookup Types
// ============================================================================

export type InstrumentLookupType = 'isin' | 'symbol';
export type DerivativeType =
  | 'bull_bear'
  | 'certificate'
  | 'minifuture'
  | 'option'
  | 'warrant'
  | 'turbo';

// ============================================================================
// Request Parameter Types
// ============================================================================

export interface PaginationParams {
  offset?: number;
  limit?: number;
  [key: string]: unknown;
}

export interface SearchParams {
  query: string;
  type?: EntityType;
  limit?: number;
}

export interface StockSearchParams extends PaginationParams {
  asset_class?: string[];
  country?: string[];
  currency?: string[];
  exchange?: string[];
  instrument_type?: string[];
  market?: string[];
  sector?: string[];
  sector_group?: string[];
  sort?: string;
  sort_order?: SortOrder;
  [key: string]: unknown;
}

export interface LeverageSearchParams extends PaginationParams {
  country?: string[];
  currency?: string[];
  expiration_date?: string[];
  instrument_group_type?: string[];
  instrument_type?: string[];
  issuer?: string[];
  leverage?: LeverageFilter;
  market?: string[];
  underlying_currency?: string[];
  underlying_instrument?: string[];
  sort?: string;
  sort_order?: SortOrder;
  [key: string]: unknown;
}

export interface OptionPairSearchParams extends PaginationParams {
  country?: string[];
  currency?: string[];
  expiration_date?: string[];
  market?: string[];
  option_type?: string[];
  strike_price?: number[];
  underlying_instrument?: string[];
  sort?: string;
  sort_order?: SortOrder;
  [key: string]: unknown;
}

export interface AttributeSearchParams {
  attribute_group: AttributeGroup;
  instrument_type?: string[];
  instrument_group_type?: string[];
  [key: string]: unknown;
}

export interface RequestHeaders {
  'Accept-Language'?: Language;
  Authorization?: string;
}
