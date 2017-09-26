<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm10 offset-sm1 md6 offset-md3>
        <v-card>
          <v-toolbar class="primary" dark>
            <v-toolbar-title>Requests</v-toolbar-title>
          </v-toolbar>
          <v-list two-line>
            <v-subheader>Incoming</v-subheader>
            <v-list-tile v-if="incomingRequests.length === 0">
              <v-list-tile-content>
                <v-list-tile-title>
                  You have no incoming requests.
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>            
            <v-list-tile @click="checkRequestDetails(request)" v-for="request in incomingRequests" :key="request._id">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ request.from.username }} wants to borrow "{{ $store.getters.bookTitleById(request.book) }}".
                </v-list-tile-title>
                <v-list-tile-sub-title>{{ request.createdAt | formatDate }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-subheader>Outgoing</v-subheader>
            <v-list-tile v-if="outgoingRequests.length === 0">
              <v-list-tile-content>
                <v-list-tile-title>
                  You have no outgoing requests.
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>              
            <v-list-tile v-for="request in outgoingRequests" :key="request._id">
              <v-list-tile-content>
                <v-list-tile-title>
                  Requested to borrow "{{ $store.getters.bookTitleById(request.book) }}" from {{ request.to.username }}.
                </v-list-tile-title>
                <v-list-tile-sub-title>{{ request.createdAt | formatDate }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>            
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent width="500px">
        <v-card v-if="request">
          <v-card-title class="headline primary--text">Request</v-card-title>
          <v-card-text>
          {{ this.request.from.username }} wants to borrow "{{ $store.getters.bookTitleById(this.request.book) }}". Accept?
          </v-card-text>
          <v-card-actions>
            <v-btn :loading="acceptInProgress" class="green--text darken-1" flat="flat" @click.native="acceptRequest">Yes</v-btn>
            <v-btn :loading="declineInProgress" class="red--text darken-1" flat="flat" @click.native="declineRequest">No</v-btn>
          </v-card-actions>         
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import moment from 'moment'

import authStateWatcher from '@/mixins/authStateWatcher'

export default {
  data () {
    return {
      dialog: false,
      request: null,
      acceptInProgress: false,
      declineInProgress: false
    }
  },
  computed: {
    incomingRequests () {
      return this.$store.getters.incomingRequests
    },
    outgoingRequests () {
      return this.$store.getters.outgoingRequests
    }
  },
  methods: {
    checkRequestDetails (request) {
      this.request = request
      this.dialog = true
    },
    async acceptRequest () {
      try {
        this.acceptInProgress = true
        await this.$store.dispatch('acceptRequest', this.request)
        this.acceptInProgress = false
        this.dialog = false
        this.$store.commit('activateSnackbar', {
          message: 'Request accepted!',
          context: 'success'
        })
      } catch (error) {
        this.acceptInProgress = false
        this.dialog = false
        this.$store.commit('activateSnackbar', {
          message: 'Something went wrong',
          context: 'error'
        })
      }
    },
    async declineRequest () {
      try {
        this.declineInProgress = true
        await this.$store.dispatch('declineRequest', this.request)
        this.declineInProgress = false
        this.dialog = false
        this.$store.commit('activateSnackbar', {
          message: 'Request declined!',
          context: 'success'
        })
      } catch (error) {
        this.declineInProgress = false
        this.dialog = false
        this.$store.commit('activateSnackbar', {
          message: 'Something went wrong',
          context: 'error'
        })
      }
    }
  },
  filters: {
    formatDate: val => moment(val).format('MMMM Do YYYY, h:mm a')
  },
  mounted () {
    this.$store.dispatch('fetchRequests')
  },
  mixins: [authStateWatcher]
}
</script>
