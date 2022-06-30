import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import appReducer, { StateToProps as AppInitialStateType } from 'containers/App/store/reducers'
import authReducer, { AuthReducer } from 'pages/Login/store/reducers'
import myGroupReducers, { getUserReducer } from 'pages/Chat/components/Group/store/reducers'
import myMessagesReducer from 'pages/Chat/components/MessageLayout/components/MessageList/store/reducers'
import socketReducer from 'pages/Chat/store/reducers'

export interface State {
  auth: AuthReducer
  router: RouterState
  app: AppInitialStateType
  entities: Record<string, any>
}

const entitiesReducer = combineReducers({
  group: myGroupReducers,
  myMessages: myMessagesReducer,
  infoUser: getUserReducer,
  socket: socketReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}

const createRootReducer = (history: History): any =>
  persistCombineReducers<State>(persistConfig, {
    auth: authReducer,
    router: connectRouter(history),
    app: appReducer,
    entities: entitiesReducer
  })

export default createRootReducer
