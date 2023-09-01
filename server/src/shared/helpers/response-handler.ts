import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUSES, HTTP_MESSAGES } from '../constants/constants'
import { Err } from './error'

export const handleSuccessResponse = (
  res: Response,
  status: number = HTTP_STATUSES.OK,
  message: string,
  data: any = null
) => {
  const statusCode: number = status || HTTP_STATUSES.OK

  res.status(statusCode).json({
    success: true,
    code: statusCode,
    status: HTTP_MESSAGES[statusCode],
    message,
    data
  })
}

export const handleErrorResponse = (
  err: Err,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status: number = err.status || HTTP_STATUSES.INTERNAL_SERVER_ERROR

  res.status(status).json({
    success: false,
    code: err.status,
    status: HTTP_MESSAGES[err.status],
    message: err.message,
    error_details: err.errors || null
  })
}
