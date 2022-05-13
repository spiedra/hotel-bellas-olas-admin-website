import axios from 'axios'

const baseURL = 'https://localhost:7233/API/User/LogInUser'

export const Auth = {
  logIn: function (props) {
    const response = axios.post(baseURL, props).then(response => {
      return response.data
    })
    return response
  }
}
