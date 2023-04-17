import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers['auth-user'];
    if (!auth) {
      return res.status(401).json({
        message: 'authentification needed',
      });
    }
    try {
      const decodedToken = jwt.verify(auth.toString(), 'intToWin');
      req['userId'] = decodedToken['userId'];
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'authentification needed',
      });
    }
  }
}