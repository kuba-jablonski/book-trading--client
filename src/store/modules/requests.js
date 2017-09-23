import server from '@/axios'

export default {
  state: {
    requests: []
  },
  mutations: {
    setRequests: (state, payload) => {
      state.requests = payload
    }
  },
  actions: {
    makeRequest: async ({ commit, getters }, payload) => {
      await server({
        method: 'post',
        url: '/requests/new',
        headers: { 'Authorization': getters.authToken },
        data: {
          to: {
            _id: payload.owner
          },
          from: {
            username: getters.username,
            _id: getters.uid
          },
          book: payload._id
        }
      })
      commit('activateSnackbar', {
        message: 'Request sent!',
        context: 'success'
      })
    }
  }
}
