/* eslint-disable prefer-template */
import { CronJob } from 'cron';
import { ApiAnchorService, ApiCoinmarket, logger } from '.';

import { time_to_request } from '../config';

export class RequestService {
  private _anchor: ApiAnchorService;
  private _coin: ApiCoinmarket;
  private _job: CronJob;

  constructor() {
    this._anchor = new ApiAnchorService();
    this._coin = new ApiCoinmarket();
  }

  async getAndSaveKpi() {
    try {
      const dataFromAnchorApi = await this._anchor.getMarketInfoUST();
      const dataFromCoinmarket = await this._coin.getInfoFromCoinMarket();
      const data = {
        price_luna: dataFromCoinmarket?.priceLuna + '',
        price_ust: dataFromCoinmarket?.priceUST + '',
        tbc: dataFromAnchorApi?.tbc + '',
        tdb: dataFromAnchorApi?.tdb + '',
        ratio_luna_ust: dataFromCoinmarket?.ratio + '',
      };
      return data;
    } catch (err) {
      logger.error(err);
    }
  }
}
