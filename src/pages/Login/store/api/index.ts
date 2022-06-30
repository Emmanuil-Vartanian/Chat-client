import { ApiClient } from 'services/apiClient'
import { URL } from 'api'
import { AxiosResponse } from 'axios'
import { AuthRequestParams, RegisteredRequestParams } from '../types'

export const doLoginAPI = (data: AuthRequestParams): Promise<AxiosResponse> => {
  return ApiClient.post(URL.LOGIN, data)
}

export const registrationAPI = (data: RegisteredRequestParams): Promise<AxiosResponse> => {
  return ApiClient.post(URL.REGISTRATION, data)
}
