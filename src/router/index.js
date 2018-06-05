import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import Gallery from '@/components/Gallery'
import ConfigPage from '@/components/ConfigPage/Index'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
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
      component: Index,
      children: [
        {
          path: '',
          name: 'Gallery',
          components: { content: Gallery }
        }
      ]
    }, {
      path: '/config',
      component: Index,
      children: [
        {
          path: '',
          name: 'ConfigPage',
          components: { content: ConfigPage }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    if (!currentUser) {
      next('signin')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
