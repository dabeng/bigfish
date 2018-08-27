<template>
<article class="comment-item">
  <section :class="['comment-info', { hidden: inEdit }]">
    <header>
      <input type="checkbox" @input="$emit('checkcmnt', $event.target.checked, {key: comment.key, index})">
      avatar + date + icon
      <details class="menu-edit" ref="editMenu" v-click-outside="closeEditMenu">
        <summary><font-awesome-icon icon="ellipsis-h" /></summary>
        <button class="btn-interact edit-cmnt" @click="triggerEdit($event)"><font-awesome-icon icon="pencil-alt" /></button>
        <button class="btn-interact delete-cmnt" @click="deleteCmnt"><font-awesome-icon icon="eraser" /></button>
        <button class="btn-interact thumbs-up"><font-awesome-icon icon="thumbs-up" /></button>
        <button class="btn-interact thumbs-down"><font-awesome-icon icon="thumbs-down" /></button>
      </details>
    </header>
    <p>{{ comment.content }}</p>
    <footer class="thumbs-up">123</footer>
  </section>
  <CommentEditor :class="{hidden: !inEdit}" :isHidden="true" :initComment="comment" :index="index" @canceleditcmnt="cancelEdit"/>
</article>
</template>
<style scoped>
  .comment-item {
    border: 1px solid #eee;
    margin-bottom: 10px;
  }
  .comment-item .spinner {
    position: relative;
    margin: 0 auto;
    border: 1px solid #eee;
  }
  .comment-item header {
    background-color: #eee;
    padding: 5px;
  }
  .comment-item p {
    padding: 5px;
  }
  .comment-item footer {
    border-top: 1px solid #eee;
    padding: 5px;
  }
  .menu-edit {
    display: flex;
    float: right;
    flex-direction: column;
    width: 33px;
    text-align: center;
  }
  .menu-edit[open]>summary {
    background-color: #fff;
  }
  .menu-edit>summary::-webkit-details-marker {
    display: none;
  }
  .menu-edit>summary::-moz-list-bullet {
    list-style-type: none;
  }
  .btn-interact {
    display: block;
    border-width: 1px;
    margin-top: 2px;
    width: 100%;
    background-color: #fff;
  }
</style>
<script>
import CommentEditor from './CommentEditor.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'CommentItem',
  components: {
    CommentEditor
  },
  props: ['comment', 'index', 'topicId'],
  data: function () {
    return {
      inEdit: false
    }
  },
  computed: {
    ...mapState('comment', [
      'comments'
    ]),
    ...mapGetters('comment', [
      'commentCount'
    ])
  },
  methods: {
    ...mapMutations('comment', [
      'setComments'
    ]),
    ...mapActions('comment', [
      'getComments',
      'deleteComments'
    ]),
    triggerEdit (e) {
      this.inEdit = true
      e.currentTarget.parent.removeAttribute('open')
    },
    cancelEdit () {
      this.inEdit = false
    },
    deleteCmnt (e) {
      if (window.confirm('Are you sure you want to delete this?')) {
        this.deleteComments([this.topicId, [{ 'key': this.comment.key, 'index': this.index }]])
      }
      this.$refs.editMenu.removeAttribute('open')
    },
    closeEditMenu (e) {
      this.$refs.editMenu.removeAttribute('open')
    }
  }
}
</script>
