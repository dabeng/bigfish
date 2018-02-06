<template>
  <div class="container">
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        <input
          :value="comment['.value']"
        >
      </li>
    </ul>
  </div>
</template>
<style scoped>
  .container {
    float: right;
    width: calc(100% - 160px);
  }
</style>
<script>
import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'
Vue.use(VueFire)

const db = Firebase.initializeApp({
  databaseURL: 'https://bigfish-f0a80.firebaseio.com/'
}).database()
const grasscarpRef = db.ref('grasscarp')

export default {
  name: 'Fishes',
  firebase: {
    comments: grasscarpRef.limitToLast(20)
  }
}
</script>
