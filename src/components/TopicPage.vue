<template>
<div class="fish-define">
  <h1 class="heading">{{currentTopic.title}}</h1>
  <p class="main-content">{{currentTopic.content}}</p>
<!--   <CommentList v-bind:tag="this.id"/>
  <CreateComment v-bind:tag="this.id"/> -->
</div>
</template>
<style scoped>
.heading {
  height: 36px;
  background-color: #eee;
  padding: 10px 20px;
}
.main-content {
  height: 18px;
  padding: 5px 10px;
  border: 1px solid #eee;
}
</style>
<script>
import { mapState, mapActions } from 'vuex'
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
    ...mapState('topic', [
      'currentTopic'
    ])
  },
  methods: {
    ...mapActions('topic', [
      'getCurrentTopic'
    ])
  },
  created: function () {
    var a = 1
    console.log(a)
    this.getCurrentTopic(this.id)
  }
}
</script>
