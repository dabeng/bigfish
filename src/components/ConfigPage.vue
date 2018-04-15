<template>
  <div class="wrapper">
    <Navbar/>
    <ConfigList/>
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
import TopMenu from './TopMenu.vue'
import ConfigList from './ConfigList.vue'

export default {
  name: 'ConfigPage',
  components: {
    Navbar,
    ConfigList,
    TopMenu
  },
  methods: {
  }
}
</script>
