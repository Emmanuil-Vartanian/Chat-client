import React from 'react'
import { Form } from 'react-final-form'

import {
  ButtonStyled,
  InputBlock,
  AuthContainer,
  AuthForm,
  RegisterTitle,
  LinkBlock
} from './style'

import InputField from 'components/FormFields/InputField'
import { useDispatch } from 'react-redux'
// import { registration } from './store/actions'
import Link from 'components/Link'
import { ROUTES } from 'constants/routes'
import { startAuth } from './store/actions'

const Login: React.FC = () => {
  const dispatch = useDispatch()

  const handleFormSubmit = data => {
    dispatch(startAuth(data))
  }

  return (
    <AuthContainer>
      <Form
        onSubmit={handleFormSubmit}
        render={({ handleSubmit }) => (
          <form id={'login-user-form'} onSubmit={handleSubmit}>
            <AuthForm>
              <RegisterTitle>Авторизация</RegisterTitle>
              <InputBlock>
                <InputField name={'email'} label={'Email'} variant="standard" />
              </InputBlock>
              <InputBlock>
                <InputField name={'password'} label={'Пароль'} variant="standard" type="password" />
              </InputBlock>
              <LinkBlock>
                <Link to={ROUTES.REGISTRATION_PAGE}>Забыли пароль?</Link>
                <Link to={ROUTES.REGISTRATION_PAGE}>Зарегистрироваться</Link>
              </LinkBlock>
              <ButtonStyled variant="outlined" type="submit">
                send
              </ButtonStyled>
            </AuthForm>
          </form>
        )}
      />
    </AuthContainer>
  )
}

export default Login
