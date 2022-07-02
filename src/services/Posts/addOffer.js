import axios from 'axios'

const baseURL = 'https://localhost:7233/API/Offer/RegisterOffer'

export const addOffer = (props) => {
  return axios
    .post(baseURL, props)
    .then((response) => response.data)
    .catch(function (error) {
      if (error.response) {
        return error.response.status
      }
    })
}
