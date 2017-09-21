export default {
  state: {
    books: []
  },
  mutations: {
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
    userBooks (state, getters, rootState) {
      if (rootState.user) {
        return state.books.filter(book => book.owner === rootState.user._id)
      }
    }
  }
}
