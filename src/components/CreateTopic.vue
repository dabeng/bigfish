<template>
  <section class="create-topic">
    <header>发言</header>
    <input type="text" class="editor topic-title" placeholder="话题" v-model="newTopic.title">
    <textarea class="editor topic-content" placeholder="详述" v-model="newTopic.content"></textarea>
    <footer><button id="btn-submit" @click="createTopic(newTopic)">提交</button></footer>
  </section>
</template>
<style>
header {
  background-color: #eee;
  padding: 2px 5px;
  font-size: 16px;
  margin-bottom: 10px;
}
footer {
  text-align: right;
}
.create-topic {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #eee;
}
.editor {
  width: 100%;
  font-size: 12px;
  margin-bottom: 10px;
}
.topic-content {
  resize: vertical;
  min-height: 56px;
}
</style>
<script>
import {db, topicRef, tagRef} from '../firebase'

export default {
  name: 'BaseTable',
  props: ['tag'],
  firebase: function () {
    return {
      topics: topicRef,
      tags: tagRef
    }
  },
  data: function () {
    return {
      newTopic: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    createTopic: function () {
      const _this = this
      var newTopicKey = this.$firebaseRefs.topics.push().key

      this.$firebaseRefs.tags.orderByChild('relatedKey').equalTo(this.tag).once('value', function (snap) {
        const data = snap.val()
        for (let tagKey in data) {
          _this.newTopic.tags = [tagKey]
        }
      })

      var updates = {}
      updates['/topic/' + newTopicKey] = this.newTopic

      db.ref().update(updates, function (err) {
        if (err) {
          console.log(err)
        } else {
          _this.newTopic.title = ''
          _this.newTopic.content = ''
        }
      })
    }
  }
}
</script>
