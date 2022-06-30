import { createReducer } from 'typesafe-actions'
import { logOutUser, setUserAuthenticated } from '../actions'

export type AuthReducer = {
  isAuthenticated: boolean
}

const initialState = {
  isAuthenticated: false,
  currentUser: {
    token: '',
    userId: ''
  }
}

const authReducer = createReducer<AuthReducer>(initialState)
  .handleAction(setUserAuthenticated, (state, { payload }) => {
    return {
      isAuthenticated: true,
      currentUser: {
        ...state.currentUser,
        token: payload.accessToken,
        userId: payload.userId
      }
    }
  })
  .handleAction(logOutUser, () => {
    return {
      ...initialState
    }
  })

export default authReducer
