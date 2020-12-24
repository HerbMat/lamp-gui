import Axios from 'axios'

const geoLocationIp = Axios.create({
  baseURL: 'http://ip-api.com/json'
})

export default geoLocationIp
