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
      <tr v-if="load === 'loading'">
        <span>...</span>
      </tr>
      <tr v-else-if="load === 'empty'">
        <span>There is no data for the time being</span>
      </tr>
      <tr v-else v-for="topic of taggedTopics" :key="topic.key">
        <td><input type="checkbox" :value="topic.key" v-model="checkedTopics"></td>
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
import {SysError} from '../utils'
import {db, tagRef, topicRef, tagTopicRef} from '../firebase'

export default {
  name: 'TopicList',
  props: ['tag'],
  data: function () {
    return {
      checkedTopics: [],
      taggedTopics: [],
      load: 'loading',
      tagId: ''
    }
  },
  watch: {
    tag: {
      handler: function (val, oldVal) {
        this.fetchTopics(val)
      },
      immediate: true
    }
  },
  methods: {
    fetchTopics: async function (relatedSubjectId) {
      try {
        const tagId = await tagRef.orderByChild('relatedKey').equalTo(relatedSubjectId).once('value')
          .then(snap => {
            if (!snap.val()) {
              throw new SysError('There is no data for the time being')
            }
            return Object.keys(snap.val())[0]
          })
        const topicIds = await tagTopicRef.child(tagId).once('value')
          .then(snap => {
            if (!snap.val()) {
              throw new SysError('There is no data for the time being')
            }
            return Object.keys(snap.val())
          })
        const taggedTopics = await Promise.all(topicIds.map(id => topicRef.child(id).once('value').then(snap => snap)))
          .then(topics => {
            if (!topics.length) {
              throw new SysError('There is no data for the time being')
            }
            return topics
          })

        this.taggedTopics = taggedTopics.map(topic => Object.assign(topic.val(), { key: topic.key }))
        this.load = 'loaded'
        this.checkedTopics = []
        this.tagId = tagId
      } catch (err) {
        if (err instanceof SysError) {
          console.log('System Error: ' + err.message)
        } else {
          console.log(err)
        }
      }
    },
    deleteTopics: function () {
      let updates = {}
      for (let topicKey of this.checkedTopics) {
        updates['/topic/' + topicKey] = null
        updates['/tag/' + this.tagId + '/' + topicKey] = null
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
