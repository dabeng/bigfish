<template>
  <div>
    <input type="text" class="editor" v-model="topic">
    <textarea class="editor" v-model="cotent"></textarea>
  </div>
</template>
<style>
</style>
<script>
import {db} from '../firebase'

export default {
  name: 'BaseTable',
  data: function () {
    return {
      topic: '',
      cotent: ''
    }
  }
}
</script>
