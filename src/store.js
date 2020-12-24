import Vue from 'vue'
import Vuex from 'vuex'
import windowStore from './store/window'
import userStore from './store/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    windowStore,
    userStore
  }
})
