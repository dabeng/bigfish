<template>
  <div>
    <Navbar/>
    <MainContent/>
    <TopMenu/>
  </div>
</template>
<style scoped>

</style>
<script>
import Navbar from './Navbar.vue'
import MainContent from './MainContent.vue'
import TopMenu from './TopMenu.vue'

export default {
  name: 'Index',
  components: {
    Navbar,
    MainContent,
    TopMenu
  },
  methods: {
  }
}
</script>
