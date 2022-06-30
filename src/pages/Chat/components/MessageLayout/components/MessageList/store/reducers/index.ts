import { createReducer } from 'typesafe-actions'

import { setMyMessagesToStore, setReadMessageToStore, setStartMyMessagesToStore } from '../actions'

const myMessagesInitialState = {
  data: []
}

const myMessagesReducer = createReducer(myMessagesInitialState)
  .handleAction(setStartMyMessagesToStore, (state, { payload }) => {
    return {
      data: payload
    }
  })
  .handleAction(setMyMessagesToStore, (state, { payload }) => {
    return {
      data: [...state.data, payload]
    }
  })
  .handleAction(setReadMessageToStore, state => {
    return {
      ...state,
      data: state.data.filter(message => (message.read = true))
    }
  })

export default myMessagesReducer
