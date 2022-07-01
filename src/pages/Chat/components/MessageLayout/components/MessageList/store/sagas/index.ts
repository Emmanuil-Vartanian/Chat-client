import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'

import { createMessageAPI, getMyMessagesAPI, readingMessageAPI } from '../api'
import { MessageActionTypes } from '../types'
import { getMyGroupSelector } from 'pages/Chat/components/Group/store/reducers/selectors'
import { getCurrentUserIdSelector } from 'pages/Login/store/reducers/selectors'
import moment from 'moment'
import { setAddMessageToStore, setMyMessagesToStore } from '../actions'
import socket from 'services/socket'
import { getMyGroup, getMyGroups } from 'pages/Chat/components/Group/store/actions'
import { clearEffectLoading, setEffectLoading } from 'containers/App/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { getMyGroupAPI } from 'pages/Chat/components/Group/store/api'

export function* getMyMessageSaga(action): SagaIterator {
  const groupId = action.payload
  const userId = yield select(getCurrentUserIdSelector)

  try {
    yield put(setEffectLoading(EFFECT_LOADING.GET_MESSAGES))
    const { data, status } = yield call(getMyMessagesAPI, groupId)

    if (status === 200) {
      if (data.list.length) {
        yield put(setMyMessagesToStore(data.list))
      }
      yield put(getMyGroups(userId))
      yield put(clearEffectLoading(EFFECT_LOADING.GET_MESSAGES))
    }
  } catch (error) {
    const { response } = error
    console.error(MessageActionTypes.GET_MY_MESSAGES, response)
    yield put(clearEffectLoading(EFFECT_LOADING.GET_MESSAGES))
  }
}

export function* createMessageSaga(action): SagaIterator {
  const { message } = action.payload
  const group = yield select(getMyGroupSelector)
  const myUserId = yield select(getCurrentUserIdSelector)

  try {
    const messageData = {
      content: message,
      userSent: myUserId,
      userReceived: group.user.id,
      dateChange: moment().format(),
      group: group.id || 'createGroup'
    }
    const { data, status } = yield call(createMessageAPI, messageData)
    if (status === 201) {
      yield put(getMyGroups(myUserId))
      socket.emit('addMessage', {
        groupId: group.id,
        userId: group.user.id,
        message: data
      })
      yield put(setAddMessageToStore(data))
      if (!Object.keys(group).includes('id')) {
        yield put(getMyGroup(myUserId, group.user.id))
        const { data, status } = yield call(getMyGroupAPI, group.user.id, myUserId)
        if (status === 200) {
          socket.emit('createChat', data)
        }
      }
    }
  } catch (error) {
    const { response } = error
    console.error(MessageActionTypes.CREATE_MESSAGE, response)
  }
}

export function* readingMessageSaga(action): SagaIterator {
  const { payload } = action
  const myUserId = yield select(getCurrentUserIdSelector)

  try {
    const ids = payload.map(message => message.id)

    const { data, status } = yield call(readingMessageAPI, { messageIds: ids })

    if (status === 201) {
      console.log(data)
      socket.emit('readingMessage', data[0].group.id)
      yield put(getMyGroups(myUserId))
    }
  } catch (error) {
    const { response } = error
    console.error(MessageActionTypes.READING_MESSAGE, response)
  }
}

export default function* root() {
  yield all([
    takeLatest(MessageActionTypes.GET_MY_MESSAGES, getMyMessageSaga),
    takeLatest(MessageActionTypes.CREATE_MESSAGE, createMessageSaga),
    takeLatest(MessageActionTypes.READING_MESSAGE, readingMessageSaga)
  ])
}
