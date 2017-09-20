import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    authToken: null,
    books: []
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setAuthToken (state, payload) {
      state.authToken = payload
    },
    addBook (state, payload) {
      state.books.unshift(payload)
    },
    setBooks (state, payload) {
      state.books = payload
    },
    removeBook (state, { _id }) {
      state.books = state.books.filter(book => book._id !== _id)
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
    },
    userBooks (state) {
      if (state.user) {
        return state.books.filter(book => book.owner === state.user._id)
      }
    }
  }
})
