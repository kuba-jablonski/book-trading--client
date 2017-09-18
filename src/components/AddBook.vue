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
    <v-layout row v-if="books.length > 0">
      <v-flex sm6 offset-sm3>
        <v-list>
          <v-list-tile
            @click="openDialog(i)"
            v-for="(book, i) in books"
            :key="book.title"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ book.volumeInfo.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ book.volumeInfo.authors[0] }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon class="white--text">add_circle</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent width="500px">
        <v-card v-if="pickedBook.info">
          <v-card-title class="headline">Add "{{ pickedBook.info.volumeInfo.title }}" to your collection?</v-card-title>
          <v-card-actions>
            <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Yes</v-btn>
            <v-btn class="red--text darken-1" flat="flat" @click.native="dialog = false">No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      searchKeyword: '',
      books: [],
      APIURL: 'https://www.googleapis.com/books/v1/volumes?key=AIzaSyBbI3lL95nvzfZ6SV3IBQcKOJR2fVdH0sk',
      dialog: false,
      pickedBook: {
        info: null,
        index: null
      }
    }
  },
  methods: {
    async getBooks () {
      try {
        const { data: { items } } = await axios.get(`${this.APIURL}&q=${this.searchKeyword}`)
        this.books = items
      } catch (error) {
        console.log(error)
      }
    },
    openDialog (i) {
      this.pickedBook = { info: this.books[i], index: i }
      this.dialog = true
    }
  }
}
</script>
