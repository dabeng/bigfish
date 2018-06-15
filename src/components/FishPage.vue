<template>
<div class="fish-define">
  <h1 class="subject">鱼</h1>
  <p>{{id}}</p>
  <TopicList/>
  <CreateTopic/>
</div>
</template>
<style scoped>
</style>
<script>
import TopicList from './TopicList.vue'
import CreateTopic from './CreateTopic.vue'

export default {
  name: 'FishPage',
  props: ['id'],
  components: {
    TopicList,
    CreateTopic
  }
}
</script>
