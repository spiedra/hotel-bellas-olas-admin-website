import axios from 'axios'

const baseURL = 'https://localhost:7233/API/Room/InsertRoom'

export const addRoom = (props) => {
  return axios
    .post(baseURL, props)
    .then((response) => response.data)
    .catch(function (error) {
      if (error.response) {
        return error.response.status
      }
    })
}

export default addRoom
