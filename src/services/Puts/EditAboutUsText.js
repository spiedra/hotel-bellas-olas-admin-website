import axios from 'axios'

const baseURL = 'https://localhost:7233/API/Hotel/EditAboutUsText'

export const EditAboutUsText = (props) => {
  return axios
    .put(
      baseURL, props
    )
    .then((response) => response.data)
    .catch(function (error) {
      if (error.response) {
        return error.response.status
      }
    })
}
