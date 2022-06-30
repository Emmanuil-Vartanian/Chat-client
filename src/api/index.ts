/* SERVICES */
const AUTH_SERVICE = `/auth`
const GROUP_SERVICE = `/group`
const MESSAGE_SERVICE = `/message`

/* AUTH SERVICE */
const LOGIN = `${AUTH_SERVICE}/login`
const REGISTRATION = `${AUTH_SERVICE}/registration`
const SEARCH_USERS = `${AUTH_SERVICE}/list/:userName`
const GET_USER = `${AUTH_SERVICE}/:userId`

/* GROUPE SERVICE */
const GET_MY_GROUPS = `${GROUP_SERVICE}/my-list/:userId`
const GET_MY_GROUP = `${GROUP_SERVICE}/my-group/:userOneId/:userTwoId`

/* MESSAGE SERVICE */
const GET_MY_MESSAGES = `${MESSAGE_SERVICE}/list/:groupId`
const CREATE_MESSAGE = `${MESSAGE_SERVICE}/create-message`
const READING_MESSAGE = `${MESSAGE_SERVICE}/reading-message`

export const URL = {
  LOGIN,
  REGISTRATION,
  SEARCH_USERS,
  GET_USER,
  GET_MY_GROUPS,
  GET_MY_GROUP,
  GET_MY_MESSAGES,
  CREATE_MESSAGE,
  READING_MESSAGE
}
