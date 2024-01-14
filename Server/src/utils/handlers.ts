import { Request, Response, NextFunction, RequestHandler } from 'express'
import { ParamsDictionary, Query } from 'express-serve-static-core'

export const wrapRequestHandler = <P>(func: RequestHandler<P, any, any, Query, any>) => {
  return (req: Request<P>, res: Response, next: NextFunction) => {
    try {
      func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
