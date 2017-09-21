import Vue from 'vue'
import Vuex from 'vuex'

import books from './modules/books'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    authToken: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setAuthToken (state, payload) {
      state.authToken = payload
    }
  },
  getters: {
    username (state) {
      if (state.user) return state.user.username
    },
    uid (state) {
      if (state.user) return state.user._id
    },
    authenticated (state) {
      return !!state.user
    }
  },
  modules: { books }
})
