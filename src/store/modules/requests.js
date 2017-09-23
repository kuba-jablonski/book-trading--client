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
            username: payload.ownerUsername,
            _id: payload.ownerId
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
    },
    fetchRequests: async ({ commit, getters }) => {
      const { data: requests } = await server({
        method: 'get',
        url: '/requests/me',
        headers: { 'Authorization': getters.authToken }
      })
      commit('setRequests', requests)
    }
  },
  getters: {
    incomingRequests: (state, getters) => {
      return state.requests.filter(request => request.to._id === getters.uid)
    },
    outgoingRequests: (state, getters) => {
      return state.requests.filter(request => request.from._id === getters.uid)
    }
  }
}
