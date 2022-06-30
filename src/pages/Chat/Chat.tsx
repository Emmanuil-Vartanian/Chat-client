import React, { useEffect } from 'react'

import { ChatContainer, ChatBlock } from './style'

import Group from './components/Group'
import MessageLayout from './components/MessageLayout'
import socket from 'services/socket'
import { useSelector } from 'react-redux'
import { getCurrentUserIdSelector } from 'pages/Login/store/reducers/selectors'

const Chat: React.FC = () => {
  const userId = useSelector(getCurrentUserIdSelector)

  useEffect(() => {
    socket.emit('userOnline', userId)
  }, [])

  return (
    <ChatContainer>
      <ChatBlock>
        <Group />
        <MessageLayout />
      </ChatBlock>
    </ChatContainer>
  )
}

export default Chat
