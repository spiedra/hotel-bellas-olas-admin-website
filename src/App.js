import React from 'react'
import { Outlet } from 'react-router-dom'

import Box from '@mui/material/Box'
import Navbar from './components/Navbar'

const drawerWidth = 300

function App () {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingTop: 6,
          paddingLeft: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default App
