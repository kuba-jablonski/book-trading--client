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
          :class="{'removable': removeEnabled}"
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
import authStateWatcher from '@/mixins/authStateWatcher'

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

        await this.$store.dispatch('removeBook', book)

        this.snackbar.active = false
      } catch (error) {
        this.$store.commit('activateSnackbar', {
          message: 'Unable to remove the book.',
          context: 'error'
        })
      }
    }
  },
  mixins: [authStateWatcher]
}
</script>

<style lang="stylus" scoped>
img
  transition box-shadow 0.2s linear

.removable:hover
  box-shadow: 0px 3px 15px rgba(#000, 0.5)
  cursor: pointer
</style>
