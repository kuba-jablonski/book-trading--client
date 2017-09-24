<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm10 offset-sm1 md6 offset-md3>
        <v-card>
          <v-toolbar class="primary" dark>
            <v-toolbar-title>Requests</v-toolbar-title>
          </v-toolbar>
          <v-list>
            <v-subheader>Incoming</v-subheader>
            <v-list-tile @click="checkRequestDetails(request)" v-for="request in incomingRequests" :key="request._id">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ request.from.username }} wants to borrow "{{ $store.getters.bookTitleById(request.book) }}".
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-subheader>Outgoing</v-subheader>
            <v-list-tile v-for="request in outgoingRequests" :key="request._id">
              <v-list-tile-content>
                <v-list-tile-title>
                  Requested to borrow "{{ $store.getters.bookTitleById(request.book) }}" from {{ request.to.username }}.
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>            
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent width="500px">
        <v-card v-if="request">
          <v-card-title class="headline">New Request</v-card-title>
          <v-card-text>
          {{ this.request.from.username }} wants to borrow "{{ $store.getters.bookTitleById(this.request.book) }}". Accept?
          </v-card-text>
          <v-card-actions>
            <v-btn class="green--text darken-1" flat="flat" @click.native="acceptRequest">Yes</v-btn>
            <v-btn class="red--text darken-1" flat="flat" @click.native="dialog = false">No</v-btn>
          </v-card-actions>         
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import authStateWatcher from '@/mixins/authStateWatcher'

export default {
  data () {
    return {
      dialog: false,
      request: null
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
    acceptRequest () {
      // !!!
    }
  },
  mounted () {
    this.$store.dispatch('fetchRequests')
  },
  mixins: [authStateWatcher]
}
</script>
