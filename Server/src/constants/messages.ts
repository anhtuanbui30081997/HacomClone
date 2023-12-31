export const AUTH_MESSAGES = {
  USER_NAME_IS_REQUIRED: 'User name is required',
  USER_NAME_MUST_BE_A_STRING: 'User name is must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100_CHARACTERS: 'User name length must be from 1 to 100 character',
  EMAIL_IS_INVALID: 'Email is invalid',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_MUST_BE_STRONG:
    'Password must be at least 8 characters long and contain\
  at least 1 lowercase, at least 1 uppercase, at least 1 number and at least 1 symbol',
  VALIDATION_FORM_ERROR: 'Validation error'
} as const
