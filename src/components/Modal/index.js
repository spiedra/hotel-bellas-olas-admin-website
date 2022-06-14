import React from 'react'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'

const Modal = (props) => {
  return (
        <>
        <Dialog
          open={props.isOpen}
          onClose={props.onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth="true"
        >
          <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
          <DialogContent>
              {props.modalBody}
          </DialogContent>
        </Dialog>
        </>
  )
}

export default Modal
