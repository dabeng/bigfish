<template>
<div class="topic-list">
  <p>
    批处理：<button @click="deleteTaggedTopics(checkedTopics)">删除</button>
  </p>
  <table>
    <thead>
      <th></th>
      <th>话题</th>
      <th>评论</th>
    </thead>
    <tbody>
      <tr v-if="topicCount === -1">
        <td colspan="3"><div class="spinner"></div></td>
      </tr>
      <tr v-else-if="topicCount === 0">
        <td colspan="3">There is no data for the time being</td>
      </tr>
      <tr v-else v-for="(topic, index) of taggedTopics" :key="topic.key">
        <td><input type="checkbox" :value="{key: topic.key, index}" v-model="checkedTopics"></td>
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
  @import '../assets/css/spinner.css';

  table {
    width: 100%;
    border: 1px solid #eee;
  }

  table .spinner {
    position: relative;
    margin: 0 auto;
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'TopicList',
  props: ['tag'],
  data: function () {
    return {
      checkedTopics: []
    }
  },
  computed: {
    ...mapState('topic', [
      'taggedTopics'
    ]),
    ...mapGetters('topic', [
      'topicCount'
    ])
  },
  watch: {
    tag: {
      handler: function (val, oldVal) {
        this.setTaggedTopics(undefined)
        this.getTaggedTopics(val)
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations('topic', [
      'setTaggedTopics'
    ]),
    ...mapActions('topic', [
      'getTaggedTopics',
      'deleteTaggedTopics'
    ])
  }
}
</script>
