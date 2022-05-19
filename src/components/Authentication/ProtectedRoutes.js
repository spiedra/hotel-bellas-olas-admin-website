import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import AuthContext from '../../components/Authentication/AuthContext.js'

const ProtectedRoutes = () => {
  const { userAuth } = useContext(AuthContext)

  return userAuth ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes
