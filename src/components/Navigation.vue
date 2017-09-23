<template>
  <v-list>
    <v-list-tile
      v-for="item in bookItems"
      :key="item.title"
      :to="item.path"
      exact
    >
      <v-list-tile-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile-content>          
    </v-list-tile>
    <v-divider></v-divider>
    <v-list-tile
      v-for="item in userItems"
      :key="item.title"
      :to="item.path"
      exact
    >
      <v-list-tile-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile-content>          
    </v-list-tile>
    <v-list-tile v-if="authenticated" @click="logOut">
      <v-list-tile-action>
        <v-icon>arrow_back</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Log out</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>           
  </v-list>  
</template>

<script>
export default {
  computed: {
    authenticated () {
      return this.$store.getters.authenticated
    },
    bookItems () {
      let bookItems = [{ title: 'Browse Books', path: '/', icon: 'home' }]
      if (this.authenticated) {
        bookItems = [
          { title: 'Browse Books', path: '/', icon: 'home', visible: true },
          { title: 'My Books', path: '/books/me', icon: 'library_books' },
          { title: 'Add a Book', path: '/books/add', icon: 'library_add' },
          { title: 'Requests', path: '/requests/me', icon: 'library_add' }
        ]
      }
      return bookItems
    },
    userItems () {
      if (!this.authenticated) {
        return [
          { title: 'Log In', path: '/user/login', icon: 'forward' },
          { title: 'Sign Up', path: '/user/signup', icon: 'person_add' }
        ]
      }
    }
  },
  methods: {
    logOut () {
      this.$store.commit('setUser', { username: null, _id: null })
      this.$store.commit('setAuthToken', null)
    }
  }
}
</script>
