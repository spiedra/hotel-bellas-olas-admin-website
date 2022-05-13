const AuthReducer = (state, action) => {
  switch (action.type) {
    case 1:
      return {
        ...state,
        userAuth: true,
        errors: null
      }
    case 2:
      return {
        ...state,
        userAuth: false,
        errors: null
      }
    case 3:
      return {
        ...state,
        userAuth: null,
        errors: null
      }
    default:
      return state
  }
}

export default AuthReducer
