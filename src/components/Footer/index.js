import React from 'react'

import Box from '@mui/material/Box'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        textAlign: 'center',
        height: '3rem',
        background: '#00253c',
        color: 'white'
      }}
    >
      <Box component="span" sx={{ fontSize: '13px', mr: '2rem' }}>
      Copyright©Hotel Bellas Olas 2022
      </Box>
    </Box>
  )
}

export default Footer
