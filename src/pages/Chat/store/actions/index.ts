import { createAction } from 'typesafe-actions'
import { ChatActionTypes } from '../types'

/* REDUCER ACTIONS */
const setSocketToStore = createAction(ChatActionTypes.SET_SOCKET_TO_STORE, socket => socket)()

export { setSocketToStore }
