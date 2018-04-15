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
    /*position: absolute;*/
    background-image: url(../../assets/background.jpg);
/*    height: 100%;
    width: 100%;*/
  }
  .configList {
    min-height: 800px;
    /*width: 100%;*/
    padding: 0 20px 20px 162px;
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
