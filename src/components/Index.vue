<template>
  <div>
    <Navbar/>
    <router-view name="content" class="view"/>
  </div>
</template>
<style scoped>
  .view {
    min-height: 800px;
    padding: 1px 0 20px 182px;
  }
</style>
<script>
import Navbar from './Navbar.vue'

export default {
  name: 'Index',
  components: {
    Navbar
  }
}
</script>
