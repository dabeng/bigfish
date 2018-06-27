<template>
<div class="topic-list">
  <h1>{{test.name}}</h1>
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
      <tr v-if="isLoading">
        <span>...</span>
      </tr>
      <tr v-else v-for="topic of taggedTopics" :key="topic['.key']">
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
      checkedTopics: [],
      taggedTopics: [],
      isLoading: true
    }
  },
  firebase: function () {
    return {
      topics: db.ref(this.datasource),
      test: db.ref('tag').child('-LEdqCX6ev8HrMh9LWHS')
    }
  },
  methods: {
    fetch: function (id) {
      return db.ref('topic').child(id).once('value')
        .then(snap => {
          return snap.val()
        })
    },
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
  },
  watch: {
    tag: function (val) {
      const _this = this
      db.ref('tag').orderByChild('relatedKey').equalTo(val).once('value')
        .then(function (snap) {
          db.ref('tagTopic').child(Object.keys(snap.val())[0]).once('value')
            .then(snap => {
              Promise.all(Object.keys(snap.val()).map(id => _this.fetch(id)))
                .then(t => {
                  _this.taggedTopics = t
                  _this.isLoading = false
                })
                .catch(err => console.log(err))
            })
        })
    }
  }
}
</script>
