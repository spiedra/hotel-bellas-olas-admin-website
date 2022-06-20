import React, { useState, useContext, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { LoginStyles } from './styles'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router'
import AuthContext from '../../components/Authentication/AuthContext.js'
import Modal from '../Modal'

const SUCCESSFUL = true
const INVALID_USER = false

export const Login = () => {
  const [userInfo, setUserInfo] = useState({ userName: '', password: '' })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalResponse, setModalResponse] = useState()
  const { loginUser, userAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleUserInputChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value
    })
  }

  useEffect(() => {
    if (userAuth === SUCCESSFUL) {
      navigate('admin/home')
    } else if (userAuth === INVALID_USER) {
      setModalResponse('Los datos no coinciden con ningún usuario')
      setIsModalOpen(true)
    }
  }, [loginUser])

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
            sx={{ width: '100%' }}
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
            sx={{ width: '100%' }}
            onChange={handleUserInputChange}
            value={userInfo.password}
          />
          <Button
            sx={LoginStyles.Button}
            variant="contained"
            color="primary"
            onClick={() => loginUser(userInfo)}
          >
            Ingresar
          </Button>
        </Box>
      </Box>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => setIsModalOpen(false)}
        title="Mensaje del sistema"
        content={modalResponse}
      />
    </>
  )
}

export default Login
