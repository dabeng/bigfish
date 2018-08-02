<template>
<div class="comment-list">
  <p>
    批处理：<button @click="deleteComments([topicId, checkedComments])">删除</button>
  </p>
  <article class="comment-item" v-if="commentCount === -1">
    <p><div class="spinner"></div></p>
  </article>
  <article class="comment-item" v-else-if="commentCount === 0">
    <p>There is no data for the time being</p>
  </article>
  <article class="comment-item" v-else v-for="(comment, index) of comments" :key="comment.key">
    <header>
      <input type="checkbox" :value="{key: comment.key, index}" v-model="checkedComments">
      avatar + date + icon
    </header>
    <p>{{ comment.content }}</p>
    <footer class="thumbs-up">123</footer>
  </article>
</div>
</template>
<style scoped>
  @import '../assets/css/spinner.css';

  .comment-item {
    border: 1px solid #eee;
    margin-bottom: 10px;
  }
  .comment-item .spinner {
    position: relative;
    margin: 0 auto;
    border: 1px solid #eee;
  }
  .comment-item header {
    background-color: #eee;
    padding: 5px;
  }
  .comment-item p {
    padding: 5px;
  }
  .comment-item footer {
    border-top: 1px solid #eee;
    padding: 5px;
  }
</style>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'CommentList',
  props: ['topicId'],
  data: function () {
    return {
      checkedComments: []
    }
  },
  computed: {
    ...mapState('comment', [
      'comments'
    ]),
    ...mapGetters('comment', [
      'commentCount'
    ])
  },
  watch: {
    topicId: {
      handler: function (val, oldVal) {
        this.setComments(undefined)
        this.getComments(val)
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations('comment', [
      'setComments'
    ]),
    ...mapActions('comment', [
      'getComments',
      'deleteComments'
    ])
  }
}
</script>
