import { createReducer } from 'typesafe-actions'

import { setSocketToStore } from '../actions'

const socketInitialState = {
  data: {}
}

const socketReducer = createReducer(socketInitialState).handleAction(
  setSocketToStore,
  (state, { payload }) => {
    return {
      data: payload
    }
  }
)

export default socketReducer
