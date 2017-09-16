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
        <v-list-tile
          v-for="item in bookItems"
          :key="item.title"
          :to="item.path"
          exact
          ripple
          active-class=""
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
          ripple
          active-class=""
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
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
        drawer: true,
        bookItems: [
          { title: 'Browse Books', path: '/', icon: 'home' },
          { title: 'My Books', path: '/books/me', icon: 'library_books' },
          { title: 'Add a Book', path: '/books/add', icon: 'library_add' }
        ],
        userItems: [
          { title: 'Log In', path: '/user/login', icon: 'forward' },
          { title: 'Sign Up', path: '/user/signup', icon: 'person_add' }
        ]
      }
    },
    methods: {
      logOut () {
        // !!!
      }
    }
  }
</script>
