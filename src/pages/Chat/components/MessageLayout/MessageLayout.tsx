import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import CircularProgress from '@mui/material/CircularProgress'

import { MessageLayoutContainer, MessageLoading, OpenChat } from './style'

import { getMyGroup, getMyGroups, setMyGroupsToStore } from '../Group/store/actions'
import Header from './components/Header'
import MessageList from './components/MessageList'
import { getMyGroupSelector } from '../Group/store/reducers/selectors'
import openChat from 'assets/png/openChat.png'
import {
  getMyMessages,
  readingMessage,
  setMyMessagesToStore,
  setReadMessageToStore
} from './components/MessageList/store/actions'
import { getCurrentUserIdSelector } from 'pages/Login/store/reducers/selectors'
import { getMyMessagesSelector } from './components/MessageList/store/reducers/selectors'
import socket from 'services/socket'
import useLoadingEffect from 'services/hooks/useLoadingEffect/useLoadingEffect'
import { EFFECT_LOADING } from 'constants/effectLoading'

const MessageLayout: React.FC = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const myUserId = useSelector(getCurrentUserIdSelector)
  const group = useSelector(getMyGroupSelector)
  const messages = useSelector(getMyMessagesSelector)
  const getMessagesLoader = useLoadingEffect(EFFECT_LOADING.GET_MESSAGES)

  useEffect(() => {
    if (id) {
      dispatch(getMyGroup(myUserId, id))
    }
  }, [id])

  useEffect(() => {
    if (Object.keys(group).includes('id')) {
      dispatch(getMyMessages(group.id))
    }
  }, [group])

  useEffect(() => {
    socket.on('addMessage', messages => {
      if (+id === messages.userSent.id) {
        dispatch(setMyMessagesToStore(messages))
        dispatch(readingMessage([messages]))
        socket.emit('readingMessage', messages.group.id)
      }
    })
    socket.on('myGroups', groups => {
      dispatch(setMyGroupsToStore(groups))
    })

    return () => {
      socket.removeAllListeners('addMessage')
    }
  }, [id])

  useEffect(() => {
    socket.on('readingMessage', () => {
      console.log('first2')
      dispatch(setReadMessageToStore())
      dispatch(getMyGroups(myUserId))
    })
  }, [])

  return (
    <MessageLayoutContainer>
      {id && Object.keys(group).includes('user') ? (
        <>
          <Header user={group.user} />
          {!getMessagesLoader && getMessagesLoader !== undefined ? (
            <MessageList messages={messages} />
          ) : (
            <MessageLoading>
              <CircularProgress />
            </MessageLoading>
          )}
        </>
      ) : (
        <OpenChat>
          <img src={openChat} alt={openChat} width="200px" />
          <p>Откройте чат</p>
        </OpenChat>
      )}
    </MessageLayoutContainer>
  )
}

export default MessageLayout
