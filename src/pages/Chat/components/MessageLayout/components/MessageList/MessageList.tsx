import React, { useEffect, useRef } from 'react'
import { Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import LinkIcon from '@mui/icons-material/Link'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import TelegramIcon from '@mui/icons-material/Telegram'
import DoneIcon from '@mui/icons-material/Done'
import DoneAllIcon from '@mui/icons-material/DoneAll'

import {
  ButtonStyled,
  InputFieldStyled,
  Message,
  MessageBlock,
  MessageListContainer,
  MessageTime,
  NewGroup,
  SendMessageBlock,
  TimeAndReadMessage
} from './style'

import TimeUnix from 'components/TimeUnix'
import { createMessage, readingMessage } from './store/actions'
import { getCurrentUserIdSelector } from 'pages/Login/store/reducers/selectors'
import hi from 'assets/gif/hi.gif'

interface MessageListProps {
  messages: Record<string, any>[]
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const dispatch = useDispatch()
  const userId = useSelector(getCurrentUserIdSelector)
  const messagesEndRef = useRef(null)
  const messagesRef = useRef(null)

  const unreadMessages = messages => {
    return messages.filter(message => {
      if (message.userSent.id !== userId && !message.read) {
        return message
      }
    })
  }

  const handleFormSubmit = data => {
    dispatch(createMessage(data))
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    dispatch(readingMessage(unreadMessages(messages)))
  }, [messages])

  return (
    <MessageListContainer>
      <div>
        {messages.length ? (
          messages.map(({ id, userSent, content, read, createDate }) => {
            const myUser = userSent.id === userId
            return (
              <MessageBlock key={id} myUser={myUser} ref={messagesRef}>
                <Message myUser={myUser}>
                  <div>{content}</div>
                  <TimeAndReadMessage>
                    <MessageTime myUser={myUser}>{TimeUnix({ value: createDate })}</MessageTime>
                    {myUser ? read ? <DoneAllIcon /> : <DoneIcon /> : null}
                  </TimeAndReadMessage>
                </Message>
              </MessageBlock>
            )
          })
        ) : (
          <NewGroup>
            <img src={hi} alt="" />
          </NewGroup>
        )}
        <div ref={messagesEndRef} />
      </div>

      <Form
        onSubmit={handleFormSubmit}
        render={({ handleSubmit, form }) => (
          <form
            id={'send-message-form'}
            onSubmit={async event => {
              await handleSubmit(event)
              form.reset()
            }}
          >
            <SendMessageBlock>
              <InputFieldStyled
                name={'message'}
                placeholder={'Сообщение...'}
                variant="outlined"
                startAdornment={
                  <div>
                    <LinkIcon />
                  </div>
                }
                endAdornment={
                  <div>
                    <SentimentSatisfiedAltIcon />
                  </div>
                }
              />
              <ButtonStyled variant="outlined" type="submit">
                <TelegramIcon />
              </ButtonStyled>
            </SendMessageBlock>
          </form>
        )}
      />
    </MessageListContainer>
  )
}

export default MessageList
