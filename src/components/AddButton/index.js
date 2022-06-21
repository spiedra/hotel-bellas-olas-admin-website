import React from 'react'
import { Button } from '@mui/material'

const AddButton = ({ onAdd }) => {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: '1.5rem' }}
        onClick={onAdd}
      >
        Agregar
      </Button>
    </>
  )
}

export default AddButton
