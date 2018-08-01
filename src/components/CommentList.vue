<template>
<div class="comment-list">
  <p>
    批处理：<button @click="deleteComments([topicId, checkedComments])">删除</button>
  </p>
  <table>
    <thead>
      <th></th>
      <th>评论</th>
      <th>点赞</th>
    </thead>
    <tbody>
      <tr v-if="commentCount === -1">
        <td colspan="3"><div class="spinner"></div></td>
      </tr>
      <tr v-else-if="commentCount === 0">
        <td colspan="3">There is no data for the time being</td>
      </tr>
      <tr v-else v-for="(comment, index) of comments" :key="comment.key">
        <td><input type="checkbox" :value="{key: comment.key, index}" v-model="checkedComments"></td>
        <td>
          <p>{{ comment.content }}</p>
        </td>
        <td>
          <span class="thumbs-up">123</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<style scoped>
  @import '../assets/css/spinner.css';

  table {
    width: 100%;
    border: 1px solid #eee;
  }

  table .spinner {
    position: relative;
    margin: 0 auto;
  }

  thead th {
    text-align: left;
  }

  thead th:first-child {
    width: 20px;
  }

  thead th:last-child {
    width: 50px;
  }

  table thead {
    font-size: 16px;
  }

  th, td {
    padding: 5px 10px;
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
