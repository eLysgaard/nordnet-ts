import type { HttpClient } from '../client/HttpClient';
import type {
  InstrumentInfo,
  InstrumentType,
  InstrumentPublicTrades,
  InstrumentLookupType,
  DerivativeType,
  AttributeResults,
  StocklistResults,
  BullBearListResults,
  MinifutureListResults,
  UnlimitedTurboListResults,
  OptionListResults,
  StockSearchParams,
  LeverageSearchParams,
  OptionPairSearchParams,
  AttributeSearchParams,
} from '../types/api';

/**
 * Instruments resource for instrument operations
 */
export class InstrumentsResource {
  constructor(private http: HttpClient) {}

  /**
   * Get instrument information
   * GET /instruments/{instrument_id}
   *
   * @param instrumentId - Instrument identifier
   * @returns Instrument information
   */
  async get(instrumentId: number): Promise<InstrumentInfo> {
    return this.http.get<InstrumentInfo>(`/instruments/${instrumentId}`);
  }

  /**
   * Lookup instrument by ISIN or symbol
   * GET /instruments/lookup/{lookup_type}/{lookup}
   *
   * @param lookupType - Type of lookup (isin or symbol)
   * @param lookup - ISIN code or symbol
   * @returns Array of instrument information
   */
  async lookup(
    lookupType: InstrumentLookupType,
    lookup: string
  ): Promise<InstrumentInfo[]> {
    return this.http.get<InstrumentInfo[]>(
      `/instruments/lookup/${lookupType}/${lookup}`
    );
  }

  /**
   * Get all instrument types
   * GET /instruments/types
   *
   * @returns Array of instrument types
   */
  async getTypes(): Promise<InstrumentType[]> {
    return this.http.get<InstrumentType[]>('/instruments/types');
  }

  /**
   * Get specific instrument type information
   * GET /instruments/types/{instrument_type}
   *
   * @param instrumentType - Instrument type identifier
   * @returns Instrument type information
   */
  async getType(instrumentType: string): Promise<InstrumentType> {
    return this.http.get<InstrumentType>(
      `/instruments/types/${instrumentType}`
    );
  }

  /**
   * Get instrument trades
   * GET /instruments/{instrument_id}/trades
   *
   * @param instrumentId - Instrument identifier
   * @returns Public trades for the instrument
   */
  async getTrades(instrumentId: number): Promise<InstrumentPublicTrades> {
    return this.http.get<InstrumentPublicTrades>(
      `/instruments/${instrumentId}/trades`
    );
  }

  /**
   * Get leverage information for an instrument
   * GET /instruments/{instrument_id}/leverages
   *
   * @param instrumentId - Instrument identifier
   * @returns Leverage information
   */
  async getLeverages(instrumentId: number): Promise<unknown> {
    return this.http.get(`/instruments/${instrumentId}/leverages`);
  }

  /**
   * Get leverage filters for an instrument
   * GET /instruments/{instrument_id}/leverages/filters
   *
   * @param instrumentId - Instrument identifier
   * @returns Available leverage filters
   */
  async getLeverageFilters(instrumentId: number): Promise<unknown> {
    return this.http.get(`/instruments/${instrumentId}/leverages/filters`);
  }

  /**
   * Get underlying instruments for a derivative type
   * GET /instruments/underlyings/{derivative_type}/{currency}
   *
   * @param derivativeType - Type of derivative
   * @param currency - Currency code
   * @returns Array of underlying instruments
   */
  async getUnderlyings(
    derivativeType: DerivativeType,
    currency: string
  ): Promise<InstrumentInfo[]> {
    return this.http.get<InstrumentInfo[]>(
      `/instruments/underlyings/${derivativeType}/${currency}`
    );
  }

  /**
   * Validate instrument suitability
   * GET /instruments/validation/suitability/{instrument_id}
   *
   * @param instrumentId - Instrument identifier
   * @returns Suitability validation result
   */
  async validateSuitability(instrumentId: number): Promise<unknown> {
    return this.http.get(
      `/instruments/validation/suitability/${instrumentId}`
    );
  }

  /**
   * Get search attributes
   * GET /instrument_search/attributes
   *
   * @param params - Search parameters
   * @returns Available search attributes
   */
  async getSearchAttributes(
    params: AttributeSearchParams
  ): Promise<AttributeResults> {
    return this.http.get<AttributeResults>('/instrument_search/attributes', {
      params,
    });
  }

  /**
   * Search stock list
   * GET /instrument_search/query/stocklist
   *
   * @param params - Stock search parameters
   * @returns Stock list results
   */
  async searchStockList(
    params?: StockSearchParams
  ): Promise<StocklistResults> {
    return this.http.get<StocklistResults>(
      '/instrument_search/query/stocklist',
      { params }
    );
  }

  /**
   * Search bull & bear list
   * GET /instrument_search/query/bullbearlist
   *
   * @param params - Leverage search parameters
   * @returns Bull & Bear list results
   */
  async searchBullBearList(
    params?: LeverageSearchParams
  ): Promise<BullBearListResults> {
    return this.http.get<BullBearListResults>(
      '/instrument_search/query/bullbearlist',
      { params }
    );
  }

  /**
   * Search mini future list
   * GET /instrument_search/query/minifuturelist
   *
   * @param params - Leverage search parameters
   * @returns Mini future list results
   */
  async searchMiniFutureList(
    params?: LeverageSearchParams
  ): Promise<MinifutureListResults> {
    return this.http.get<MinifutureListResults>(
      '/instrument_search/query/minifuturelist',
      { params }
    );
  }

  /**
   * Search unlimited turbo list
   * GET /instrument_search/query/unlimitedturbolist
   *
   * @param params - Leverage search parameters
   * @returns Unlimited turbo list results
   */
  async searchUnlimitedTurboList(
    params?: LeverageSearchParams
  ): Promise<UnlimitedTurboListResults> {
    return this.http.get<UnlimitedTurboListResults>(
      '/instrument_search/query/unlimitedturbolist',
      { params }
    );
  }

  /**
   * Search option pairs
   * GET /instrument_search/query/optionlist/pairs
   *
   * @param params - Option pair search parameters
   * @returns Option list results
   */
  async searchOptionPairs(
    params?: OptionPairSearchParams
  ): Promise<OptionListResults> {
    return this.http.get<OptionListResults>(
      '/instrument_search/query/optionlist/pairs',
      { params }
    );
  }
}
