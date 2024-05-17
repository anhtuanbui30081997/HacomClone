import { checkSchema } from 'express-validator'
import { STATUS_CODES } from 'http'
import { JsonWebTokenError } from 'jsonwebtoken'
import { capitalize } from 'lodash'
import { ObjectId } from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import { PRODUCT_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
import databaseService from '~/services/database.service'
import { validate } from '~/utils/validation'

export const productIdValidator = validate(
  checkSchema(
    {
      id: {
        isString: {
          errorMessage: PRODUCT_MESSAGES.PRODUCT_ID_MUST_BE_A_STRING
        },
        custom: {
          options: async (value, { req }) => {
            try {
              const product = await databaseService.products.findOne({
                _id: new ObjectId(value)
              })
              if (product === null) {
                throw new Error(PRODUCT_MESSAGES.PRODUCT_NOT_EXISTED)
              }
              return true
            } catch (error) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: capitalize((error as JsonWebTokenError).message)
              })
            }
          }
        }
      }
    },
    ['params']
  )
)
