import axios from 'axios'

const baseURL = 'https://localhost:7233/API/Room/InsertRoomTariffs'

export const addRoomRate = (props) => {
  return axios
    .post(baseURL, props)
    .then((response) => response.data)
    .catch(function (error) {
      if (error.response) {
        return error.response.status
      }
    })
}

export default addRoomRate
