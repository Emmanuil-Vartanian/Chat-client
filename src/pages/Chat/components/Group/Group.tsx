import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import MenuIcon from '@mui/icons-material/Menu'

import { GroupContainer, ChatInfo, ListChatBlock } from './style'

import { getMyGroups, getSearchUsers, setSearchUsersToStore } from './store/actions'
import { getMyGroupsSelector, getSearchUsersSelector } from './store/reducers/selectors'
import { getCurrentUserIdSelector } from 'pages/Login/store/reducers/selectors'
import InputField from 'components/FormFields/InputField'
import { Form } from 'react-final-form'
import GroupList from './compomemts/GroupList'
import { logOutUser } from 'pages/Login/store/actions'
import socket from 'services/socket'

const Group: React.FC = () => {
  const dispatch = useDispatch()
  const userId = useSelector(getCurrentUserIdSelector)
  const groups = useSelector(getMyGroupsSelector)
  const searchUsers = useSelector(getSearchUsersSelector)

  searchUsers.map(user => {
    user.user = user
    user.message = {
      content: '',
      dateChange: ''
    }
  })

  const handleFormSubmit = data => {
    console.log(data)
  }

  const handleSearchUsers = e => {
    if (e.target.value) {
      dispatch(getSearchUsers(e.target.value))
    } else {
      dispatch(setSearchUsersToStore([]))
    }
  }

  const handleLogout = () => {
    dispatch(logOutUser())
  }

  useEffect(() => {
    dispatch(getMyGroups(userId))
  }, [])

  useEffect(() => {
    const groupsIds = groups?.map(({ id }) => id)
    socket.emit('enterGroup', groupsIds)
  }, [groups])

  return (
    <GroupContainer>
      <ChatInfo>
        <div>
          <ListChatBlock>
            <GroupOutlinedIcon />
            <span className="span">Список чатов</span>
          </ListChatBlock>

          <PopupState variant="popover" popupId="demo-popup-menu">
            {popupState => (
              <React.Fragment>
                <MenuIcon {...bindTrigger(popupState)} />
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={popupState.close}>Настройки</MenuItem>
                  <MenuItem onClick={handleLogout}>Выйти</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </div>

        <Form
          onSubmit={handleFormSubmit}
          render={({ handleSubmit }) => (
            <form id={'login-user-form'} onSubmit={handleSubmit}>
              <div className="search-input">
                <InputField
                  name="search"
                  variant="standard"
                  placeholder="Search"
                  onHandleChange={handleSearchUsers}
                  endAdornment={<SearchOutlinedIcon />}
                />
              </div>
            </form>
          )}
        />
      </ChatInfo>

      {searchUsers.length ? (
        <GroupList groups={searchUsers} searchUsers={searchUsers.length === 0} />
      ) : (
        <GroupList groups={groups} searchUsers={searchUsers.length === 0} />
      )}
    </GroupContainer>
  )
}

export default Group
