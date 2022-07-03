import React from 'react'

interface DataOtherUserProps {
  email: string
  login: string
  userName: string
}

const DataOtherUser: React.FC<DataOtherUserProps> = ({ email, login, userName }) => {
  return (
    <div>
      <div>
        <span>Email: </span>
        <span>{email}</span>
      </div>
      <div>
        <span>Login: </span>
        <span>{login}</span>
      </div>
      <div>
        <span>User name: </span>
        <span>{userName}</span>
      </div>
    </div>
  )
}

export default DataOtherUser
