import Button from 'components/Button'
import InputField from 'components/FormFields/InputField'
import styled from 'styled-components'

export const MessageListContainer = styled.div`
  padding: 0px 25px;
  height: 87%;
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(70, 109, 169, 1) 0%,
    rgba(0, 211, 253, 1) 100%
  );
  background: #fefefe;
  > div {
    height: 85%;
    margin: 20px 0px;
    overflow: auto;
  }
`

export const MessageBlock = styled.div`
  display: flex;
  flex-direction: ${({ myUser }) => (myUser ? 'row-reverse' : 'row')};
  margin-bottom: 6px;
`

export const Message = styled.div`
  padding: 10px 15px;
  border-radius: 8px;
  max-width: 400px;
  box-shadow: ${({ myUser }) =>
    myUser ? '-5px 8px 15px 4px #cce5ff' : '5px 8px 15px 4px #e0efff'};
  background: ${({ myUser }) => (myUser ? '#005bf5' : '#fff')};
  color: ${({ myUser }) => (myUser ? '#fff' : '#000')};
  display: flex;
  align-items: end;
  > div:first-child {
    word-break: break-word;
  }
`

export const MessageTime = styled.div`
  font-size: 12px;
  color: ${({ myUser }) => (myUser ? '#fff8' : '#000000a8')};
  margin-left: 15px;
`

export const SendMessageBlock = styled.div`
  display: flex;
  align-items: center;
  > div {
    width: 100%;
  }
`

export const InputFieldStyled = styled(InputField)`
  .MuiInputBase-input {
    background: #fff;
    border-radius: 4px;
    padding: 16.5px 14px;
  }
  fieldset {
    border: none;
  }
  .MuiOutlinedInput-root > div {
    border: 1px solid #bfc8da;
    padding: 10px;
    border-radius: 5px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    > svg {
      fill: #bfc8da;
    }
    :first-child > svg {
      transform: rotate(-45deg);
      margin-right: 10px;
    }
  }
`

export const ButtonStyled = styled(Button)`
  border-radius: 50% !important;
  background: #005bf5 !important;
  padding: 0px !important;
  min-width: 55px !important;
  height: 55px !important;
  box-shadow: -3px 8px 15px 0px #71b7ff;
  margin-left: 10px !important;
  > svg {
    fill: #fff;
  }
`

export const NewGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const TimeAndReadMessage = styled.div`
  display: flex;
  align-items: center;
  > div {
    margin-right: 5px;
  }
  > svg {
    width: 16px;
    height: 16px;
  }
`
