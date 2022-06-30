import styled from 'styled-components'

export const MessageLayoutContainer = styled.div`
  width: 68%;
`

export const OpenChat = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  text-align: center;
  font-size: 25px;
  color: #797979;
`

export const MessageLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
  > span {
    width: 60px !important;
    height: 60px !important;
  }
`
