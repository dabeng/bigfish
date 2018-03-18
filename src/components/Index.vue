<template>
  <div>
    <Navbar/>
    <MainContent/>
    <AccountMenu/>
  </div>
</template>
<style scoped>

</style>
<script>
import Navbar from './Navbar.vue'
import MainContent from './MainContent.vue'
import AccountMenu from './AccountMenu.vue'

export default {
  name: 'Index',
  components: {
    Navbar,
    MainContent,
    AccountMenu
  },
  methods: {
  }
}
</script>
