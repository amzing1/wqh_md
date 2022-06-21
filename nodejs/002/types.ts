import { NextFunction, Request, Response } from 'express'
export type RouteControllerFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>
