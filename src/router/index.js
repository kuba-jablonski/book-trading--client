import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import AddBook from '@/components/AddBook'
import MyBooks from '@/components/MyBooks'
import Requests from '@/components/Requests'
import store from '@/store'

Vue.use(Router)

function authGuard (to, from, next) {
  store.getters.authenticated
    ? next()
    : router.push('/')
}

export const router = new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/user/login', component: Login },
    { path: '/user/signup', component: Signup },
    { path: '/books/add', component: AddBook, beforeEnter: authGuard },
    { path: '/books/me', component: MyBooks, beforeEnter: authGuard },
    { path: '/requests/me', component: Requests, beforeEnter: authGuard }
  ],
  mode: 'history'
})
