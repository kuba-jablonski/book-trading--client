export default {
  state: {
    username: null,
    _id: null,
    authToken: null
  },
  mutations: {
    setUser: (state, payload) => {
      state.username = payload.username
      state._id = payload._id
    },
    setAuthToken: (state, payload) => {
      state.authToken = payload
    }
  },
  getters: {
    username: state => state.username,
    uid: state => state._id,
    authenticated: state => !!state.authToken
  }
}
