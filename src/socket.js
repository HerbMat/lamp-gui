import io from 'socket.io-client'

const lampSocket = io(`${process.env.VUE_APP_BASE_URL}/lamp`, {
  origins: '*:*'
})

const rgbSocket = io(`${process.env.VUE_APP_BASE_URL}/rgb`, {
  origins: '*:*'
})

export { lampSocket, rgbSocket }
