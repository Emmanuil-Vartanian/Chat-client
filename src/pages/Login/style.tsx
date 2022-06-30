import Button from 'components/Button'
import styled from 'styled-components'

export const AuthContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const AuthForm = styled.div`
  width: 300px;
  box-shadow: 0px 2px 2px -2px rgb(29 29 29 / 8%), 0px 4px 12px rgb(29 29 29 / 8%);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  background: #fff;
`

export const RegisterTitle = styled.div`
  font-size: 25px;
  color: #427caf;
  margin-bottom: 15px;
`

export const InputBlock = styled.div`
  margin-bottom: 15px;
`

export const ButtonStyled = styled(Button)`
  margin-top: 10px !important;
`

export const LinkBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0px 10px;
`
