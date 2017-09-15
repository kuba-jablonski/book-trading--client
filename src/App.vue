<template>
  <v-app toolbar footer>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      absolute
      clipped
    >
      <v-list>
        <v-list-tile to="/" active-class="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Browse Books</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/books/me" active-class="">
          <v-list-tile-action>
            <v-icon>library_books</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>My Books</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/books/add" active-class="">
          <v-list-tile-action>
            <v-icon>library_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Add a Book</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile to="/user/login" active-class="">
          <v-list-tile-action>
            <v-icon>forward</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log In</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/user/signup" active-class="">
          <v-list-tile-action>
            <v-icon>person_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign Up</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logOut">
          <v-list-tile-action>
            <v-icon>arrow_back</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>           
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="primary" dark fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Book Trading Club</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer class="primary">
      <span class="white--text">© 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true
      }
    },
    methods: {
      logOut () {
        // !!!
      }
    }
  }
</script>
