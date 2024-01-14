import { checkSchema, param } from 'express-validator'
import { RegionType } from '~/constants/enums'
import { SHOWROOM_MESSAGES } from '~/constants/messages'
import { numberEnumToArray } from '~/utils/common'
import { validate } from '~/utils/validation'

const regionTypes = numberEnumToArray(RegionType)

export const regionValidator = validate(
  checkSchema(
    {
      region: {
        isNumeric: {
          errorMessage: SHOWROOM_MESSAGES.REGION_MUST_BE_A_NUMBER
        },
        isIn: {
          options: [regionTypes],
          errorMessage: SHOWROOM_MESSAGES.REGION_IS_INCORRECT
        }
      }
    },
    ['params']
  )
)
