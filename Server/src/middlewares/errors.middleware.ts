import { Response, Request, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'
export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  try {
    if (err instanceof ErrorWithStatus) {
      // Logger.error(`[ERROR] - Status: ${err.status} - Message: ${err.message}`)
      console.log(`[ERROR] - Status: ${err.status} - Message: ${err.message}`)
      return res.status(err.status).json(omit(err, ['status']))
    }
  } catch (error) {
    // Logger.error(`[ERROR] - Status: ${HTTP_STATUS.INTERNAL_SERVER_ERROR} - Message: Internal server error`)
    console.log(`[ERROR] - Status: ${HTTP_STATUS.INTERNAL_SERVER_ERROR} - Message: Internal server error`)
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
      errorInfo: omit(error as any, 'stack')
    })
  }
}
