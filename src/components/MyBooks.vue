<template>
  <div>
    <v-layout row justify-center class="mb-4">
      <v-btn to="/books/add" raised success class="mr-5">add</v-btn>
      <v-btn @click="enableRemove" raised error>remove</v-btn>
    </v-layout>
    <v-layout>
      <v-flex wrap class="text-xs-center">
        <img
          v-for="book in books"
          @click="removeBook(book)"
          :key="book.title"
          :src="book.image"
          alt="Book Image"
          class="mr-2 ml-2 mt-2 mb-2"
        >
      </v-flex>
    </v-layout>
    <v-snackbar
      :timeout="snackbar.timeout"
      top
      :error="snackbar.context === 'error'"
      v-model="snackbar.active"
      class="mt-2"
    >
      {{ snackbar.message }}
      <v-btn dark flat @click.native="snackbar.active = false">Cancel</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import server from '@/axios'

export default {
  data () {
    return {
      snackbar: {
        active: false,
        context: '',
        message: '',
        timeout: 0
      }
    }
  },
  computed: {
    books () {
      return this.$store.getters.userBooks
    },
    removeEnabled () {
      return this.snackbar.active
    }
  },
  methods: {
    enableRemove () {
      this.snackbar.context = 'error'
      this.snackbar.message = 'Select a book to remove.'
      this.snackbar.active = true
    },
    async removeBook (book) {
      try {
        if (!this.removeEnabled) return

        await server({
          method: 'delete',
          url: '/books/remove',
          headers: { 'Authorization': this.$store.state.authToken },
          data: book
        })

        this.$store.commit('removeBook', book)

        this.snackbar.active = false
      } catch (error) {
        console.log(error.response)
      }
    }
  }
}
</script>
