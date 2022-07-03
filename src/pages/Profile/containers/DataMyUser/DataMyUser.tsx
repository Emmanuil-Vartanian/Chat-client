import React from 'react'
import { Form } from 'react-final-form'

import { InputFieldBlock } from './style'

import InputField from 'components/FormFields/InputField'
import Button from 'components/Button'

interface DataMyUserProps {
  userInfo: Record<string, any>
}

const DataMyUser: React.FC<DataMyUserProps> = ({ userInfo }) => {
  const handleFormSubmit = data => {
    console.log(data)
  }

  return (
    <Form
      onSubmit={handleFormSubmit}
      initialValues={userInfo}
      render={({ handleSubmit }) => (
        <form id={'change-user-form'} onSubmit={handleSubmit}>
          <div>
            <InputFieldBlock>
              <InputField name={'email'} label={'Email'} variant="outlined" />
            </InputFieldBlock>
            <InputFieldBlock>
              <InputField name={'login'} label={'Login'} variant="outlined" />
            </InputFieldBlock>
            <InputFieldBlock>
              <InputField name={'userName'} label={'User name'} variant="outlined" />
            </InputFieldBlock>
          </div>
          <div>
            Изменить пароль
            <InputFieldBlock>
              <InputField
                name={'password'}
                label={'Новый пароль'}
                variant="outlined"
                type={'password'}
              />
            </InputFieldBlock>
            <InputFieldBlock>
              <InputField
                name={'repeatPassword'}
                label={'Повторить новый пароль'}
                variant="outlined"
                type={'password'}
              />
            </InputFieldBlock>
          </div>
          <div>
            <Button variant="outlined" type="submit">
              Изменить
            </Button>
          </div>
        </form>
      )}
    />
  )
}

export default DataMyUser
