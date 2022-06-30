import { createSelector } from 'reselect'

const getMyGroupsState = state => state.entities.group.myGroups.data
const getMyGroupState = state => state.entities.group.myGroup.data
const getSearchUsersState = state => state.entities.group.searchUsers.data
const getUserState = state => state.entities.infoUser.data

export const getMyGroupsSelector = createSelector([getMyGroupsState], value => value)
export const getMyGroupSelector = createSelector([getMyGroupState], value => value)
export const getSearchUsersSelector = createSelector([getSearchUsersState], value => value)
export const getUserSelector = createSelector([getUserState], value => value)
