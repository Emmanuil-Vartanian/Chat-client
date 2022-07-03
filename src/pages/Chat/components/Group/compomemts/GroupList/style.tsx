import styled from 'styled-components'

export const GroupSidebar = styled.div`
  overflow: overlay;
  max-height: 89.5%;
  height: 100%;
  margin-top: 10px;
  background: #fafafa;
`

export const GroupsContainer = styled.div`
  max-width: 280px;
  width: 100%;
  margin: 0 auto;
`

export const GroupBlock = styled.div`
  height: 50px;
  padding: 12px 10px;
  cursor: pointer;
  background: ${({ active }) => (active ? '#fff' : 'inherit')};
  border-radius: ${({ active }) => (active ? '8px' : '0px')};
  box-shadow: ${({ active }) =>
    active ? '40px 20px 15px -7px #E8EEFC, 115px 20px 15px -7px #dde8ff' : 'none'};
  transform: ${({ active }) => (active ? 'scale(1.1)' : 'scale(1)')};
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  transition: background, 0.3s;
  > a:hover {
    color: #000;
  }
  :hover {
    background: #fff;
    border-radius: 8px;
    box-shadow: 40px 20px 15px -7px #e8eefc, 115px 20px 15px -7px #dde8ff;
    transform: scale(1.1);
  }
`

export const UserAvatar = styled.div`
  float: left;
  width: 48px;
  height: 48px;
  margin-right: 25px;
  position: relative;
  & > img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 25px;
    object-fit: cover;
  }
`

export const UserNotAvatar = styled.div`
  background: green;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  position: relative;
  & > p {
    margin-top: -2px;
    margin-right: -1px;
  }
`

export const UserData = styled.div`
  width: 100%;
  overflow: hidden;
`

export const UserName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  & > span {
    font-weight: 600;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 175px;
    white-space: nowrap;
  }
  > div > span {
    font-size: 13px;
    color: #979797;
  }
`

export const ReadAndTimeBlock = styled.div`
  display: flex;
  align-items: center;
  > svg {
    width: 16px;
    height: 16px;
    fill: #005bf5;
    margin: 0px 2px 1px 0px;
  }
`

export const LastMessage = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 10px;
  height: 1.4em;
  color: #979797;
  white-space: nowrap;
  display: flex;
  align-items: center;
  > span {
    margin: 0px 1px;
  }
`

export const UserOnline = styled.div`
  width: 9px;
  height: 9px;
  background: #03c603;
  border-radius: 50%;
  border: 2px solid white;
  position: absolute;
  right: 1px;
  bottom: 1px;
`

export const LastMessageBlock = styled.div`
  display: flex;
  justify-content: space-between;
`

export const UnreadMessages = styled.div`
  border-radius: 50%;
  width: 24px;
  height: 24px;
  background: #005bf5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #fff;
`
