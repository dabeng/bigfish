// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

let app
let config = {
  apiKey: 'AIzaSyA3yA8WnP4iMVspXqA83XWsOPtQ4NMPjpw',
  authDomain: 'bigfish-f0a80.firebaseapp.com',
  databaseURL: 'https://bigfish-f0a80.firebaseio.com',
  projectId: 'bigfish-f0a80',
  storageBucket: 'bigfish-f0a80.appspot.com',
  messagingSenderId: '279103206853'
}

firebase.initializeApp(config)
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
      router
    })
  }
})
