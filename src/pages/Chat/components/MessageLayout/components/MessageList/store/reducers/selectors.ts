import { createSelector } from 'reselect'

const getMyMessagesState = state => state.entities.myMessages.data

export const getMyMessagesSelector = createSelector([getMyMessagesState], value => value)
