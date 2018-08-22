<template>
  <section :class="['comment-editor', { hidden: isHidden }]">
    <header>工具栏（markdown支持）</header>
    <textarea class="editor" placeholder="详述" v-model="currentComment.content"></textarea>
    <footer>
      <button class="btn-save" @click="saveEdit">保存</button>
      <button class="btn-cancel">取消</button>
    </footer>
  </section>
</template>
<style scoped>
@import '../assets/css/common.css';

header {
  background-color: #eee;
  padding: 2px 5px;
  font-size: 16px;
  margin-bottom: 10px;
}
footer {
  text-align: right;
}
.comment-editor {
  padding: 10px;
  border: 1px solid #eee;
}
</style>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CommentEditor',
  props: ['topicId', 'initComment', 'index'],
  data: function () {
    return {
      currentComment: this.initComment ? { content: this.initComment.content } : { content: '' },
      isHidden: false
    }
  },
  computed: mapState('comment', [
    'comments'
  ]),
  methods: {
    ...mapActions('comment', [
      'createComment',
      'updateComment'
    ]),
    saveEdit: function () {
      const _this = this
      if (this.initComment) {
        this.updateComment([this.initComment.key, {...this.currentComment}, this.index])
          .then(function () {
            _this.isHidden = true
          })
          .catch(function (err) {
            console.log(err)
          })
      } else {
        this.createComment([this.topicId, {...this.currentComment}])
          .catch(function (err) {
            console.log(err)
          })
          .finally(function () {
            _this.currentComment.content = ''
          })
      }
    }
  }
}
</script>
