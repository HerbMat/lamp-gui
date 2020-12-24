import Vue from 'vue'
import authSso from '../api/sso-auth-axios'

const userStore = {
  state: {
    user: localStorage.getItem('username'),
    password: localStorage.getItem('password'),
    token: localStorage.getItem('token')
  },
  mutations: {
    storeUser (state, user) {
      state.user = user.username
      state.password = user.password
      state.token = user.token
      localStorage.setItem('token', user.token)
      localStorage.setItem('username', user.username)
      localStorage.setItem('password', user.password)
      Vue.prototype.$http.defaults.headers.common['Authorization'] = `JWT  ${state.token}`
    },
    clearAuthData (state) {
      state.user = null
      state.password = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('password')
    }
  },
  actions: {
    login ({ commit, dispatch }, authData) {
      return authSso.post('/oauth/token', {
        username: authData.username,
        password: authData.password
      })
        .then(res => {
          commit('storeUser', {
            username: authData.username,
            password: authData.password,
            token: res.data.access_token
          })
        })
    },
    autoLogin ({ dispatch, state }) {
      return dispatch('login', {
        username: this.getters.user,
        password: this.getters.password
      }).then(() => { return state.token })
    },
    logout ({ commit }) {
      commit('clearAuthData')
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    password (state) {
      return state.password
    },
    token (state) {
      return state.token
    },
    isAuth (state) {
      return state.token !== null
    }
  }
}

export default userStore
