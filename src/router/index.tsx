import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ROUTES } from 'constants/routes'
import ChatPage from 'pages/Chat'
import LoginPage from 'pages/Login'
import NotFoundPage from 'pages/NotFound'
import RegistrationPage from 'pages/Registration'
import { getIsAuthenticatedSelector } from 'pages/Login/store/reducers/selectors'

const MyRouter: React.FC = () => {
  const isAuthenticated = useSelector(getIsAuthenticatedSelector)

  return (
    <Routes>
      <Route path={ROUTES.NOT_FOUND_PAGE} element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={ROUTES.CHAT_PAGE} replace />} />

      {!isAuthenticated ? (
        <>
          <Route path={ROUTES.CHAT_PAGE} element={<Navigate to={ROUTES.LOGIN_PAGE} replace />} />
          <Route path={ROUTES.LOGIN_PAGE} element={<LoginPage />} />
          <Route path={ROUTES.REGISTRATION_PAGE} element={<RegistrationPage />} />
        </>
      ) : (
        <>
          <Route path={ROUTES.CHAT_PAGE} element={<ChatPage />} />
          <Route path={ROUTES.MESSAGE_PAGE} element={<ChatPage />} />
        </>
      )}
    </Routes>
  )
}

export default MyRouter
