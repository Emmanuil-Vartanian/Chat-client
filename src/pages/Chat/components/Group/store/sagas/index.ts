import { all, call, put, takeLatest } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'

import { getMyGroupAPI, getMyGroupsAPI, getUserAPI, searchUsersAPI } from '../api'
import { GroupActionTypes } from '../types'
import {
  setMyGroupsToStore,
  setMyGroupToStore,
  setSearchUsersToStore,
  setUserToStore
} from '../actions'
import { clearEffectLoading, setEffectLoading } from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'

export function* myGroupsSaga(action): SagaIterator {
  const userId = action.payload

  try {
    const { data, status } = yield call(getMyGroupsAPI, userId)
    if (status === 200) {
      yield put(setMyGroupsToStore(data.list))
    }
  } catch (error) {
    const { response } = error
    console.error(GroupActionTypes.GET_MY_GROUPS, response)
  }
}

export function* myGroupSaga(action): SagaIterator {
  const { myUserId, userId } = action.payload

  try {
    const { data, status } = yield call(getMyGroupAPI, myUserId, userId)
    if (status === 200) {
      yield put(setMyGroupToStore(data))
    }
  } catch (error) {
    const { response } = error
    console.error(GroupActionTypes.GET_MY_GROUP, response)
  }
}

export function* searchUsersSaga(action): SagaIterator {
  const userName = action.payload

  try {
    const { data, status } = yield call(searchUsersAPI, userName)

    if (status === 200) {
      yield put(setSearchUsersToStore(data.list))
    }
  } catch (error) {
    const { response } = error
    console.error(GroupActionTypes.GET_SEARCH_USERS, response)
  }
}

export function* getUserSaga(action): SagaIterator {
  const userId = action.payload

  try {
    yield put(setEffectLoading(EFFECT_LOADING.GET_USER))
    const { data, status } = yield call(getUserAPI, userId)

    if (status === 200) {
      yield put(setUserToStore(data))
      yield put(clearEffectLoading(EFFECT_LOADING.GET_USER))
    }
  } catch (error) {
    const { response } = error
    console.error(GroupActionTypes.GET_USER, response)
    yield put(clearEffectLoading(EFFECT_LOADING.GET_USER))
  }
}

export default function* root() {
  yield all([
    takeLatest(GroupActionTypes.GET_MY_GROUPS, myGroupsSaga),
    takeLatest(GroupActionTypes.GET_MY_GROUP, myGroupSaga),
    takeLatest(GroupActionTypes.GET_SEARCH_USERS, searchUsersSaga),
    takeLatest(GroupActionTypes.GET_USER, getUserSaga)
  ])
}
