import { Request, Response, NextFunction, RequestHandler } from 'express'

export const wrapRequestHandler = <P>(func: RequestHandler<P, any, any, any, any>) => {
  return (req: Request<P>, res: Response, next: NextFunction) => {
    try {
      func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
