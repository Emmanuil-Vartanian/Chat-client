import { createSelector } from 'reselect'

const loaderFromState = state => state.app.loading

export const loaderSelector = createSelector(loaderFromState, loading => loading)
