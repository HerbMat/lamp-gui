import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Weather from './views/Weather.vue'
import TransactionRecorder from './views/TransactionRecorder.vue'
import TransactionHistory from './views/Transactions.vue'
import store from './store.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { title: 'Home' }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title: 'Login' },
      beforeEnter (to, from, next) {
        if (store.getters.isAuth) {
          next({ name: 'home' })
        } else {
          next()
        }
      }
    },
    {
      path: '/weather',
      name: 'weather',
      component: Weather,
      meta: { title: 'Weather' }
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionRecorder,
      meta: { title: 'Transaction Recorder' }
    },
    {
      path: '/transaction-history',
      name: 'transactionHistory',
      component: TransactionHistory,
      meta: { title: 'Transaction History' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !store.getters.isAuth) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
