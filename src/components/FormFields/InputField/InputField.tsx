import React from 'react'
import { Field } from 'react-final-form'
import { TextFieldProps } from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import TextFieldStyled from './Styled/TextFieldStyled'

interface InputFieldProps {
  name: string
  placeholder?: string
  initialValue?: string
  onHandleChange?: any
  type?: string
  removeAsterisk?: boolean
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

type Props = InputFieldProps & TextFieldProps

const InputField: React.FC<Props> = props => {
  const {
    initialValue,
    name,
    placeholder,
    label,
    onHandleChange,
    type,
    startAdornment,
    endAdornment,
    removeAsterisk,
    ...rest
  } = props
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
    <Field name={name} initialValue={initialValue}>
      {props => (
        <div>
          <TextFieldStyled
            name={props.input.name}
            value={props.input.value}
            onChange={handleChange(props.input.onChange)}
            placeholder={placeholder}
            label={label}
            variant="outlined"
            type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
            removeasterisk={removeAsterisk}
            InputProps={{
              startAdornment: startAdornment,
              endAdornment:
                endAdornment ||
                (type === 'password' && (
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
                ))
            }}
            {...rest}
          />
        </div>
      )}
    </Field>
  )
}

export default InputField
