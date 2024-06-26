import { ParamSchema, body, checkSchema } from 'express-validator'
import HTTP_STATUS from '~/constants/httpStatus'
import { USER_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
import { LoginRequestBody } from '~/models/requests/User.requests'
import databaseServices from '~/services/database.service'
import userService from '~/services/user.service'
import { validate } from '~/utils/validation'
import { Request } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { hashPassword } from '~/utils/crypto'
import { verifyToken } from '~/utils/jwt'
import { capitalize } from 'lodash'
import { JsonWebTokenError } from 'jsonwebtoken'
import { RoleType } from '~/constants/enums'

const passwordSchema: ParamSchema = {
  isString: {
    errorMessage: USER_MESSAGES.PASSWORD_MUST_BE_A_STRING
  },
  isStrongPassword: {
    options: {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1
    },
    errorMessage: USER_MESSAGES.PASSWORD_MUST_BE_STRONG
  }
}

export const RegisterValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: USER_MESSAGES.USER_NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: USER_MESSAGES.USER_NAME_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 100
          },
          errorMessage: USER_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100_CHARACTERS
        },
        trim: true
      },
      email: {
        isEmail: {
          errorMessage: USER_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
          options: async (value, req) => {
            const isExistEmail = await userService.checkEmailExist(value as string)
            if (isExistEmail) {
              throw new Error(USER_MESSAGES.EMAIL_ALREADY_EXISTS)
            }
            return true
          }
        }
      },
      password: passwordSchema
    },
    ['body']
  )
)

export const LoginValidator = validate(
  checkSchema({
    email: {
      isEmail: {
        errorMessage: USER_MESSAGES.EMAIL_IS_INVALID
      },
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const email = value
          const user = await databaseServices.users.findOne({
            email
          })
          if (!user) {
            // Can not find this user
            throw new Error(USER_MESSAGES.EMAIL_IS_INCORRECT)
          }
          return true
        }
      }
    },
    password: {
      ...passwordSchema,
      custom: {
        options: async (value, { req }) => {
          const email = (req as Request<ParamsDictionary, any, LoginRequestBody>).body.email
          const password = value
          const user = await databaseServices.users.findOne(
            {
              email,
              password: hashPassword(password)
            },
            {
              projection: {
                password: 0
              }
            }
          )
          if (!user) {
            // Can not find this user
            throw new Error(USER_MESSAGES.PASSWORD_IS_INCORRECT)
          }
          ;(req as Request).user = user
          return true
        }
      }
    }
  })
)

export const LoginAdminValidator = validate(
  checkSchema({
    email: {
      isEmail: {
        errorMessage: USER_MESSAGES.EMAIL_IS_INVALID
      },
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const email = value
          const user = await databaseServices.users.findOne({
            email
          })
          if (!user) {
            // Can not find this user
            throw new Error(USER_MESSAGES.EMAIL_IS_INCORRECT)
          }
          if (user.role !== RoleType.Admin) {
            throw new Error(USER_MESSAGES.USER_IS_NOT_ADMIN)
          }
          return true
        }
      }
    },
    password: {
      ...passwordSchema,
      custom: {
        options: async (value, { req }) => {
          const email = (req as Request<ParamsDictionary, any, LoginRequestBody>).body.email
          const password = value
          const user = await databaseServices.users.findOne(
            {
              email,
              password: hashPassword(password)
            },
            {
              projection: {
                password: 0
              }
            }
          )
          if (!user) {
            // Can not find this user
            throw new Error(USER_MESSAGES.PASSWORD_IS_INCORRECT)
          }
          ;(req as Request).user = user
          return true
        }
      }
    }
  })
)

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value: string, { req }) => {
            const access_token = (value || '').split(' ')[1]
            if (!access_token) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: USER_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
              })
            }
            try {
              const decoded_access_token = await verifyToken({
                secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
                token: access_token
              })
              ;(req as Request).decoded_access_token = decoded_access_token
              return true
            } catch (error) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: capitalize((error as JsonWebTokenError).message)
              })
            }
          }
        }
      }
    },
    ['headers']
  )
)

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        isString: {
          errorMessage: USER_MESSAGES.REFRESH_TOKEN_MUST_BE_A_STRING
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            try {
              const decoded_refresh_token = await verifyToken({
                secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
                token: value
              })
              ;(req as Request).decoded_refresh_token = decoded_refresh_token
              return true
            } catch (error) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: capitalize((error as JsonWebTokenError).message)
              })
            }
          }
        }
      }
    },
    ['body']
  )
)

export const forgotPasswordRequestValidator = validate(
  checkSchema(
    {
      email: {
        isEmail: {
          errorMessage: USER_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
          options: async (value, req) => {
            const isExistEmail = await userService.checkEmailExist(value as string)
            if (!isExistEmail) {
              throw new Error(USER_MESSAGES.EMAIL_IS_NOT_REGISTERED)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const updatePasswordValidator = validate(
  checkSchema(
    {
      forgot_password_token: {
        isString: {
          errorMessage: USER_MESSAGES.FORGOT_PASSWORD_TOKEN_MUST_BE_A_STRING
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            try {
              const decodeed_forgot_password_token = await verifyToken({
                secretOrPublicKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string,
                token: value
              })
              ;(req as Request).decodeed_forgot_password_token = decodeed_forgot_password_token
              return true
            } catch (error) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: capitalize((error as JsonWebTokenError).message)
              })
            }
          }
        }
      },
      new_password: passwordSchema
    },
    ['body']
  )
)

export const accessTokenAdminValidator = validate(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value: string, { req }) => {
            const access_token = (value || '').split(' ')[1]
            if (!access_token) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: USER_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
              })
            }
            try {
              const decoded_access_token = await verifyToken({
                secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
                token: access_token
              })
              if (decoded_access_token.role !== RoleType.Admin) {
                throw new ErrorWithStatus({
                  status: HTTP_STATUS.UNAUTHORIZED,
                  message: USER_MESSAGES.YOU_ARE_NOT_AN_ADMIN
                })
              }
              ;(req as Request).decoded_access_token = decoded_access_token
              return true
            } catch (error) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: capitalize((error as JsonWebTokenError).message)
              })
            }
          }
        }
      }
    },
    ['headers']
  )
)
