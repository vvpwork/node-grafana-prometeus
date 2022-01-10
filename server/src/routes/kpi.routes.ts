import { Router } from 'express';
import { asyncHandler } from '../middlewares';
import { KpiController } from '../controller';


const kpiRoute = Router();
kpiRoute.get('/', asyncHandler( new KpiController().getAllKpi));

export { kpiRoute };
