import Vue from 'vue'
import Router from 'vue-router'
import Addp from './components/addProduct.vue'
import Plist from './components/productList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'plist',
      component: Plist,
      props: true
    },
    {
      path: '/addp',
      name: 'addp',
      component: Addp,
      props: true
    }
  ]
})
