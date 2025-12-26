import { Request, Response } from 'express';

export const getHealthStatus = (_req: Request, res: Response): void => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  };

  res.status(200).json(healthcheck);
};