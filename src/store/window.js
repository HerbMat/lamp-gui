const windowStore = {
  state: {
    user: localStorage.getItem('username'),
    password: localStorage.getItem('password'),
    token: localStorage.getItem('token'),
    window: {
      width: window.innerWidth
    }
  },
  mutations: {
    setWindowWidth (state) {
      state.window.width = window.innerWidth
    }
  },
  actions: {},
  getters: {
    isSmallWidth (state) {
      return state.window.width < 750
    }
  }
}

export default windowStore
