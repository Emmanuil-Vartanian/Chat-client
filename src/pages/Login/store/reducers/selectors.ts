import { createSelector } from 'reselect'

const getIsAuthenticatedState = state => state.auth.isAuthenticated
const getCurrentUserToken = state => state.auth.currentUser.token
const getCurrentUserId = state => state.auth.currentUser.userId

export const getIsAuthenticatedSelector = createSelector([getIsAuthenticatedState], value => value)

export const getCurrentUserTokenSelector = createSelector([getCurrentUserToken], value => value)

export const getCurrentUserIdSelector = createSelector([getCurrentUserId], value => value)
