<template>
<div class="topic-list">
  <p>
    批处理：<button @click="deleteTopics">删除</button>
  </p>
  <table>
    <thead>
      <th></th>
      <th>话题</th>
      <th>评论</th>
    </thead>
    <tbody>
      <tr v-for="topic of topics" :key="topic['.key']">
        <td><input type="checkbox" :value="topic['.key']" v-model="checkedTopics"></td>
        <td>
          <span class="topic">{{topic.title}}</span>
        </td>
        <td>
          <span class="comments-number">123</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<style scoped>

  table {
    width: 100%;
    border: 1px solid #eee;
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
import {db} from '../firebase'

export default {
  name: 'TopicList',
  props: ['datasource', 'tag'],
  data: function () {
    return {
      checkedTopics: []
    }
  },
  firebase: function () {
    return {
      topics: db.ref(this.datasource)
    }
  },
  methods: {
    deleteTopics: function () {
      let updates = {}
      for (let topicKey of this.checkedTopics) {
        updates['/' + this.datasource + '/' + topicKey] = null
      }
      db.ref().update(updates, function (err) {
        if (err) {
          console.log(err)
        }
      })
    }
  }
}
</script>
