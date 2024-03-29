import { createAction } from 'typesafe-actions'
import { MessageActionTypes } from '../types'

/* SAGA ACTIONS */
const getMyMessages = createAction(MessageActionTypes.GET_MY_MESSAGES, groupId => groupId)()

const createMessage = createAction(MessageActionTypes.CREATE_MESSAGE, messageData => messageData)()

const readingMessage = createAction(
  MessageActionTypes.READING_MESSAGE,
  unreadMessages => unreadMessages
)()

/* REDUCER ACTIONS */
const setMyMessagesToStore = createAction(
  MessageActionTypes.SET_MY_MESSAGES_TO_STORE,
  (messages: Record<string, any>[]) => messages
)()

const setAddMessageToStore = createAction(
  MessageActionTypes.SET_ADD_MESSAGE_TO_STORE,
  (messages: Record<string, any>[]) => messages
)()

const setReadMessagesToStore = createAction(MessageActionTypes.SET_READ_MESSAGES_TO_STORE)()

export {
  getMyMessages,
  setMyMessagesToStore,
  setAddMessageToStore,
  createMessage,
  readingMessage,
  setReadMessagesToStore
}
