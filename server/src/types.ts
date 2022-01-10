export type TypeDbConfig = {
  name: string;
  port: string | number;
  host: string;
  password: string;
  userName: string;
};

export type TypeRPC = {
  infuraId: string;
  timeToRequest: string;
};
export type TypeServer = {
  port: number;
};

export type TypeAccountAnchor = {
  acc_address: string;
};

export type TypeTotalBorrow = {
  total_borrowed: string;
  borrowers: { last_updated: number | Date; borrowers: number };
};

export type TypeTotalDeposit = {
  total_ust_deposits: string;
  total_depositors: {
    last_updated: number | Date;
    holders: number;
    height: number;
    timestamp: number | Date;
  };
};

export type TypeTotalCollateral = {
  total_value: string;
  collaterals: { [key: string]: any }[];
};
export type TypeQuoteFromCoinmarket = {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: string;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  last_updated: string | Date;
};

export type TypeCoinFromCoinmarket = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string | Date;
  quote: {
    USD: TypeQuoteFromCoinmarket;
  };
};

export type TypeKpiModel = {
  price_luna: string;
  price_ust: string;
  ratio_luna_ust: string;
  tbc: string;
  tdb: string;
};

