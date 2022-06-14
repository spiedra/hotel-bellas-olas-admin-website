import axios from 'axios'

const baseURL = 'https://localhost:7233/API/Season/DeleteSeason/'

export const DeleteSeason = (id) => {
  return axios
    .delete(
      baseURL + id
    )
    .then((response) => response.data)
    .catch(function (error) {
      if (error.response) {
        return error.response.status
      }
    })
}
