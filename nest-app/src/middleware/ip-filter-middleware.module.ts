import { Module } from '@nestjs/common';

import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class IpFilterMiddlewareModule implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const ipAddress = req.headers['cf-connecting-ip'];

        if (ipAddress == '차단하고 싶은 IP') {
            throw new UnauthorizedException('invalid ip');
        }

        next();
    }
}
