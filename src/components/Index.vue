<template>
  <div>
    <Navbar/>
    <Fishes/>
    <AccountMenu/>
  </div>
</template>
<style scoped>

</style>
<script>
import Navbar from './Navbar.vue'
import Fishes from './Fishes.vue'
import AccountMenu from './AccountMenu.vue'

export default {
  name: 'Index',
  components: {
    Navbar,
    Fishes,
    AccountMenu
  },
  methods: {
  }
}
</script>
