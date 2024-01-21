import { Result, ValidationChain, ValidationError, checkSchema, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import { Request, Response, NextFunction } from 'express'
import { EntityError, ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req)
    const errors: Result<ValidationError> = validationResult(req)
    // If no Error => Next to continue request
    if (errors.isEmpty()) {
      return next()
    }
    const errorsObject: Record<string, ValidationError> = errors.mapped()
    console.log(errorsObject)
    const entityError = new EntityError({ errors: {} })
    for (const key in errorsObject) {
      const { msg } = errorsObject[key]
      /**
       * If error is ErrorWithStatus, msg like:
       * msg: { message: 'test ty thoi', status: 400 }
       * {
          email: {
              type: 'field',
              value: 'buituananh1@gmail.com',
              msg: ErrorWithStatus { message: 'test ty thoi', status: 400 },
              path: 'email',
              location: 'body'
            }
          }
          so return next(msg)
       */
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }
      entityError.errors[key] = errorsObject[key]
    }
    // If has error => Next(error) to defaultErrorHandler
    next(entityError)
  }
}
