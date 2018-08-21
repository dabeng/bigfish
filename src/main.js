// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import './firebase'
import VueFire from 'vuefire'
import store from './store'
import './directives/click-outside'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faThumbsDown, faPencilAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.use(VueFire)

library.add(faThumbsUp, faThumbsDown, faPencilAlt, faEllipsisH)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

let app
/*
 * Placing vue app initialization code snippets in onAuthStateChanged can let
 * firebase.auth().currentUser return real user's sign-in status
 */
firebase.auth().onAuthStateChanged(function (user) {
  // Auth object has finished initializing
  if (!app) {
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router,
      store
    })
  }
})
