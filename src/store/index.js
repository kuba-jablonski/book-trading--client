import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  getters: {
    username (state) {
      if (state.user) return state.user.username
    },
    uid (state) {
      if (state.user) return state.user.uid
    },
    authenticated (state) {
      return !!state.user
    }
  }
})
