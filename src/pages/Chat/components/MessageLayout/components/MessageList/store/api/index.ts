import { ApiClient } from 'services/apiClient'
import { URL } from 'api'
import { AxiosResponse } from 'axios'

export const getMyMessagesAPI = (groupId: string): Promise<AxiosResponse> => {
  return ApiClient.get(URL.GET_MY_MESSAGES.replace(':groupId', groupId))
}

export const createMessageAPI = (messageData: Record<string, any>): Promise<AxiosResponse> => {
  return ApiClient.post(URL.CREATE_MESSAGE, messageData)
}

export const readingMessageAPI = (messageData: Record<string, any>): Promise<AxiosResponse> => {
  return ApiClient.post(URL.READING_MESSAGE, messageData)
}
