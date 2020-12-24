import Axios from 'axios'

const authSso = Axios.create({
  baseURL: 'http://192.168.1.18:4000'
})

export default authSso
