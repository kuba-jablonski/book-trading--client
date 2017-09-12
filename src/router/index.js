import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import AddBook from '@/components/AddBook'
import MyBooks from '@/components/MyBooks'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/user/login', component: Login },
    { path: '/user/signup', component: Signup },
    { path: '/books/add', component: AddBook },
    { path: '/books/me', component: MyBooks }
  ],
  mode: 'history'
})
