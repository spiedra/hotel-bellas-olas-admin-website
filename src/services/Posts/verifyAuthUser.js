import axios from 'axios'

const baseURL = 'https://localhost:7233/API/User/'

export const Auth = {
  logIn: function (props) {
    const response = axios.post(baseURL + 'LogInUser', props).then(response => {
      return response.data
    })
    return response
  },
  logOut: function (props) {
    const response = axios.post(baseURL + 'LogOutUser').then(response => {
      return response.data
    })
    return response
  }
}
