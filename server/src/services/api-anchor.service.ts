import { TypeTotalBorrow, TypeTotalCollateral, TypeTotalDeposit } from '../types';
import { logger } from '.';
import { Axios } from './axios.service';

export class ApiAnchorService {
  anchor: Axios;
  constructor() {
    this.anchor = new Axios(`https://api.anchorprotocol.com/api/v1/`);
  }

  async getMarketInfoUST() {
    try {
      const totalDeposit = (await this.anchor.api.get('/deposit')) as TypeTotalDeposit;
      const totalCollateral = (await this.anchor.api.get('/collaterals')) as TypeTotalCollateral;
      const totalBorrow = (await this.anchor.api.get('/borrow')) as TypeTotalBorrow;

      const tbc = this.estimateRatio(totalBorrow.total_borrowed, totalCollateral.total_value);
      const tdb = this.estimateRatio(totalDeposit.total_ust_deposits, totalBorrow.total_borrowed);

      return {
        totalBorrow,
        totalDeposit,
        totalCollateral,
        tbc,
        tdb,
      };
    } catch (error) {
      logger.error(error);
    } 
  }

  estimateRatio(firstValue: string, secondValue: string) {
    return (parseFloat(firstValue) / parseFloat(secondValue)) * 100;
  }
}
