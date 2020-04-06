import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Properties from '../views/Properties.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home | BovControl',
    },
  },
  {
    path: '/properties',
    name: 'Propriedades',
    component: Properties,
    meta: {
      title: 'Propriedades | BovControl',
    },
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
