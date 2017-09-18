<template>
  <div>
    <v-layout row>
      <v-flex sm6 offset-sm3>
        <v-text-field
          label="Search for a book"
          prepend-icon="search"
          solo
          v-model="searchKeyword"
          @keydown.enter="getBooks"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex sm6 offset-sm3>
        <v-list>
          <v-list-tile
            @click=""
            v-for="book in books"
            :key="book.title"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ book.volumeInfo.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ book.volumeInfo.authors[0] }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon class="white--text text--lighten-1">add_circle</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      searchKeyword: '',
      books: []
    }
  },
  methods: {
    async getBooks () {
      try {
        const { data: { items } } = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?key=AIzaSyBbI3lL95nvzfZ6SV3IBQcKOJR2fVdH0sk&q=${this.searchKeyword}`
        )
        this.books = items
        console.log(this.books)
      } catch (error) {
        console.log(error)
      }
    }
  },
  created () {
    console.log(axios.defaults.headers.common)
  }
}
</script>
