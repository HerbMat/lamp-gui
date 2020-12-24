import Axios from 'axios'

const weatherLocation = Axios.create({
  baseURL: 'http://www.7timer.info/bin/civil.php'
})

weatherLocation.interceptors.request.use((config) => {
  config.params = {
    'ac': '0',
    'unit': 'metric',
    'output': 'json',
    'lang': 'en',
    ...config.params
  }
  return config
})

export default weatherLocation
