export const USER_MESSAGES = {
  USER_NAME_IS_REQUIRED: 'User name is required',
  USER_NAME_MUST_BE_A_STRING: 'User name is must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100_CHARACTERS: 'User name length must be from 1 to 100 character',
  EMAIL_IS_INVALID: 'Email is invalid',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_MUST_BE_STRONG:
    'Password must be at least 8 characters long and contain at least 1 lowercase, at least 1 uppercase, at least 1 number and at least 1 symbol',
  VALIDATION_FORM_ERROR: 'Validation error',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_NOT_REGISTERED: 'This email is not registered',
  REGISTER_SUCCESSFULLY: 'Register successfully',
  EMAIL_IS_INCORRECT: 'Email is incorrect',
  PASSWORD_IS_INCORRECT: 'Password is incorrect',
  LOGIN_SUCCESSFULLY: 'Login successfully',
  LOGOUT_SUCCESSFULLY: 'Logout successfully',
  REFRESH_TOKEN_SUCCESSFULLY: 'Refresh token successfully',
  FORGOT_PASSWORD_REQUEST_SUCCESSFULLY: 'Forgot password request successfully',
  UPDATE_PASSWORD_SUCCESSFULLY: 'Update password successfully',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_MUST_BE_A_STRING: 'Refresh token must be a string',
  FORGOT_PASSWORD_TOKEN_MUST_BE_A_STRING: 'Forgot password token must be a string',
  USER_IS_NOT_ADMIN: 'You are not an administrator',
  GET_ALL_USERS_SUCCESSFULLY: 'Get all users successfully',
  DELETE_ONE_USER_SUCCESSFULLY: 'Delete one user successfully',
  YOU_ARE_NOT_AN_ADMIN: 'You are not an admin',
  EMAIL_IS_NOT_FOUNDED: 'Email is not founded'
} as const

export const SHOWROOM_MESSAGES = {
  REGION_MUST_BE_A_NUMBER: 'Region must be a number',
  REGION_IS_INCORRECT: 'Region is incorrect',
  GET_SHOWROOMS_SUCCESSFULLY: 'Get showrooms sucessfully'
} as const

export const ONLINE_SELLER_MESSAGES = {
  GET_ALL_ONLINE_SELLERS_SUCCESSFULLY: 'Get all online sellers sucessfully'
} as const

export const CATEGORY_MESSAGES = {
  CATEGORY_NAME_MUST_BE_A_STRING: 'Category name must be a string',
  CATEGORY_MUST_BE_A_NUMBER: 'Category must be a number',
  CATEGORY_UNKNOW: 'Category unknow',
  CREATE_CATEGORY_SUCCESSFULLY: 'Create category successfully',
  GET_CATEGORY_SUCCESSFULLY: 'Get category successfully'
} as const

export const PRODUCT_MESSAGES = {
  ADD_PRODUCT_SUCCESSFULLY: 'Add product successfully',
  UPLOAD_PRODUCT_IMAGES_SUCCESSFULLY: 'Upload product images successfully',
  GET_PRODUCT_LIST_SUCCESSFULLY: 'Get product list successfully',
  GET_PRODUCT_DETAIL_SUCCESSFULLY: 'Get product detail successfully',
  GET_QUANTITY_SUCCESSFULLY: 'Get quantity successfully',
  PRODUCT_ID_MUST_BE_A_STRING: 'Product Id must be a string',
  PRODUCT_NOT_EXISTED: 'Product not existed',
  UPDATE_VIEWS_SUCCESSFULLY: 'Update views successfully',
  SEARHC_PRODUCT_SUCCESSFULLY: 'Search product successfully'
} as const

export const PURCHASE_MESSAGES = {
  ADD_TO_CART_SUCCESSFULLY: 'Add to cart successfully',
  PRODUCT_ID_MUST_BE_A_STRING: 'Product Id must be a string',
  PRODUCT_NOT_EXISTED: 'Product not existed',
  BUY_COUNT_MUST_BE_A_NUMBER: 'Buy count must be a number',
  GET_PURCHASES_SUCESSFULLY: 'Get purchases successfully',
  UPDATE_PURCHASE_SUCCESSFULLY: 'Update purchase successfully',
  DELETE_PURCHASE_SUCCESSFULLY: 'Delete purchase successfully',
  DELETE_ALL_PURCHASE_IN_CART_SUCCESSFULLY: 'Delete all purchase in cart successfully'
}
