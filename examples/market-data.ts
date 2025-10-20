import { NordnetClient } from '../src';

/**
 * Market data example - Search instruments, get market info, news
 */
async function marketData() {
  const client = new NordnetClient({
    sessionId: process.env.NORDNET_SESSION_ID,
  });

  try {
    // Get all markets
    const markets = await client.markets.list();
    console.log('Available markets:', markets);

    // Get specific market information
    if (markets.length > 0) {
      const marketInfo = await client.markets.get(markets[0].market_id);
      console.log('Market info:', marketInfo);
    }

    // Lookup instrument by ISIN
    const instruments = await client.instruments.lookup(
      'isin',
      'US0378331005' // Apple ISIN
    );
    console.log('Instrument lookup:', instruments);

    if (instruments.length > 0) {
      const instrumentId = instruments[0].instrument_id;

      // Get detailed instrument information
      const instrumentInfo = await client.instruments.get(instrumentId);
      console.log('Instrument details:', instrumentInfo);

      // Get recent trades for the instrument
      const trades = await client.instruments.getTrades(instrumentId);
      console.log('Recent trades:', trades);
    }

    // Search for news
    const news = await client.news.list({ limit: 10 });
    console.log('Latest news:', news);

    if (news.length > 0) {
      // Get full news article
      const article = await client.news.get(news[0].news_id);
      console.log('News article:', article);
    }

    // Get news sources
    const sources = await client.news.getSources();
    console.log('News sources:', sources);

    // Search stocks
    const stockResults = await client.instruments.searchStockList({
      country: ['US'],
      currency: ['USD'],
      limit: 20,
    });
    console.log('Stock search results:', stockResults);

    // Get countries
    const countries = await client.countries.list();
    console.log('Available countries:', countries);
  } catch (error) {
    console.error('Error:', error);
  }
}

marketData();
