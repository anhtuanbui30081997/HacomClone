import { RegisterFormData } from 'src/components/RegisterDialog/RegisterDialog'
import { AuthResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { getRefreshTokenFromLS } from 'src/utils/out'
import { LoginFormData } from 'src/utils/rules'
export const URL_LOGIN = 'users/login'
export const URL_ADMIN_LOGIN = '/users/login-admin'
export const URL_REGISTER = 'users/register'
export const URL_LOGOUT = 'users/logout'
export const URL_REFRESH_TOKEN = 'users/refresh-token'

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
  }
}

export default authApi
