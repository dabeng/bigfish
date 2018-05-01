<template>
  <div class="wrapper">
    <Navbar/>
    <div class="configList">
      <FishList/>
    </div>
  </div>
</template>
<style scoped>
  .wrapper {
    background-image: url(../../assets/background.jpg);
  }
  .configList {
    min-height: 800px;
    padding: 1px 20px 20px 182px;
    color: #fff;
  }
</style>
<script>
import Navbar from '../Navbar.vue'
import FishList from './FishList.vue'

export default {
  name: 'ConfigPage',
  components: {
    Navbar,
    FishList
  },
  methods: {
  }
}
</script>
