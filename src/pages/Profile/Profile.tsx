import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import CircularProgress from '@mui/material/CircularProgress'

import { ProfileContainer } from './style'
import { MessageLoading } from 'pages/Chat/components/MessageLayout/style'

import { getUser } from 'pages/Chat/components/Group/store/actions'
import AvatarUser from './containers/AvatarUser'
import DataMyUser from './containers/DataMyUser'
import { getCurrentUserIdSelector } from 'pages/Login/store/reducers/selectors'
import { getUserSelector } from 'pages/Chat/components/Group/store/reducers/selectors'
import useLoadingEffect from 'services/hooks/useLoadingEffect/useLoadingEffect'
import { EFFECT_LOADING } from 'constants/effectLoading'
import DataOtherUser from './containers/DataOtherUser'

const Profile: React.FC = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const userId = useSelector(getCurrentUserIdSelector)
  const userInfo = useSelector(getUserSelector)
  const getUserLoader = useLoadingEffect(EFFECT_LOADING.GET_USER)

  useEffect(() => {
    dispatch(getUser(id))
  }, [id])

  return (
    <ProfileContainer>
      {!getUserLoader && Object.keys(userInfo).includes('id') ? (
        <>
          <AvatarUser avatar={userInfo.avatar} userName={userInfo.userName} />
          {userId === +id ? (
            <DataMyUser userInfo={userInfo} />
          ) : (
            <DataOtherUser
              email={userInfo.email}
              login={userInfo.login}
              userName={userInfo.userName}
            />
          )}
        </>
      ) : (
        <MessageLoading>
          <CircularProgress />
        </MessageLoading>
      )}
    </ProfileContainer>
  )
}

export default Profile
