import { RouteControllerFn } from '../types'
import { NextFunction, Request, Response } from 'express'

export class ApiError extends Error {
  statusCode: number
  status: string
  isOperate: boolean
  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.status = statusCode.toString().startsWith('4') ? 'failed' : 'error'
    this.isOperate = true
    Error.captureStackTrace(this, this.constructor)
  }
}

export function asyncErrorCatch(fn: RouteControllerFn) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(err => next(err))
  }
}
