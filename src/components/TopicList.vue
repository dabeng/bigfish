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
        <td colspan="3">...</td>
      </tr>
      <tr v-else-if="load === 'empty'">
        <td colspan="3">There is no data for the time being</td>
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
          .then(({tagId, taggedTopics}) => {
            this.taggedTopics = taggedTopics.map(topic => Object.assign(topic.val(), { key: topic.key }))
            this.load = 'loaded'
            this.checkedTopics = []
            this.tagId = tagId
          })
          .catch((err) => {
            if (err instanceof SysError) {
              this.load = 'empty'
              console.log('System Error: ' + err.message)
            } else {
              console.log(err)
            }
          })
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions([
      'getTaggedTopics'
    ]),
    fetchTopics: async function (relatedSubjectId) {
      const tagId = await tagRef.orderByChild('relatedKey').equalTo(relatedSubjectId).once('value')
        .then(snap => {
          if (!snap.val()) {
            throw new SysError('There is no tag data')
          }
          return Object.keys(snap.val())[0]
        })
      const topicIds = await tagTopicRef.child(tagId).once('value')
        .then(snap => {
          if (!snap.val()) {
            throw new SysError('There is no tagTopic data')
          }
          return Object.keys(snap.val())
        })
      const taggedTopics = await Promise.all(topicIds.map(id => topicRef.child(id).once('value').then(snap => snap)))
        .then(topics => {
          if (!topics.length) {
            throw new SysError('There is no topic data with associated tag')
          }
          return topics
        })

      return {tagId, taggedTopics}
    },
    deleteTopics: function () {
      let updates = {}
      for (let topicId of this.checkedTopics) {
        updates['/topic/' + topicId] = null
        updates['/tagTopic/' + this.tagId + '/' + topicId] = null
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
