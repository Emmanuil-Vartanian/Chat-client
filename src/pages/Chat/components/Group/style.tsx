import styled from 'styled-components'

export const GroupContainer = styled.div`
  width: 32%;
  min-width: 310px;
  max-height: 100%;
  padding-top: 15px;
  position: relative;
`

export const ChatInfo = styled.div`
  padding: 5px 13px 0 15px;
  & > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #6a6a6a;
  }
`

export const ListChatBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > span {
    margin-left: 5px;
  }
`
