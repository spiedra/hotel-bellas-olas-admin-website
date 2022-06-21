import React, { useReducer, useState } from 'react'
import AuthReducer from './AuthReducer'
import AuthContext from './AuthContext'
import { Auth } from '../../services/Posts/verifyAuthUser'

const AuthState = ({ children }) => {
  const initialState = {
    userAuth: null,
    errors: null
  }
  const [state, dispatch] = useReducer(AuthReducer, initialState)
  const [userName, setUserName] = useState()

  const loginUser = async (user) => {
    let action = 1
    setUserName(user.userName)

    const apiResponse = await Auth.logIn({
      userName: user.userName,
      password: user.password
    })

    if (apiResponse.msg !== undefined) {
      action = 2
    }

    dispatch({
      type: action
    })
  }

  const logoutUser = async () => {
    await Auth.logOut()
    dispatch({
      type: 3
    })
  }

  return (
    <AuthContext.Provider
      value={{
        userName: userName,
        userAuth: state.userAuth,
        errors: state.errors,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export default AuthState
