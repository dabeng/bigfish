<template>
<div class="comment-list">
  <p>
    批处理：<button @click="deleteComments([topicId, checkedComments])">删除</button>
  </p>
  <article class="comment-item" v-if="commentCount === -1">
    <header><div class="spinner"></div></header>
  </article>
  <article class="comment-item" v-else-if="commentCount === 0">
    <header>There is no data for the time being</header>
  </article>
  <article class="comment-item" v-else v-for="(comment, index) of comments" :key="comment.key">
    <header>
      <input type="checkbox" :value="{key: comment.key, index}" v-model="checkedComments">
      avatar + date + icon
      <details class="menu-edit">
        <summary><font-awesome-icon icon="ellipsis-h" /></summary>
        <button class="btn-interact edit-cmnt" @click="triggerEdit($event)"><font-awesome-icon icon="pencil-alt" /></button>
        <button class="btn-interact thumbs-up"><font-awesome-icon icon="thumbs-up" /></button>
        <button class="btn-interact thumbs-down"><font-awesome-icon icon="thumbs-down" /></button>
      </details>
    </header>
    <p>{{ comment.content }}</p>
    <footer class="thumbs-up">123</footer>
    <CommentEditor class="hidden" :initComment="comment" :index="index"/>
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
import CommentEditor from './CommentEditor.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'CommentList',
  components: {
    CommentEditor
  },
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
    ]),
    triggerEdit (e) {
      const cmntItem = e.currentTarget.parentNode.parentNode.parentNode
      const cmntEditor = cmntItem.querySelector('.comment-editor')
      if (cmntEditor.classList.contains('hidden')) {
        cmntEditor.classList.remove('hidden')
      } else {
        cmntEditor.classList.add('hidden')
      }
      e.currentTarget.parentNode.removeAttribute('open')
    }
  }
}
</script>
