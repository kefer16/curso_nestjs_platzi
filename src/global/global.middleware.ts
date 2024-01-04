import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { GlobalService } from './global.service';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from 'src/bd/config.bd';
import { ErrorService } from 'src/error/error.service';

@Injectable()
export class GlobalMiddleware implements NestMiddleware {
  constructor(
    private srvGlobal: GlobalService,
    private srvError: ErrorService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const code_send = uuidv4();
    try {
      prisma.$connect;
      await this.srvGlobal.registarIndividualRequest(code_send, req);
      next();
    } catch (error: any) {
      await this.srvError.grabarError(400, code_send, error, res);
    } finally {
      await this.srvGlobal.registrarIndividualResponse(code_send, res);
      prisma.$disconnect;
    }
  }
}
