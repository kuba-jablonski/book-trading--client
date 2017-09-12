<template>
  <v-layout row>
    <v-flex sm6 offset-sm3>
      <v-card>
        <v-card-text>
          <v-container>
            <form>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field name="email" label="Mail" id="email" type="email" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field name="password" label="Password" id="password" type="password" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field name="confirmPassword" label="Confirm Password" id="confirmPassword" type="password" ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn type="submit">
                    Sign up
                    <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
