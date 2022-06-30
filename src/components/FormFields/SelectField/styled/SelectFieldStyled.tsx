import styled from 'styled-components'
import Select from '@mui/material/Select'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'

import { FormFieldDefaultStyles } from '../../Styled/InputBootstrap'

const SelectFieldStyled = styled(Select)`
  ${FormFieldDefaultStyles}
`

export default SelectFieldStyled

export const MenuItemStyled = styled<MenuItemProps>(MenuItem)`
  width: 100%;
  white-space: ${props => (props.expanded ? 'unset !important' : 'nowrap')};
`

export const MenuItemText = styled.span`
  flex-grow: 1;
  line-height: 40px;
  overflow: auto;
  text-overflow: ellipsis;
  width: 100%;
`

export const BoldText = styled.span`
  font-weight: bold;
`

export const CheckboxStyled = styled<CheckboxProps>(Checkbox)`
  align-self: ${props => (props.expanded ? 'start !important' : 'center')};
`
