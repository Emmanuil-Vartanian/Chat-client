import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import LinkIcon from '@mui/icons-material/Link'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import TelegramIcon from '@mui/icons-material/Telegram'
import DoneIcon from '@mui/icons-material/Done'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import 'emoji-mart/css/emoji-mart.css'
import { Picker, Emoji } from 'emoji-mart'
import reactStringReplace from 'react-string-replace'

import {
  ButtonStyled,
  ContentMessage,
  InputFieldStyled,
  Message,
  MessageBlock,
  MessageListContainer,
  MessageTime,
  NewGroup,
  PickerEmoji,
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

  const [emojiPickerVisible, setShowEmojiPicker] = useState(false)
  const [inputValue, setInputValue] = useState({ native: '', colons: '' })

  const handleChangeInputValue = e => {
    setInputValue({ native: e.target.value, colons: e.target.value })
  }

  const toggleEmojiPickerOpen = () => {
    setShowEmojiPicker(true)
  }

  const toggleEmojiPickerClose = () => {
    setShowEmojiPicker(false)
  }

  const addEmoji = obj => {
    setInputValue(prev => ({
      native: (prev.native + ' ' + obj.native).trim(),
      colons: (prev.colons + ' ' + obj.colons).trim()
    }))
  }

  const unreadMessages = messages => {
    return messages.filter(message => {
      if (message.userSent.id !== userId && !message.read) {
        return message
      }
    })
  }

  const handleFormSubmit = () => {
    dispatch(createMessage({ message: inputValue.colons }))
    setInputValue({ colons: '', native: '' })
    toggleEmojiPickerClose()
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (unreadMessages(messages).length) {
      dispatch(readingMessage(unreadMessages(messages)))
    }
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
                  <ContentMessage>
                    {reactStringReplace(content, /:(.+?):/g, (match, i) => (
                      <Emoji key={i} emoji={match} set="google" size={20} />
                    ))}
                  </ContentMessage>
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
        initialValues={{
          message: inputValue.native
        }}
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
                onHandleChange={handleChangeInputValue}
                startAdornment={
                  <div>
                    <LinkIcon />
                  </div>
                }
                endAdornment={
                  <>
                    <div onMouseEnter={toggleEmojiPickerOpen} onMouseLeave={toggleEmojiPickerClose}>
                      {emojiPickerVisible && (
                        <PickerEmoji>
                          <Picker
                            onSelect={addEmoji}
                            set="google"
                            notFoundEmoji
                            emojiSize={30}
                            i18n={{
                              categories: {
                                recent: 'Недавние',
                                people: 'Смайлы и люди',
                                nature: 'Животные и природа',
                                foods: 'Еда и напитки',
                                activity: 'Занятия',
                                places: 'Места и путешествия',
                                objects: 'Предметы',
                                symbols: 'Символы',
                                flags: 'Флаги'
                              }
                            }}
                          />
                        </PickerEmoji>
                      )}
                      <SentimentSatisfiedAltIcon />
                    </div>
                  </>
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
