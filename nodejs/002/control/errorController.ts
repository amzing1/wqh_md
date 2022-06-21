import { Request, Response, NextFunction } from 'express'
import { preProcessFile } from 'typescript'
import { ApiError } from '../utils/ApiError'

function handleCastErrorDB(err: any) {
  const message = `Invalid ${err.path}: ${err.value}`
  return new ApiError(400, message)
}

function handleDuplicateFiledsDB(err: any) {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)
  const message = `duplicate field value: ${value}, please use another value`
  return new ApiError(400, message)
}

function handleValidationErrorDB(err: any) {
  const errors = Object.values(err.errors).map((el: any) => el.message)
  const message = `Invalid input data. ${errors.join('. ')}`
  return new ApiError(400, message)
}

function handleJwtError(err: any) {
  return new ApiError(401, 'invalid token')
}

function handleJwtExpiredError(err: any) {
  return new ApiError(401, 'token is expired')
}

function sendErrorDev(err: ApiError, res: Response) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  })
}

function sendErrorProd(err: ApiError, res: Response) {
  if (err.isOperate) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  } else {
    res.status(500).json({
      status: 'error',
      message: 'something went very wrong!'
    })
  }
}

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err }
    if (error.name === 'CastError') {
      error = handleCastErrorDB(error)
    }
    if (error.code === 11100) {
      error = handleDuplicateFiledsDB(error)
    }
    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error)
    }
    if (error.name === 'JsonWebTokenError') {
      error = handleJwtError(error)
    }
    if (error.name === 'JsonWebTokenExpiredError') {
      error = handleJwtExpiredError(error)
    }
    sendErrorProd(error, res)
  }
}
