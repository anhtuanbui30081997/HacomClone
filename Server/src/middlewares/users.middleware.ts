import { body, checkSchema } from 'express-validator'
import { AUTH_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
import { validate } from '~/utils/validation'

export const RegisterValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: AUTH_MESSAGES.USER_NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: AUTH_MESSAGES.USER_NAME_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 100
          },
          errorMessage: AUTH_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100_CHARACTERS
        },
        trim: true
      },
      email: {
        isEmail: {
          errorMessage: AUTH_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
          options: (value, req) => {
            console.log(value)
            throw new ErrorWithStatus({
              status: 400,
              message: 'test ty thoi'
            })
            return true
          }
        }
      },
      password: {
        isString: {
          errorMessage: AUTH_MESSAGES.PASSWORD_MUST_BE_A_STRING
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1
          },
          errorMessage: AUTH_MESSAGES.PASSWORD_MUST_BE_STRONG
        }
      }
    },
    ['body']
  )
)
