import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Axios from 'axios'
import VueRX from 'vue-rx'

Vue.use(VueRX)
Axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.config.productionTip = false
Vue.prototype.$http = Axios

Axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status !== 401) {
    return new Promise((resolve, reject) => {
      reject(error)
    })
  }

  if (error.config.url === '/auth') {
    return new Promise((resolve, reject) => {
      reject(error)
    })
  }
  return store.dispatch('autoLogin').then(() => {
    const config = error.config

    return new Promise((resolve, reject) => {
      Axios.request(config).then(response => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
