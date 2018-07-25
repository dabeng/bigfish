<template>
<div>
  <TopicEditor :id="this.id"/>
  <!--   <CommentList v-bind:tag="this.id"/>
    <CreateComment v-bind:tag="this.id"/> -->
</div>
</template>
<style scoped>
</style>
<script>
import { mapActions } from 'vuex'
import TopicEditor from './TopicEditor.vue'
// import CommentList from './CommentList.vue'
// import CreateComment from './CreateComment.vue'

export default {
  name: 'TopicPage',
  props: ['id'],
  components: {
    TopicEditor
    // CommentList,
    // CreateComment
  },
  methods: {
    ...mapActions('topic', [
      'getCurrentTopic'
    ])
  },
  created: function () {
    this.getCurrentTopic(this.id)
  }
}
</script>
