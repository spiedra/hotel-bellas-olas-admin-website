import React from 'react'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { Button, DialogActions } from '@mui/material'

const Modal = (props) => {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{props.content}</DialogContent>
      <DialogActions>
        <Button type="submit" form={props.idForm} onClick={props.onSubmit}>
          Aceptar
        </Button>
        <Button onClick={props.onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Modal
