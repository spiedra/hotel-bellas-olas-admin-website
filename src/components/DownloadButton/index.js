import React from 'react'

import { Button } from '@mui/material'

import DownloadIcon from '@mui/icons-material/Download'

const DownloadButton = (props) => {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: '1rem' }}
        onClick={props.onClick}
      >
        <DownloadIcon />
      </Button>
    </>
  )
}

export default DownloadButton
