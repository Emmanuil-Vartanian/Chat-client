import { createAction } from 'typesafe-actions'
import { GroupActionTypes } from '../types'

/* SAGA ACTIONS */
const getMyGroups = createAction(GroupActionTypes.GET_MY_GROUPS, userId => userId)()

const getMyGroup = createAction(GroupActionTypes.GET_MY_GROUP, (myUserId, userId) => ({
  myUserId,
  userId
}))()

const getSearchUsers = createAction(GroupActionTypes.GET_SEARCH_USERS, userName => userName)()

const getUser = createAction(GroupActionTypes.GET_USER, userId => userId)()

/* REDUCER ACTIONS */
const setMyGroupsToStore = createAction(
  GroupActionTypes.SET_MY_GROUPS_TO_STORE,
  (groups: Record<string, any>[]) => groups
)()

const setAddGroupToStore = createAction(
  GroupActionTypes.SET_ADD_GROUP_TO_STORE,
  (group: Record<string, any>) => group
)()

const setMyGroupToStore = createAction(
  GroupActionTypes.SET_MY_GROUP_TO_STORE,
  (group: Record<string, any>) => group
)()

const setSearchUsersToStore = createAction(
  GroupActionTypes.SET_SEARCH_USERS_TO_STORE,
  (userName: Record<string, any>[]) => userName
)()

const setUserToStore = createAction(
  GroupActionTypes.SET_USER_TO_STORE,
  (user: Record<string, any>) => user
)()

const setSearchValueToStore = createAction(
  GroupActionTypes.SET_SEARCH_VALUE_TO_STORE,
  (value: string) => value
)()

export {
  getMyGroups,
  setMyGroupsToStore,
  getMyGroup,
  setMyGroupToStore,
  getSearchUsers,
  setSearchUsersToStore,
  getUser,
  setUserToStore,
  setSearchValueToStore,
  setAddGroupToStore
}
