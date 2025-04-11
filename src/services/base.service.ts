import { axiosInstance } from '@/core/lib/axios'
import { AxiosInstance, AxiosRequestConfig } from 'axios'

export class BaseService {
  protected http: AxiosInstance

  constructor(httpInstance: AxiosInstance = axiosInstance) {
    this.http = httpInstance
    this.http.interceptors.request.use((config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    })
  }

  protected get<T>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.http.get<T>(url, { params, ...config }).then((res) => res.data)
  }

  protected post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.http.post<T>(url, data, config).then((res) => res.data)
  }

  protected put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.http.put<T>(url, data, config).then((res) => res.data)
  }

  protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.http.delete<T>(url, config).then((res) => res.data)
  }
}
