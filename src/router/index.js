import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '*',
    redirect: '/index'
  }, {
    path: '/',
    redirect: '/signin'
  }, {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  }, {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }, {
    path: '/index',
    name: 'Index',
    component: Index,
    requiresAuth: { meta: true }
  }]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    if (!currentUser) {
      next('login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
