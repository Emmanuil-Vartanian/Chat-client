import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import { FormFieldDefaultStyles } from '../../Styled/InputBootstrap'

const TextFieldStyled = styled(TextField)`
  ${FormFieldDefaultStyles}
  input[type=number] {
    -moz-appearance: textfield;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input:disabled {
    cursor: not-allowed;
  }
  .MuiInputLabel-asterisk {
    display: ${({ removeasterisk }) => (removeasterisk ? 'none' : 'contents')};
  }
`

export default TextFieldStyled
