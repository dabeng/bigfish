<template>
  <div>
    <Navbar/>
    <router-view name="content" class="main-content"/>
  </div>
</template>
<style scoped>
  .main-content {
    min-height: 800px;
    padding: 1px 20px 20px 182px;
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
