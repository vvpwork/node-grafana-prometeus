import { TypeCoinFromCoinmarket, TypeQuoteFromCoinmarket } from 'src/types';
import { logger } from '.';
import { Axios } from './axios.service';

export class ApiCoinmarket {
  coin: Axios;
  constructor() {
    this.coin = new Axios('https://pro-api.coinmarketcap.com', {
      'X-CMC_PRO_API_KEY': '4dac9e9d-b5d5-4efd-b34a-27e1f9f48393',
    });
  }

  async getInfoFromCoinMarket() {
    try {
      const terraLuna = await this.coin.api.get(`/v1/cryptocurrency/quotes/latest`, {
        params: {
          symbol: `luna,ust`,
        },
      });
      const { LUNA, UST } = terraLuna.data as {
        LUNA: TypeCoinFromCoinmarket;
        UST: TypeCoinFromCoinmarket;
      };

      const ratio = this.estimateRatio(LUNA.quote.USD.market_cap, UST.quote.USD.market_cap);
      return {
        ratio: ratio.toFixed(2),
        priceLuna: LUNA.quote.USD.price.toFixed(2),
        priceUST: UST.quote.USD.price.toFixed(2),
      };
    } catch (err) {
      logger.error(err);
    }
  }

  estimateRatio(lunaCap: string, ustCap: string) {
    return (parseFloat(lunaCap) / parseFloat(ustCap)) * 100;
  }
}
