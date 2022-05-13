import React, { useState, useContext, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import { LoginStyles } from './styles'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router'
import AuthContext from '../../components/Authentication/AuthContext.js'

export const Login = () => {
  const [userInfo, setUserInfo] = useState({ userName: '', password: '' })
  const [dialogInfo, setDialogInfo] = useState({ open: false, msg: '' })
  const { loginUser, userAuth } = useContext(AuthContext)
  const SUCCESSFUL = true
  const INVALID_USER = false
  const navigate = useNavigate()
  const handleUserInputChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value
    })
  }

  useEffect(() => {
    if (userAuth === SUCCESSFUL) {
      navigate('hotel-bellas-olas')
    }
    if (userAuth === INVALID_USER) {
      setDialogInfo({ msg: 'Los datos no coinciden con ningún usuario', open: true })
    }
  }, [userAuth])

  const handleLogin = () => {
    loginUser(userInfo)
    if (userAuth === INVALID_USER) {
      setDialogInfo({ msg: 'Los datos no coinciden con ningún usuario', open: true })
    }
  }
  return (
    <>
          <Typography variant="h3" sx={LoginStyles.LoginTitle}>
          Administración de Hotel Bellas Olas
          </Typography>
          <Box sx={LoginStyles.LoginContainer}>
          <Box sx={LoginStyles.Login}>
            <TextField
              variant="standard"
              placeholder="Nombre de usuario"
              margin="normal"
              name="userName"
              required
              onChange={handleUserInputChange}
              value={userInfo.userName}
            />
            <TextField
              variant="standard"
              placeholder="Contraseña"
              margin="normal"
              required
              name="password"
              type="password"
              onChange={handleUserInputChange}
              value={userInfo.password}
            />
            <Button sx={LoginStyles.Button}
                variant="contained"
                color="primary"
                onClick={handleLogin}
              >
                Ingresar
              </Button>
            </Box>
            <Dialog
            open={dialogInfo.open}
            onClose={() => setDialogInfo({ open: false })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Iniciar sesión</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {dialogInfo.msg}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogInfo({ open: false })} color="primary">
                Okay
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
    </>
  )
}

export default Login
