export const USER_MESSAGES = {
  USER_NAME_IS_REQUIRED: 'User name is required',
  USER_NAME_MUST_BE_A_STRING: 'User name is must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100_CHARACTERS: 'User name length must be from 1 to 100 character',
  EMAIL_IS_INVALID: 'Email is invalid',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_MUST_BE_STRONG:
    'Password must be at least 8 characters long and contain\
  at least 1 lowercase, at least 1 uppercase, at least 1 number and at least 1 symbol',
  VALIDATION_FORM_ERROR: 'Validation error',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_NOT_REGISTERED: 'This email is not registered',
  REGISTER_SUCCESSFULLY: 'Register successfully',
  USER_OR_PASSWORD_IS_INCORRECT: 'Email or Password is incorrect',
  LOGIN_SUCCESSFULLY: 'Login successfully',
  LOGOUT_SUCCESSFULLY: 'Logout successfully',
  REFRESH_TOKEN_SUCCESSFULLY: 'Refresh token successfully',
  FORGOT_PASSWORD_REQUEST_SUCCESSFULLY: 'Forgot password request successfully',
  UPDATE_PASSWORD_SUCCESSFULLY: 'Update password successfully',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_MUST_BE_A_STRING: 'Refresh token must be a string',
  FORGOT_PASSWORD_TOKEN_MUST_BE_A_STRING: 'Forgot password token must be a string'
} as const

export const SHOWROOM_MESSAGES = {
  REGION_MUST_BE_A_NUMBER: 'Region must be a number',
  REGION_IS_INCORRECT: 'Region is incorrect',
  GET_SHOWROOMS_SUCCESSFULLY: 'Get showrooms sucessfully'
}
