/* eslint-disable @typescript-eslint/typedef */

import createError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import { logger, RequestService, PromService } from '../services';

export class KpiController {
  private request: RequestService;
  private prom: PromService;
  constructor() {
    this.request = new RequestService();
    this.prom = new PromService();
  }

  getAllKpi = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const data = await this.request.getAndSaveKpi();
      await this.prom.setRegistry(data!);
      const dataResult = await this.prom.getMetrics();
      res.set('Content-Type', this.prom._registry.contentType).status(200).send(dataResult);
    } catch (error) {
      logger.error(error);
      return next(createError(501, 'Something was wrong'));
    }
  };
}
