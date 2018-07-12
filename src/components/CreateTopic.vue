<template>
  <section class="create-topic">
    <header>发言</header>
    <input type="text" class="editor topic-title" placeholder="话题" v-model="newTopic.title">
    <textarea class="editor topic-content" placeholder="详述" v-model="newTopic.content"></textarea>
    <footer><button id="btn-submit" @click="createTopic()">提交</button></footer>
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
import { mapState, mapActions } from 'vuex'
// import {db, topicRef, tagRef, tagTopicRef} from '../firebase'

export default {
  name: 'BaseTable',
  props: ['tag'],
  // firebase: function () {
  //   return {
  //     topics: topicRef,
  //     tags: tagRef,
  //     tagTopics: tagTopicRef
  //   }
  // },
  data: function () {
    return {
      newTopic: {
        title: '',
        content: ''
      }
    }
  },
  computed: mapState('topic', [
    'taggedTopics'
  ]),
  methods: {
    ...mapActions('topic', [
      'createTaggedTopic'
    ]),
    createTopic: function () {
      const _this = this
      this.createTaggedTopic([this.tag, {...this.newTopic}])
        .finally(function () {
          _this.newTopic.title = ''
          _this.newTopic.content = ''
        })
      // this.$firebaseRefs.tags.orderByChild('relatedKey').equalTo(this.tag).once('value')
      //   .then(function (snap) {
      //     return Object.keys(snap.val())[0]
      //   })
      //   .then(function (tagKey) {
      //     var updates = {}
      //     var newTopicKey = _this.$firebaseRefs.topics.push().key
      //     updates['/topic/' + newTopicKey] = _this.newTopic
      //     updates['/tagTopic/' + tagKey + '/' + newTopicKey] = true
      //     return db.ref().update(updates)
      //   })
      //   .catch(function (err) {
      //     console.log(err)
      //   })
      //   .finally(function () {
      //     _this.newTopic.title = ''
      //     _this.newTopic.content = ''
      //   })
    }
  }
}
</script>
