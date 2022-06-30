import { createReducer } from 'typesafe-actions'

import { actions } from '../actions'
import { ErrorType } from 'types'

export interface StateToProps {
  error: ErrorType
  loading: { [name: string]: boolean }
}

export const initialState: StateToProps = {
  error: null,
  loading: {}
}

const appReducers = createReducer(initialState)
  .handleAction(actions.setEffectLoading, (state, { payload }) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        [payload.name]: true
      }
    }
  })
  .handleAction(actions.clearEffectLoading, (state, { payload }) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        [payload.name]: false
      }
    }
  })
  .handleAction(actions.setError, (state, { payload }) => {
    return {
      ...state,
      error: payload.error
    }
  })

export default appReducers
