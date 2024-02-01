import { ParamSchema, checkSchema } from 'express-validator'
import { CategoryType } from '~/constants/enums'
import { CATEGORY_MESSAGES } from '~/constants/messages'
import { numberEnumToArray } from '~/utils/common'
import { validate } from '~/utils/validation'

const categoryType = numberEnumToArray(CategoryType)

const categorySchema: ParamSchema = {
  isNumeric: {
    errorMessage: CATEGORY_MESSAGES.CATEGORY_MUST_BE_A_NUMBER
  },
  isIn: {
    options: [categoryType],
    errorMessage: CATEGORY_MESSAGES.CATEGORY_UNKNOW
  }
}

export const categoryValidator = validate(
  checkSchema(
    {
      name: {
        isString: {
          errorMessage: CATEGORY_MESSAGES.CATEGORY_NAME_MUST_BE_A_STRING
        },
        trim: true
      },
      category: categorySchema,
      parent_category: categorySchema
    },
    ['body']
  )
)
export const categoryTypeValidator = validate(
  checkSchema(
    {
      category: categorySchema
    },
    ['params']
  )
)
