<template>
  <section class="create-topic">
    <header>畅所欲言</header>
    <input type="text" class="editor topic-title" placeholder="话题" v-model="title">
    <textarea class="editor topic-content" placeholder="详述" v-model="cotent"></textarea>
    <footer><button id="btn-submit">提交</button></footer>
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
import {topicRef} from '../firebase'

export default {
  name: 'BaseTable',
  firebase: function () {
    return {
      topics: topicRef
    }
  },
  data: function () {
    return {
      title: '',
      cotent: ''
    }
  }
}
</script>
