import { all, fork } from 'redux-saga/effects'

import LoginSaga from 'pages/Login/store/sagas'
import GroupSaga from 'pages/Chat/components/Group/store/sagas'
import MessageSaga from 'pages/Chat/components/MessageLayout/components/MessageList/store/sagas'

export default function* rootSaga() {
  yield all([fork(LoginSaga), fork(GroupSaga), fork(MessageSaga)])
}
