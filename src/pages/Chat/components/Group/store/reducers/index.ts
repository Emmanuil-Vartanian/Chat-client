import { createReducer } from 'typesafe-actions'
import { combineReducers } from 'redux'

import {
  setMyGroupsToStore,
  setMyGroupToStore,
  setSearchUsersToStore,
  setUserToStore
} from '../actions'

const myGroupsInitialState = {
  data: []
}

const myGroupInitialState = {
  data: {}
}

const searchUsersInitialState = {
  data: []
}

const getUserInitialState = {
  data: {}
}

const myGroupsReducer = createReducer(myGroupsInitialState).handleAction(
  setMyGroupsToStore,
  (state, { payload }) => {
    return {
      data: [...payload]
    }
  }
)

const myGroupReducer = createReducer(myGroupInitialState).handleAction(
  setMyGroupToStore,
  (state, { payload }) => {
    return {
      data: payload
    }
  }
)

const searchUsersReducer = createReducer(searchUsersInitialState).handleAction(
  setSearchUsersToStore,
  (state, { payload }) => {
    return {
      data: [...payload]
    }
  }
)

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
