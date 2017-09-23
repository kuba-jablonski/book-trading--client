import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import books from './modules/books'
import requests from './modules/requests'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
      timeout: 0,
      context: '',
      active: false,
      button: ''
    }
  },
  mutations: {
    activateSnackbar: (state, { message, context, timeout = 5000, button = 'Close', active = true }) => {
      state.snackbar = { message, context, timeout, button, active }
    },
    deactivateSnackbar: state => {
      state.snackbar.active = false
    }
  },
  getters: {
    snackbar: state => state.snackbar
  },
  modules: { user, books, requests }
})
