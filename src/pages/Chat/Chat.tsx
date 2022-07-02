import React, { useEffect } from 'react'

import { ChatContainer, ChatBlock } from './style'

import Group from './components/Group'
import MessageLayout from './components/MessageLayout'
import socket from 'services/socket'
import { useSelector } from 'react-redux'
import { getCurrentUserIdSelector } from 'pages/Login/store/reducers/selectors'
import Profile from 'pages/Profile'
import { useMatch } from 'react-router'
import { ROUTES } from 'constants/routes'

const Chat: React.FC = () => {
  const userId = useSelector(getCurrentUserIdSelector)
  const profilePage = useMatch(ROUTES.PROFILE_PAGE)
  // console.log(useMatch(ROUTES.PROFILE_PAGE))
  useEffect(() => {
    socket.emit('userOnline', userId)
  }, [])

  return (
    <ChatContainer>
      <ChatBlock>
        <Group />
        {profilePage ? <Profile /> : <MessageLayout />}
      </ChatBlock>
    </ChatContainer>
  )
}

export default Chat
