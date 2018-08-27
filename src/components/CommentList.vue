<template>
<div class="comment-list">
  <p>
    批处理：<button @click="deleteComments([topicId, Array.from(checkedCmnts)])">删除</button>
  </p>
  <article class="comment-item" v-if="commentCount === -1">
    <header><div class="spinner"></div></header>
  </article>
  <article class="comment-item" v-else-if="commentCount === 0">
    <header>There is no data for the time being</header>
  </article>
  <CommentItem v-else v-for="(comment, index) of comments" :topicId="topicId" :comment="comment" :index="index" :key="comment.key" @checkcmnt="changeCheckedCmnts" />
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
  .menu-edit {
    display: flex;
    float: right;
    flex-direction: column;
    width: 33px;
    text-align: center;
  }
  .menu-edit[open]>summary {
    background-color: #fff;
  }
  .menu-edit>summary::-webkit-details-marker {
    display: none;
  }
  .menu-edit>summary::-moz-list-bullet {
    list-style-type: none;
  }
  .btn-interact {
    display: block;
    border-width: 1px;
    margin-top: 2px;
    width: 100%;
    background-color: #fff;
  }
</style>
<script>
import CommentItem from './CommentItem.vue'
import CommentEditor from './CommentEditor.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'CommentList',
  components: {
    CommentItem,
    CommentEditor
  },
  props: ['topicId'],
  data: function () {
    return {
      checkedCmnts: new Set()
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
    ]),
    changeCheckedCmnts (checked, val) {
      if (checked) {
        this.checkedCmnts.add(val)
      } else {
        this.checkedCmnts.delete(val)
      }
    }
  }
}
</script>
