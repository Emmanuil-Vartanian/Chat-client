import React, { useState } from 'react'
import { Field } from 'react-final-form'
import InputLabel from '@mui/material/InputLabel'
import { SelectProps } from '@mui/material/Select'
import Tooltip from '@mui/material/Tooltip'

import SelectFieldStyled, {
  MenuItemText,
  BoldText,
  MenuItemStyled,
  CheckboxStyled
} from './styled/SelectFieldStyled'
import FormControlStyled from '../Styled/FormControlStyled'
import Checkbox from '@mui/material/Checkbox'

const MenuProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center'
  }
}

export interface SelectFieldOption {
  id: number
  value: string | number
  text: string | number
  code?: string
  description?: string
  label?: string
}

interface InputFieldProps {
  options: SelectFieldOption[]
  initialValue?: any
  selectAllOnEmptyClose?: boolean
  expandDescription?: boolean
  onHandleChange?: any
}

const SelectField: React.FC<InputFieldProps & SelectProps> = props => {
  const {
    id,
    name,
    label,
    options,
    multiple,
    initialValue,
    expandDescription,
    onHandleChange,
    ...rest
  } = props
  const [expandedDescriptionIds, setExpandedDescriptionIds] = useState([])

  const handleChange = onChange => event => {
    let targetValue = event.target.value
    if (targetValue.includes(-1) && targetValue.length - 1 !== options.length) {
      targetValue = options.map(o => o.value)
    } else if (targetValue.includes(-1) && targetValue.length - 1 === options.length) {
      targetValue = []
    }

    onChange(targetValue)

    if (typeof onHandleChange === 'function') {
      onHandleChange(targetValue)
    }
  }

  const handleClose = (onChange, value) => event => {
    if (props.selectAllOnEmptyClose && (value === '' || value.length === 0)) {
      event.target.value = options.map(o => o.value)
      onChange(event)
    }
  }

  const getMultipleFiledValue = value => {
    return [...value]
  }

  const renderValue = (multiple, options) => selected => {
    return multiple
      ? options
          .filter(opt => selected.includes(opt.value))
          .map(filtered => filtered.text)
          .join(', ')
      : options.find(opt => opt.value === selected)?.text
  }

  const handleDescriptionClick = (id, event) => {
    if (expandDescription) {
      event.preventDefault()
      event.stopPropagation()

      if (expandedDescriptionIds.includes(id)) {
        setExpandedDescriptionIds(oldIds => oldIds.filter(_id => _id !== id))
      } else {
        setExpandedDescriptionIds(oldIds => [...oldIds, id])
      }
    }
  }

  return (
    <Field name={name} initialValue={initialValue}>
      {props => {
        return (
          <FormControlStyled variant="outlined">
            <InputLabel id={`label-${id}`}>{label}</InputLabel>
            <SelectFieldStyled
              autoWidth={false}
              labelId={`label-${id}`}
              id={id}
              name={props.input.name}
              value={multiple ? getMultipleFiledValue(props.input.value) : props.input.value}
              onChange={handleChange(props.input.onChange)}
              onClose={handleClose(props.input.onChange, props.input.value)}
              label={label}
              multiple={multiple}
              renderValue={renderValue(multiple, options)}
              MenuProps={{
                ...MenuProps,
                PaperProps: {
                  style: {
                    maxHeight: '340px'
                  }
                },
                autoFocus: false
              }}
              {...rest}
            >
              {multiple && (
                <MenuItemStyled key={`item-all`} value={-1}>
                  <Checkbox color="primary" checked={props.input.value.length === options.length} />
                  <span>All</span>
                </MenuItemStyled>
              )}
              {options.map(option => {
                return (
                  <MenuItemStyled
                    key={`item-${id}-${option.id}`}
                    value={option.value}
                    selected={false}
                    expanded={expandDescription && expandedDescriptionIds.includes(option.id)}
                  >
                    <CheckboxStyled
                      color="primary"
                      checked={props.input.value.includes(option.value)}
                      expanded={expandDescription && expandedDescriptionIds.includes(option.id)}
                    />
                    {option.description ? (
                      <Tooltip placement={'right'} title={option.text + ' ' + option.description}>
                        <MenuItemText onClick={handleDescriptionClick.bind(this, option.id)}>
                          <BoldText>{option.text}</BoldText>&nbsp;-&nbsp;
                          <span>{option.description}</span>
                        </MenuItemText>
                      </Tooltip>
                    ) : (
                      <Tooltip placement={'right'} title={option.text}>
                        <MenuItemText>{option.text}</MenuItemText>
                      </Tooltip>
                    )}
                  </MenuItemStyled>
                )
              })}
            </SelectFieldStyled>
          </FormControlStyled>
        )
      }}
    </Field>
  )
}

export default SelectField
