import React, { useEffect, useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { UserAvatar, UserNotAvatar } from 'pages/Chat/components/Group/compomemts/GroupList/style'
import { HeaderContainer, UserInfoBlock } from './style'
import socket from 'services/socket'
import { push } from 'components/Navigation/History'
import { ROUTES } from 'constants/routes'

interface HeaderProps {
  user: Record<string, any>
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [userIdOnline, setUserIdOnline] = useState(null)

  const handleGoProfile = () => {
    push(ROUTES.PROFILE_PAGE.replace(':id', user.id))
  }

  useEffect(() => {
    socket.on('userOnline', data => {
      setUserIdOnline(data)
    })
  }, [])

  return (
    <HeaderContainer>
      <UserInfoBlock onClick={handleGoProfile}>
        <UserAvatar>
          {user.avatar ? (
            <img src={user.avatar} alt={user.avatar} />
          ) : (
            <UserNotAvatar>
              <span>{user.userName.substring(0, 1)}</span>
            </UserNotAvatar>
          )}
        </UserAvatar>

        <div>
          <div>{user.userName}</div>
          <div>
            {user.id === userIdOnline || user.online ? <div>онлайн</div> : <div>оффлайн</div>}
          </div>
        </div>
      </UserInfoBlock>

      <PopupState variant="popover" popupId="demo-popup-menu">
        {popupState => (
          <React.Fragment>
            <MoreVertIcon {...bindTrigger(popupState)} />
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={popupState.close}>Удалить чат</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </HeaderContainer>
  )
}

export default Header
