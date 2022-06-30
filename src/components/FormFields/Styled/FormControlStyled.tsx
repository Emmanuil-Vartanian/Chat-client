import styled from 'styled-components'
import FormControl from '@mui/material/FormControl'

const FormControlStyled = styled(FormControl)`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
`

export default FormControlStyled
