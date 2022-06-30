import React from 'react'
import { Field } from 'react-final-form'
import { InputProps } from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FormControlStyled from '../Styled/FormControlStyled'

interface InputFieldProps {
  name: string
  label: string
  onHandleChange?: any
  onFocus?: any
}

type Props = InputFieldProps & InputProps

const PasswordInputField: React.FC<Props> = props => {
  const { name, label, onHandleChange, onFocus } = props
  const [showPassword, setShowPassword] = React.useState(false)

  const handleChange = onChange => event => {
    onChange(event)

    if (typeof onHandleChange === 'function') {
      onHandleChange(event)
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <Field name={name}>
      {props => {
        return (
          <FormControlStyled sx={{ m: 1, width: '25ch' }} variant={'outlined'}>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <OutlinedInput
              id={name}
              name={props.input.name}
              inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off'
                }
              }}
              type={showPassword ? 'text' : 'password'}
              value={props.input.value}
              onChange={handleChange(props.input.onChange)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label={label}
              onFocus={onFocus}
            />
          </FormControlStyled>
        )
      }}
    </Field>
  )
}

export default PasswordInputField
