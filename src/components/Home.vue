<template>
  <div>
    <v-layout row>
      <v-flex sm6 offset-sm3>
        <v-text-field
          label="Pick a book you'd like to borrow."
          prepend-icon="search"
          solo
          class="mb-4"
          v-model="searchKeyword"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex wrap class="text-xs-center">
        <img
          style="cursor: pointer"
          @click="openBorrowDialog(book)"
          v-for="book in filteredBooks"
          :key="book.title"
          :src="book.image"
          alt="Book Image"
          class="mr-2 ml-2 mt-2 mb-2"
        >
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" persistent width="500px">
      <v-card v-if="pickedBook">
        <v-card-title class="headline">Request to borrow "{{ pickedBook.title }}" ?</v-card-title>
        <v-card-actions>
          <v-btn class="green--text darken-1" flat="flat" @click.native="borrowBook">Yes</v-btn>
          <v-btn class="red--text darken-1" flat="flat" @click.native="dialog = false">No</v-btn>
        </v-card-actions>         
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchKeyword: '',
      snackbar: {
        active: false,
        context: '',
        message: ''
      },
      dialog: false,
      pickedBook: null
    }
  },
  computed: {
    books () {
      return this.$store.getters.allBooks
    },
    filteredBooks () {
      if (this.searchKeyword.trim().length < 3) return this.books

      return this.books.filter(book => {
        return book.title
          .toLowerCase()
          .includes(this.searchKeyword.toLowerCase())
      })
    },
    authenticated () {
      return this.$store.getters.authenticated
    },
    headingText () {
      return this.authenticated
        ? 'Pick a book you\'d like to borrow.'
        : 'Log in to be able to borrow books.'
    }
  },
  methods: {
    openBorrowDialog (book) {
      if (!this.authenticated) {
        return this.$store.commit('activateSnackbar', {
          message: 'You must be logged in.',
          context: 'error'
        })
      }
      this.pickedBook = book
      this.dialog = true
    },
    borrowBook () {
      // !!!
    }
  }
}
</script>

<style lang="stylus" scoped>
img
  transition box-shadow 0.2s linear

img:hover
  box-shadow: 0px 3px 15px rgba(#000, 0.5)
</style>
