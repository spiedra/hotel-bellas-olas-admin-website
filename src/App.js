import React from 'react'
import { Outlet } from 'react-router-dom'

import Box from '@mui/material/Box'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const drawerWidth = 300

function App () {
  return (
    <>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 10,
            px: 6,
            width: { sm: `calc(100% - ${drawerWidth}px)` }
          }}
        >
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </>
  )
}

export default App
