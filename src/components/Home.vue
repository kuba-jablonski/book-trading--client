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
          @click="borrowBook(book)"
          v-for="book in filteredBooks"
          :key="book.title"
          :src="book.image"
          alt="Book Image"
          class="mr-2 ml-2 mt-2 mb-2"
        >
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchKeyword: ''
    }
  },
  computed: {
    books () {
      return this.$store.state.books
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
    borrowBook (book) {
      console.log(book)
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
