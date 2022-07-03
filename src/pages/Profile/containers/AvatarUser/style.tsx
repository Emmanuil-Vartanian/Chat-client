import styled from 'styled-components'

export const AvatarContainer = styled.div`
  height: 280px;
  > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`

export const DefaultAvatar = styled.div`
  height: 100%;
  background: green;
  color: white;
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`
