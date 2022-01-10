import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import createError, { HttpError } from 'http-errors';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { logger } from '../services';
import { kpiRoute } from '../routes';

// ***********************

const app = express();

const err = (error: HttpError, req: Request, res: Response, next: NextFunction): any => {
  const errStatus = error?.status || 500;
  res.status(errStatus).send({
    status: errStatus,
    message: error.message,
  });
};

// global middlewares
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(helmet());

// routes
app.use('/metrics', kpiRoute);
app.use('/', (req: Request, res: Response) => res.send('Api is working'));

// errors handlers

app.use((req: Request, res: Response, next: NextFunction) => next(createError(404)));
app.use(err);

process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  logger.error(error);
  process.exit(1);
});

app.listen(9200, () => {
  logger.info(`Server start on port ${9200}`);
});
