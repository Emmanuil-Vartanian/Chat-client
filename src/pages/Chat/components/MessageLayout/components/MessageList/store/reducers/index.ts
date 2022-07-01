import { createReducer } from 'typesafe-actions'

import { setMyMessagesToStore, setAddMessageToStore, setReadMessagesToStore } from '../actions'

const myMessagesInitialState = {
  data: []
}

const myMessagesReducer = createReducer(myMessagesInitialState)
  .handleAction(setMyMessagesToStore, (state, { payload }) => {
    return {
      data: payload
    }
  })
  .handleAction(setAddMessageToStore, (state, { payload }) => {
    return {
      data: [...state.data, payload]
    }
  })
  .handleAction(setReadMessagesToStore, state => {
    return {
      ...state,
      data: state.data.filter(message => (message.read = true))
    }
  })

export default myMessagesReducer
