import React from 'react'

import { AvatarContainer, DefaultAvatar } from './style'

interface AvatarUserProps {
  avatar: string
  userName: string
}

const AvatarUser: React.FC<AvatarUserProps> = ({ avatar, userName }) => {
  return (
    <AvatarContainer>
      {avatar ? (
        <img src={avatar} alt="avatar" />
      ) : (
        <DefaultAvatar>
          <span>{userName.substring(0, 1)}</span>
        </DefaultAvatar>
      )}
    </AvatarContainer>
  )
}

export default AvatarUser
