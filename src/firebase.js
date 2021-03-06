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
export const tagRef = db.ref('tag')
export const fishRef = db.ref('fish')
export const placeRef = db.ref('place')
export const equipmentRef = db.ref('equipment')
export const topicRef = db.ref('topic')
export const tagTopicRef = db.ref('tagTopic')
export const commentRef = db.ref('comment')
export const topicCommentRef = db.ref('topicComment')
