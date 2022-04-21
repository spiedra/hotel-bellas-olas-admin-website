import axios from 'axios'

const baseURL = 'https://localhost:7233/API/Advertising/GetAdvertisingInfo'

export const getAdvertisingInfo = () => {
  return axios
    .get(baseURL)
    .then((response) => response.data)
    .catch(function (error) {
      if (error.response) {
        return error.response.status
      }
    })
}
