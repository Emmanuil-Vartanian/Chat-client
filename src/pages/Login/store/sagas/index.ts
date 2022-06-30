import { all, call, put, takeLatest } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'

import { setUserAuthenticated } from '../actions'
import { ROUTES } from 'constants/routes'
import { doLoginAPI, registrationAPI } from '../api'
import { AuthActionTypes } from '../types'
import { push } from 'components/Navigation/History'

export function* doLoginSaga(action): SagaIterator {
  const data = action.payload

  try {
    const result = yield call(doLoginAPI, data)
    if (result.status === 201) {
      yield put(setUserAuthenticated(result.data))
      yield put(push(ROUTES.CHAT_PAGE))
    }
  } catch (error) {
    const { response } = error
    console.error(AuthActionTypes.START_AUTH, response)
  }
}

export function* registrationSaga(action): SagaIterator {
  const data = action.payload

  try {
    const result = yield call(registrationAPI, data)

    if (result.status === 201) {
      yield put(push(ROUTES.LOGIN_PAGE))
    }
  } catch (error) {
    const { response } = error
    console.error(AuthActionTypes.REGISTRATION, response)
  }
}

export default function* root() {
  yield all([
    takeLatest(AuthActionTypes.START_AUTH, doLoginSaga),
    takeLatest(AuthActionTypes.REGISTRATION, registrationSaga)
  ])
}
