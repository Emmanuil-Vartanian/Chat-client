import { createReducer } from 'typesafe-actions'
import { combineReducers } from 'redux'
import { orderBy } from 'lodash'

import {
  setAddGroupToStore,
  setMyGroupsToStore,
  setMyGroupToStore,
  setSearchUsersToStore,
  setSearchValueToStore,
  setUserToStore
} from '../actions'

const myGroupsInitialState = {
  data: []
}

const myGroupInitialState = {
  data: {}
}

const searchUsersInitialState = {
  data: [],
  value: ''
}

const getUserInitialState = {
  data: {}
}

const myGroupsReducer = createReducer(myGroupsInitialState)
  .handleAction(setMyGroupsToStore, (state, { payload }) => {
    return {
      data: [...payload]
    }
  })
  .handleAction(setAddGroupToStore, (state, { payload }) => {
    const newState = [...state.data, payload]
    const sortState = orderBy(newState, ['dateChange'], ['desc'])
    return {
      data: sortState
    }
  })

const myGroupReducer = createReducer(myGroupInitialState).handleAction(
  setMyGroupToStore,
  (state, { payload }) => {
    return {
      data: payload
    }
  }
)

const searchUsersReducer = createReducer(searchUsersInitialState)
  .handleAction(setSearchUsersToStore, (state, { payload }) => {
    return {
      ...state,
      data: [...payload]
    }
  })
  .handleAction(setSearchValueToStore, (state, { payload }) => {
    return {
      ...state,
      value: payload
    }
  })

export const getUserReducer = createReducer(getUserInitialState).handleAction(
  setUserToStore,
  (state, { payload }) => {
    return {
      data: payload
    }
  }
)

const myGroupReducers = combineReducers({
  myGroups: myGroupsReducer,
  myGroup: myGroupReducer,
  searchUsers: searchUsersReducer
})

export default myGroupReducers
