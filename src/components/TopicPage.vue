<template>
<div>
  <div :class="['topic-editor', { view: viewState }]">
    <h1 class="title field-value">{{currentTopic.title}}</h1>
    <p class="content field-value">{{currentTopic.content}}</p>
    <input class="field-editor field-heading" :placeholder="currentTopic.title" v-model="updatedTopic.title">
    <textarea class="field-editor field-content" :placeholder="currentTopic.content" v-model="updatedTopic.content"></textarea>
    <div class="btn-group">
      <button class="btn-edit" @click="triggerEdit">编辑</button>
      <button class="btn-save" @click="saveEdit">保存</button>
      <button class="btn-cancel" @click="cancelEdit">取消</button>
    </div>
  <!--   <CommentList v-bind:tag="this.id"/>
    <CreateComment v-bind:tag="this.id"/> -->
  </div>
</div>
</template>
<style scoped>
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
.field-heading {
  font-size: 2em;
  padding: 10px 20px;
  box-sizing: border-box;
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
// import CommentList from './CommentList.vue'
// import CreateComment from './CreateComment.vue'

export default {
  name: 'TopicPage',
  props: ['id'],
  components: {
    // CommentList,
    // CreateComment
  },
  data: function () {
    return {
      viewState: true,
      updatedTopic: {
        title: '',
        content: ''
      }
    }
  },
  computed: {
    ...mapState('topic', [
      'currentTopic'
    ])
  },
  methods: {
    ...mapActions('topic', [
      'getCurrentTopic',
      'updateTopic'
    ]),
    triggerEdit: function () {
      this.viewState = false
    },
    cancelEdit: function () {
      this.viewState = true
    },
    saveEdit: function () {
      const _this = this
      this.updateTopic([this.id, {...this.updatedTopic}])
        .catch(function (err) {
          console.log(err)
        })
        .finally(function () {
          _this.updatedTopic.title = ''
          _this.updatedTopic.content = ''
        })
    }
  },
  created: function () {
    this.getCurrentTopic(this.id)
  }
}
</script>
