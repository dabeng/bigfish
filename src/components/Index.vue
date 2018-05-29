<template>
  <div class="wrapper">
    <Navbar/>
    <Gallery/>
  </div>
</template>
<style scoped>
  .wrapper {
    position: absolute;
  }
</style>
<script>
import Navbar from './Navbar.vue'
import Gallery from './Gallery.vue'

export default {
  name: 'Index',
  components: {
    Navbar,
    Gallery
  },
  methods: {
  }
}
</script>
