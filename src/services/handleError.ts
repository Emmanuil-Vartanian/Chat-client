import { ErrorType } from '../types'
import persistedStore from '../store'
import { setError } from '../containers/App/store/actions'
import {
  BAD_REQUEST,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR
} from '../constants/apiErrorStatuses'

const statusArray = [UNPROCESSABLE_ENTITY, BAD_REQUEST, INTERNAL_SERVER_ERROR]

const { store } = persistedStore

export const handleError = (error: ErrorType) => {
  if (error && statusArray.includes(error.status)) {
    store.dispatch(setError(error))
  }
  return true
}
