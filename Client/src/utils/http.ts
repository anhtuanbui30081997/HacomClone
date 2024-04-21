import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import { URL_ADMIN_LOGIN, URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './out'
import { AuthResponse, ErrorResponse, RefreshTokenResponse } from 'src/types/utils.type'
import { isAxiosUnauthorizedError } from './utils'

export class Http {
  public instance: AxiosInstance
  private access_token: string
  private refresh_token: string
  private refreshTokenRequest: Promise<string> | null
  constructor(contentType: string) {
    this.access_token = getAccessTokenFromLS()
    this.refresh_token = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseUrl,
      // `timeout` specifies the number of milliseconds before the request times out.
      // If the request takes longer than `timeout`, the request will be aborted.
      timeout: 10000, // default is `0` (no timeout)
      headers: {
        'Content-Type': contentType
      }
    })
    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        if (this.access_token && config.headers) {
          config.headers.Authorization = `Bearer ${this.access_token}`
          return config
        }
        return config
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER || url === URL_ADMIN_LOGIN) {
          const data = response.data
          this.access_token = (data as AuthResponse).data.access_token
          this.refresh_token = (data as AuthResponse).data.refresh_token
          setAccessTokenToLS(this.access_token)
          setRefreshTokenToLS(this.refresh_token)
          setProfileToLS((data as AuthResponse).data.user)
        }
        if (url === URL_LOGOUT) {
          this.access_token = ''
          this.refresh_token = ''
          clearLS()
        }
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
      },
      (error: AxiosError) => {
        // Chi toast loi khong phai 422 va 401
        if (
          ![HttpStatusCode.Unauthorized, HttpStatusCode.UnprocessableEntity].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data
          const message = data.message
          toast.error(message)
        }

        // Neu loi 401 Unauthorized
        if (isAxiosUnauthorizedError<ErrorResponse<{}>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
          // Nếu token hết hạn và đó không phải là request refresh_token thì tiến hành refresh token
          if (error.response?.data.message === 'Jwt expired' && config.url !== URL_REFRESH_TOKEN) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Giữ refreshTokenRequest trong 10s cho nhưng request tiếp theo nêu co 401 thi dung
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              return this.instance({
                ...config,
                headers: { ...config.headers, authorization: `Bearer ${access_token}` }
              })
            })
          }

          // Những trường hợp như token không đúng, không truyền token
          // Token hết hạn nhưng gọi refresh token bị fail thì tiến hành xóa localStorage và toast message lỗi
          clearLS()
          this.access_token = ''
          this.refresh_token = ''
          toast.error(error.response?.data.message)
        }
        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refresh_token
      })
      .then((res) => {
        const { access_token } = res.data.data
        this.access_token = access_token
        return access_token
      })
      .catch((error) => {
        clearLS()
        this.access_token = ''
        this.refresh_token = ''
        throw error
      })
  }
}

const http = new Http('application/json').instance

export default http
