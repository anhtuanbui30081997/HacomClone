import { Request, Response, NextFunction, RequestHandler } from 'express'
import { ParamsDictionary, Query } from 'express-serve-static-core'

export const wrapRequestHandler = (func: RequestHandler<ParamsDictionary, any, any, Query, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
