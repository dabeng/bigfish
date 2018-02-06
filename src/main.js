// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyA3yA8WnP4iMVspXqA83XWsOPtQ4NMPjpw',
  authDomain: 'bigfish-f0a80.firebaseapp.com',
  databaseURL: 'https://bigfish-f0a80.firebaseio.com',
  projectId: 'bigfish-f0a80',
  storageBucket: 'bigfish-f0a80.appspot.com',
  messagingSenderId: '279103206853'
}
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
