import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import LogoutIcon from '@mui/icons-material/Logout'

import { navbarItems } from './consts/index'
import { navbarStyles } from './styles'
import { Button } from '@mui/material'
import AuthContext from '../../components/Authentication/AuthContext.js'

const drawerWidth = 300

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { logoutUser, userAuth } = useContext(AuthContext)

  const handleDrawerToggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (userAuth === false) {
      navigate('/')
    }
  }, [userAuth])

  const drawer = (
    <div>
      <Toolbar sx={navbarStyles.toolbarClose}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {navbarItems.map((item, index) => (
          <ListItem
            button
            key={item.id}
            onClick={() => {
              navigate(item.route)
            }}
          >
            <ListItemIcon sx={navbarStyles.icons}>{item.icon}</ListItemIcon>
            <ListItemText sx={navbarStyles.text} primary={item.label} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <>
      <AppBar position="fixed" sx={navbarStyles.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Hotel Bellas Olas | Administración
          </Typography>
          <Button
            to={'/'}
            sx={{ flex: '1 1 auto', justifyContent: 'flex-end' }}
            onClick={() => logoutUser()}
          >
            <LogoutIcon sx={{ color: 'white' }} />
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={navbarStyles.nav}>
        <Drawer
          variant="temporary"
          open={isOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              height: '100vh',
              position: 'static'
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  )
}

export default Navbar
