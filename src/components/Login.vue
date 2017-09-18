<template>
  <v-layout row>
    <v-flex sm6 offset-sm3>
      <v-card>
        <v-card-title class="primary">
          <v-container class="pb-0 pt-1">
            <h3 class="headline mb-0 white--text">Login Form</h3>
          </v-container>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form @submit.prevent="logIn" v-model="valid">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    name="username"
                    label="Username"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    name="password"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn
                    block
                    primary
                    large
                    class="mt-4"
                    type="submit"
                    :loading="loading"
                    :disabled="!valid"
                  >
                    Log in
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-snackbar
          :timeout="5000"
          top
          right
          error
          v-model="error"
        >
          Wrong username or password!
          <v-btn dark flat @click.native="error = false">Close</v-btn>
        </v-snackbar>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import server from '@/axios'

export default {
  data () {
    return {
      valid: false,
      username: '',
      usernameRules: [
        (v) => !!v || 'Username is required',
        (v) => v.length >= 3 || 'Username must be at least 3 characters long'
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 6 || 'Password must be at least 6 characters long'
      ],
      loading: false,
      error: false
    }
  },
  methods: {
    async logIn () {
      try {
        this.loading = true

        const { data: user, headers } = await server.post('/users/login', {
          username: this.username,
          password: this.password
        })
        this.$store.commit('setUser', user)
        this.$store.commit('setAuthToken', headers.authorization)

        this.loading = false
        this.$router.push('/')
      } catch (error) {
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>
