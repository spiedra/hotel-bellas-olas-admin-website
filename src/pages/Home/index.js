import React from 'react'

import Box from '@mui/material/Box'

const Home = () => {
  return (
    <Box
      sx={{
        mt: '3rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <h1>Bienvenido al modulo administrativo</h1>
      <h2>Hotel Bellas Olas</h2>
    </Box>
  )
}

export default Home
