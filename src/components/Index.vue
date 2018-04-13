<template>
  <div class="wrapper">
    <Navbar/>
    <MainContent/>
    <TopMenu/>
  </div>
</template>
<style scoped>
  .wrapper {
    position: absolute;
    background-image: url(../assets/background.jpg);
  }
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
