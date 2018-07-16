<template>
<div class="fish-define">
  <h1 class="subject">{{subject.name}}</h1>
  <p class="description">{{subject.description}}</p>
  <CommentList v-bind:tag="this.id"/>
  <CreateTopic v-bind:tag="this.id"/>
</div>
</template>
<style scoped>
.subject {
  height: 36px;
  background-color: #eee;
  padding: 10px 20px;
}
.description {
  height: 18px;
  padding: 5px 10px;
  border: 1px solid #eee;
}
</style>
<script>
import {db} from '../firebase'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
// import CommentList from './CommentList.vue'
// import CreateComment from './CreateComment.vue'

export default {
  name: 'TopicPage',
  props: ['id'],
  components: {
    // CommentList,
    // CreateComment
  },
  computed: {
    subject: function () {
      return this.subjects['.key'] ? this.subjects[this.id] : { name: '', description: '' }
    }
  },
  firebase: function () {
    return {
      subjects: {
        source: db.ref(this.$route.name),
        asObject: true,
        readyCallback: function () {}
      }
    }
  }
}
</script>
