import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _, next: NextFunction) {
    const { headers, body, originalUrl } = req;

    console.log(`Action Request: `, { headers, body, originalUrl });

    if (next) {
      next();
    }
  }
}
