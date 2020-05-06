import { Request, Response } from 'express';

const loggerMiddleware = (req: Request, resp: Response, next: any) => {
  console.log(
    `Request logged:, ${req.method} ${req.protocol}://${req.get('host')}${
      req.originalUrl
    }`
  );
  next();
};

export default loggerMiddleware;
