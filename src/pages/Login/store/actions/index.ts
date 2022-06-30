import { createAction } from 'typesafe-actions'
import { AuthActionTypes } from '../types'

const startAuth = createAction(AuthActionTypes.START_AUTH, params => params)()

const setUserAuthenticated = createAction(AuthActionTypes.AUTH_SUCCESS, payload => payload)()

const logOutUser = createAction(AuthActionTypes.LOG_OUT)()

const registration = createAction(AuthActionTypes.REGISTRATION, data => data)()

export { startAuth, setUserAuthenticated, logOutUser, registration }
