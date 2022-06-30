import React from 'react'
import { Form } from 'react-final-form'

import { ButtonStyled, InputBlock, RegisterTitle } from './style'
import { AuthContainer, AuthForm } from 'pages/Login/style'

import InputField from 'components/FormFields/InputField'
import { useDispatch } from 'react-redux'
import { registration } from 'pages/Login/store/actions'

const Registration: React.FC = () => {
  const dispatch = useDispatch()

  const handleFormSubmit = data => {
    dispatch(registration(data))
  }

  return (
    <AuthContainer>
      <Form
        onSubmit={handleFormSubmit}
        render={({ handleSubmit }) => (
          <form id={'create-user-form'} onSubmit={handleSubmit}>
            <AuthForm>
              <RegisterTitle>Регистрация</RegisterTitle>
              <InputBlock>
                <InputField name={'email'} label={'Email'} variant="standard" />
              </InputBlock>
              <InputBlock>
                <InputField name={'userName'} label={'Имя'} variant="standard" />
              </InputBlock>
              <InputBlock>
                <InputField name={'password'} label={'Пароль'} variant="standard" type="password" />
              </InputBlock>
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

export default Registration
