<template>
  <div>
    <Navbar/>
    <Fishes/>
  </div>
</template>
<style scoped>

</style>
<script>
import Navbar from './Navbar.vue'
import Fishes from './Fishes.vue'

export default {
  name: 'Index',
  components: {
    Navbar,
    Fishes
  }
}
</script>
