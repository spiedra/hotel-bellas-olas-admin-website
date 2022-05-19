import React, { useReducer } from 'react'
import AuthReducer from './AuthReducer'
import AuthContext from './AuthContext'
import { Auth } from '../../services/Posts/verifyAuthUser'

const AuthState = ({ children }) => {
  const initialState = {
    userAuth: null,
    errors: null
  }
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  const loginUser = async (user) => {
    let action = 1

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
    dispatch({
      type: 3
    })
  }

  return (
    <AuthContext.Provider
      value={{
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
