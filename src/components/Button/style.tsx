import Button, { ButtonProps } from '@mui/material/Button'
import styled from 'styled-components'

export const ButtonStyled = styled<ButtonProps>(Button)`
  padding: 5px 30px !important;
  font-size: 16px !important;
  border: 1px solid #427caf !important;
  color: #427caf !important;
  :hover {
    background: #427caf !important;
    color: #fff !important;
  }
`
