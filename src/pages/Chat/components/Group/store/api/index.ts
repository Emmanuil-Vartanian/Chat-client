import { ApiClient } from 'services/apiClient'
import { URL } from 'api'
import { AxiosResponse } from 'axios'

export const getMyGroupsAPI = (userId: string): Promise<AxiosResponse> => {
  return ApiClient.get(URL.GET_MY_GROUPS.replace(':userId', userId))
}

export const getMyGroupAPI = (userOneId: string, userTwoId: string): Promise<AxiosResponse> => {
  return ApiClient.get(
    URL.GET_MY_GROUP.replace(':userOneId', userOneId).replace(':userTwoId', userTwoId)
  )
}

export const searchUsersAPI = (userName: string): Promise<AxiosResponse> => {
  return ApiClient.get(URL.SEARCH_USERS.replace(':userName', userName))
}

export const getUserAPI = (userId: string): Promise<AxiosResponse> => {
  return ApiClient.get(URL.GET_USER.replace(':userId', userId))
}
