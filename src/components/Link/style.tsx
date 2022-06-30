import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const LinkStyled = styled(Link)`
  text-decoration: none;
  color: ${({ color }) => color || '#000'};
  transition: all 0.25s;
  :hover {
    color: #427caf;
  }
`
