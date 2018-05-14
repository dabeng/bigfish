import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyA3yA8WnP4iMVspXqA83XWsOPtQ4NMPjpw',
  authDomain: 'bigfish-f0a80.firebaseapp.com',
  databaseURL: 'https://bigfish-f0a80.firebaseio.com',
  projectId: 'bigfish-f0a80',
  storageBucket: 'bigfish-f0a80.appspot.com',
  messagingSenderId: '279103206853'
}

const app = firebase.initializeApp(config)

export const db = app.database()
export const fishRef = db.ref('fish')
export const placeRef = db.ref('place')
