<template>
  <section class="comment-editor">
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
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #eee;
}
</style>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CommentEditor',
  props: ['topicId', 'initComment'],
  data: function () {
    return {
      currentComment: this.initComment ? this.initComment : { content: '' }
    }
  },
  computed: mapState('comment', [
    'comments'
  ]),
  methods: {
    ...mapActions('comment', [
      'createComment'
    ]),
    saveEdit: function () {
      const _this = this
      if (this.initComment) {
        this.updateComment([this.topicId, {...this.currentComment}])
          .then(function () {
            // _this.viewState = true
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
