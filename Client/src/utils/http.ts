import axios, { AxiosError, AxiosInstance } from 'axios'
import config from 'src/constants/config'

class Http {
  public instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: config.baseUrl,
      // `timeout` specifies the number of milliseconds before the request times out.
      // If the request takes longer than `timeout`, the request will be aborted.
      timeout: 10000, // default is `0` (no timeout)
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 60 * 60, // 1h
        'expire-refresh-token': 60 * 60 * 24 // 1ngay
      }
    })
    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Do something before request is sent
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
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
      },
      (error: AxiosError) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
