<template>
<div>
  <TopicEditor :id="this.id"/>
  <CommentList :topicId="this.id"/>
  <CommentEditor :topicId="this.id"/>
</div>
</template>
<style scoped>
</style>
<script>
import { mapActions } from 'vuex'
import TopicEditor from './TopicEditor.vue'
import CommentList from './CommentList.vue'
import CommentEditor from './CommentEditor.vue'

export default {
  name: 'TopicPage',
  props: ['id'],
  components: {
    TopicEditor,
    CommentList,
    CommentEditor
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
