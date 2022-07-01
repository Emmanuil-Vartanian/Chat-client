import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import DoneIcon from '@mui/icons-material/Done'
import DoneAllIcon from '@mui/icons-material/DoneAll'

import {
  GroupBlock,
  GroupsContainer,
  GroupSidebar,
  LastMessage,
  LastMessageBlock,
  ReadAndTimeBlock,
  UnreadMessages,
  UserAvatar,
  UserData,
  UserName,
  UserNotAvatar,
  UserOnline
} from './style'

import DateUnix from 'components/DateUnix'
import { ROUTES } from 'constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchUsersToStore, setSearchValueToStore } from '../../store/actions'
import socket from 'services/socket'
import { getCurrentUserIdSelector } from 'pages/Login/store/reducers/selectors'
import { setMyMessagesToStore } from 'pages/Chat/components/MessageLayout/components/MessageList/store/actions'

interface GroupListProps {
  groups: Record<string, any>
  searchUsers: boolean
}

const GroupList: React.FC<GroupListProps> = ({ groups, searchUsers }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const myUserId = useSelector(getCurrentUserIdSelector)
  const { id } = useParams()
  const [userIdOnline, setUserIdOnline] = useState(null)

  const handleToMessage = userId => () => {
    navigate(ROUTES.MESSAGE_PAGE.replace(':id', userId))
    dispatch(setSearchUsersToStore([]))
    if (!searchUsers) {
      dispatch(setSearchValueToStore(''))
      dispatch(setMyMessagesToStore([]))
    }
  }

  const numberUnreadMessages = messages => {
    if (searchUsers) {
      const unreadMessages = messages.filter(
        message => message.read === false && message.userSent.id !== myUserId
      )
      return unreadMessages.length
    }
    return 0
  }

  useEffect(() => {
    socket.on('userOnline', data => {
      setUserIdOnline(data)
    })
  }, [])

  return (
    <GroupSidebar>
      <GroupsContainer>
        {groups.map(({ user, lastMessage, dateChange, messages }, index) => (
          <GroupBlock key={index} onClick={handleToMessage(user.id)} active={+id === user.id}>
            <UserAvatar>
              {user.avatar ? (
                <img src={user.avatar} alt={user.avatar} />
              ) : (
                <UserNotAvatar>
                  <span>{user.userName.substr(0, 1)}</span>
                </UserNotAvatar>
              )}
              {user.id === userIdOnline || user.online ? <UserOnline /> : null}
            </UserAvatar>
            <UserData>
              <UserName active={+id === user.id}>
                <span>{user.userName}</span>
                {searchUsers && (
                  <ReadAndTimeBlock>
                    {myUserId === messages[messages.length - 1]?.userSent?.id ? (
                      messages[messages.length - 1].read ? (
                        <DoneAllIcon />
                      ) : (
                        <DoneIcon />
                      )
                    ) : null}
                    <span>{dateChange ? DateUnix({ value: dateChange }) : ''}</span>
                  </ReadAndTimeBlock>
                )}
              </UserName>
              <LastMessageBlock>
                {searchUsers ? <LastMessage>{lastMessage || ''}</LastMessage> : null}
                {numberUnreadMessages(messages) ? (
                  <UnreadMessages>{numberUnreadMessages(messages)}</UnreadMessages>
                ) : null}
              </LastMessageBlock>
            </UserData>
          </GroupBlock>
        ))}
      </GroupsContainer>
    </GroupSidebar>
  )
}

export default GroupList
