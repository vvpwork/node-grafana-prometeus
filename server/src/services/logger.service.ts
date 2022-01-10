import pino from 'pino';

class Logger {
  private _logger: any;

  constructor() {
    this._logger = pino({
      prettyPrint: true,
      serializers: { 
        err: e=> ({ 
            type: e.type, 
            message: e.message,
            stack: e.stack 
        }) 
   } 
    });
  }

  info(message: any) {
    return this._logger.info(message);
  }

  error(message: any) {
    return this._logger.error(message);
  }
}

export const logger = new Logger();
