import React from 'react'
import { Field } from 'react-final-form'
import { CheckboxProps } from '@mui/material/Checkbox'
import CheckboxStyled from './Styled/CheckboxStyled'
import FormControlLabel from '@mui/material/FormControlLabel'
import CheckboxFormControlStyled from './Styled/CheckboxFormControlStyled'

interface InputFieldProps {
  name: string
  label?: string
  onHandleChange?: any
}

type Props = InputFieldProps & CheckboxProps

const CheckboxField: React.FC<Props> = props => {
  const { name, label, onHandleChange } = props

  const handleChange = onChange => event => {
    onChange(event)

    if (typeof onHandleChange === 'function') {
      onHandleChange(event)
    }
  }

  return (
    <Field name={name}>
      {props => {
        return (
          <CheckboxFormControlStyled>
            <FormControlLabel
              control={
                <CheckboxStyled
                  checked={props.input.value || false}
                  onChange={handleChange(props.input.onChange)}
                  name={props.input.name}
                  color={'primary'}
                />
              }
              label={label}
            />
          </CheckboxFormControlStyled>
        )
      }}
    </Field>
  )
}

export default CheckboxField
