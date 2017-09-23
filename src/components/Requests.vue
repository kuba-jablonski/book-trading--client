<template>
  <v-layout row>
    <v-flex sm6 offset-sm3>
      <v-card>
        <v-toolbar class="accent" dark>
          <v-toolbar-title>Requests</v-toolbar-title>
        </v-toolbar>
        <v-list>

            <v-subheader>Incoming</v-subheader>
            <v-list-tile v-for="request in incomingRequests" :key="request._id">
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
</template>

<script>
export default {
  computed: {
    incomingRequests () {
      return this.$store.getters.incomingRequests
    },
    outgoingRequests () {
      return this.$store.getters.outgoingRequests
    }
  },
  mounted () {
    this.$store.dispatch('fetchRequests')
  }
}
</script>
