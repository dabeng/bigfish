<template>
<div :class="['topic-editor', { view: viewState }]">
  <h1 class="title field-value">{{currentTopic.title}}</h1>
  <p class="content field-value">{{currentTopic.content}}</p>
  <input class="field-editor field-title" v-model="updatedTopic.title">
  <textarea class="field-editor field-content" v-model="updatedTopic.content"></textarea>
  <div class="btn-group" v-if="currentTopic.title !== undefined">
    <button class="btn-edit" @click="triggerEdit">编辑</button>
    <button class="btn-save" @click="saveEdit">保存</button>
    <button class="btn-cancel" @click="cancelEdit">取消</button>
  </div>
</div>
</template>
<style scoped>
.field-editor {
  border: none;
  border-bottom: 1px #000 dashed;
  background-color: transparent;
}
.topic-editor.view .field-editor,
.topic-editor.view .btn-save,
.topic-editor.view .btn-cancel,
.topic-editor:not(.view) .field-value,
.topic-editor:not(.view) .btn-edit {
  display: none;
}
.title {
  background-color: #eee;
  padding: 10px 20px;
}
.content {
  height: 18px;
  padding: 5px 10px;
  border: 1px solid #eee;
}
.field-editor {
  width: 100%;
  margin-top: 20px;
}
.field-title {
  font-size: 2em;
  padding: 10px 20px;
  box-sizing: border-box;
  background-color: #eee;
}
.field-content {
  resize: vertical;
}
.btn-group {
  text-align: right;
}
</style>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TopicEditor',
  props: ['id'],
  data: function () {
    return {
      viewState: true,
      updatedTopic: {}
    }
  },
  computed: {
    ...mapState('topic', [
      'currentTopic'
    ])
  },
  methods: {
    ...mapActions('topic', [
      'updateTopic'
    ]),
    triggerEdit: function () {
      this.updatedTopic = {...this.currentTopic}
      this.viewState = false
    },
    cancelEdit: function () {
      this.viewState = true
    },
    saveEdit: function () {
      const _this = this
      this.updateTopic([this.id, {...this.updatedTopic}])
        .then(function () {
          _this.viewState = true
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>
