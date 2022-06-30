export interface AuthRequestParams {
  email: string
  password: string
}

export interface RegisteredRequestParams {
  email: string
  userName: string
  password: string
}

export enum AuthActionTypes {
  START_AUTH = '@@auth-saga/START_AUTH',
  AUTH_SUCCESS = '@@auth-reducer/AUTH_SUCCESS',
  LOG_OUT = '@@auth-reducer/LOG_OUT',
  REGISTRATION = '@@auth-saga/REGISTRATION'
}
