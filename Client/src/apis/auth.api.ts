import { RegisterFormData } from 'src/components/RegisterDialog/RegisterDialog'
import { User } from 'src/types/user.type'
import { AuthResponse, SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { getRefreshTokenFromLS } from 'src/utils/out'
import { LoginFormData } from 'src/utils/rules'
export const URL_LOGIN = 'users/login'
export const URL_ADMIN_LOGIN = '/users/login-admin'
export const URL_REGISTER = 'users/register'
export const URL_LOGOUT = 'users/logout'
export const URL_REFRESH_TOKEN = 'users/refresh-token'
export const URL_GET_ALL_USERS = 'users/get-all-users'
export const URL_DELETE_ONE_USER = 'users/delete-one-user'

const authApi = {
  register(body: Omit<RegisterFormData, 'confirm_password'>) {
    return http.post<AuthResponse>(URL_REGISTER, body)
  },
  loginAdmin(body: LoginFormData) {
    return http.post<AuthResponse>(URL_ADMIN_LOGIN, body)
  },
  login(body: LoginFormData) {
    return http.post<AuthResponse>(URL_LOGIN, body)
  },
  logout() {
    return http.post(URL_LOGOUT, {
      refresh_token: getRefreshTokenFromLS()
    })
  },
  getAllUsers() {
    return http.get<SuccessResponse<User[]>>(URL_GET_ALL_USERS)
  },
  deleteOneUser(body: { email: string }) {
    return http.post<SuccessResponse<User>>(URL_DELETE_ONE_USER, body)
  }
}

export default authApi
