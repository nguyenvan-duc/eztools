import axios from "axios"

export const api = () => {
  return axios.create({
    baseURL: "https://v6.exchangerate-api.com",
    // headers: {
    //   Authorization: "Bearer " + "0cf6ddbb42c906d3887063fc",
    // },
  })
}
