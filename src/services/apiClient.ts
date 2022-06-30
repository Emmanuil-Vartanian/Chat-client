import axios, { CancelTokenSource } from 'axios'
import qs from 'qs'

import persistedStore from '../store'
import { UNAUTHORIZED } from 'constants/apiErrorStatuses'
import { logOutUser } from 'pages/Login/store/actions'
import { getCurrentUserTokenSelector } from 'pages/Login/store/reducers/selectors'

const windowLocation = window.location.origin
const API_BASE_URL = `${windowLocation}/`

export const ApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
})

// ApiClient.interceptors.request.use(config => {
//   return {
//     ...config,
//     headers: {
//       ...config.headers
//     }
//   }
// })

ApiClient.interceptors.request.use(config => {
  const state = persistedStore.store.getState()
  const token = getCurrentUserTokenSelector(state)

  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        'X-Auth-Token': token || ''
      }
    }
  } else {
    return {
      ...config,
      headers: {
        ...config.headers
      }
    }
  }
})

ApiClient.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const { response } = error
    if (response.status === UNAUTHORIZED) {
      persistedStore.store.dispatch(logOutUser())
    }
    return Promise.reject(error)
  }
)

export const getCancelTokenSource = (): CancelTokenSource => axios.CancelToken.source()
