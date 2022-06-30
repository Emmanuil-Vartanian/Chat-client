export enum MessageActionTypes {
  GET_MY_MESSAGES = '@@message-saga/GET_MY_MESSAGES',
  SET_START_MY_MESSAGES_TO_STORE = '@@message-reducer/SET_START_MY_MESSAGES_TO_STORE',
  SET_MY_MESSAGES_TO_STORE = '@@message-reducer/SET_MY_MESSAGES_TO_STORE',
  CREATE_MESSAGE = '@@message-saga/CREATE_MESSAGE',
  READING_MESSAGE = '@@message-saga/READING_MESSAGE',
  SET_READ_MESSAGE_TO_STORE = '@@message-reducer/SET_READ_MESSAGE_TO_STORE'
}
