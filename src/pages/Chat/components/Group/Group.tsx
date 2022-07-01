import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import MenuIcon from '@mui/icons-material/Menu'

import { GroupContainer, ChatInfo, ListChatBlock } from './style'

import {
  getMyGroups,
  getSearchUsers,
  setSearchUsersToStore,
  setSearchValueToStore
} from './store/actions'
import {
  getMyGroupsSelector,
  getSearchUsersSelector,
  getSearchValueSelector
} from './store/reducers/selectors'
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
  const searchValue = useSelector(getSearchValueSelector)

  searchUsers.map(user => {
    user.user = user
    user.message = {
      content: '',
      dateChange: ''
    }
  })

  const handleFormSubmit = ({ search }) => {
    if (search) {
      dispatch(getSearchUsers(search))
      dispatch(setSearchValueToStore(search))
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
    const groupIds = groups?.map(({ id }) => id)
    socket.emit('enterGroup', groupIds)
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
          initialValues={{ search: searchValue }}
          render={({ handleSubmit }) => (
            <form id={'search-user-form'} onSubmit={handleSubmit}>
              <div className="search-input">
                <InputField
                  name="search"
                  variant="standard"
                  placeholder="Search"
                  onHandleChange={handleSubmit}
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
