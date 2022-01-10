import * as client from 'prom-client';

export class PromService {
  _client: typeof client;
  _registry: client.Registry;
  gauge: client.Gauge<any>;
  price_luna: client.Gauge<any>;
  price_ust: client.Gauge<any>;
  tbc: client.Gauge<any>;
  tdb: client.Gauge<any>;
  ratio_luna_ust: client.Gauge<any>;

  constructor() {
    this._client = client;
    this._registry = new this._client.Registry();
    this.price_luna = new this._client.Gauge({
      name: 'price_luna',
      help: 'price_luna',
      registers: [this._registry],
    });
    this.price_ust = new this._client.Gauge({
      name: 'price_ust',
      help: 'price_ust',
      registers: [this._registry],
    });
    this.tbc = new this._client.Gauge({
      name: 'tbc',
      help: 'total borrow/total collateral',
      registers: [this._registry],
    });
    this.tdb = new this._client.Gauge({
      name: 'tdb',
      help: 'total deposit/total borrow ',
      registers: [this._registry],
    });
    this.ratio_luna_ust = new this._client.Gauge({
      name: 'ratio_luna_ust',
      help: 'ratio_luna_ust ',
      registers: [this._registry],
    });
  }

  async setRegistry(data: { [key: string]: string | number }) {
    Object.keys(data).map(async (key: string) => {
      await this[key].set(+data[key]);
      return key;
    });
  }

  async getMetrics() {
    const registry = await this._registry.metrics();
    return registry;
  }
}
