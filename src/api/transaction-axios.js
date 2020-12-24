import Axios from 'axios'
import oboe from 'oboe'

const BASE_URL = 'http://192.168.1.18:8081'

const transactionApi = Axios.create({
  baseURL: BASE_URL
})

transactionApi.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
transactionApi.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }

const getTransactions = (page, size) => {
  return oboe({
    url: `${BASE_URL}/history?page=${page}&size=${size}`,
    withCredentials: false,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'Access-Control-Allow-Origin': '*'
    }
  })
}

export { getTransactions }

export default transactionApi
