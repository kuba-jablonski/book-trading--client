import server from '@/axios'

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
  actions: {
    logIn: async ({ commit }, payload) => {
      const { data: user, headers } = await server.post('/users/login', payload)
      commit('setUser', user)
      commit('setAuthToken', headers.authorization)
    },
    signUp: async ({ commit }, payload) => {
      const { data: user, headers } = await server.post('/users/signup', payload)
      commit('setUser', user)
      commit('setAuthToken', headers.authorization)
    }
  },
  getters: {
    username: state => state.username,
    uid: state => state._id,
    authenticated: state => !!state.authToken
  }
}
