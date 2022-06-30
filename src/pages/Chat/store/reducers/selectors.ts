import { createSelector } from 'reselect'

const socketState = state => state.entities.socket.data

export const socketSelector = createSelector([socketState], value => value)
