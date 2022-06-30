import React, { ReactNode } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { DialogProps } from '@mui/material/Dialog'

import { DialogContentTextStyled } from './style'

import Button from 'components/Button'

interface InfoDialogProps {
  title?: string
  content: ReactNode
  actionButtonText?: string
}

const InfoDialog: React.FC<InfoDialogProps & DialogProps> = props => {
  const { open, onClose, title, content, actionButtonText } = props

  return (
    <Dialog open={open} onClose={onClose} scroll={'paper'} maxWidth={'md'} fullWidth>
      {title ? <DialogTitle>{title}</DialogTitle> : null}
      <DialogContent dividers>
        <DialogContentTextStyled tabIndex={-1} component="pre">
          {content}
        </DialogContentTextStyled>
      </DialogContent>
      {actionButtonText && (
        <DialogActions>
          <Button onClick={onClose}>{actionButtonText}</Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default InfoDialog
