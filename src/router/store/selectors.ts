import { createSelector } from 'reselect'

const getLocationQuery = state => state.router.location.query

export const getLocationQuerySelector = createSelector([getLocationQuery], query => query)
