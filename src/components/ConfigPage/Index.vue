<template>
  <div class="wrapper">
    <Navbar/>
    <div class="config-list">
      <FishList/>
      <PlaceList/>
    </div>
  </div>
</template>
<style scoped>
  .wrapper {
    background-image: url(../../assets/background.jpg);
  }
  .config-list {
    min-height: 800px;
    padding: 1px 20px 20px 182px;
    color: #fff;
  }
</style>
<script>
import Navbar from '../Navbar.vue'
import FishList from './FishList.vue'
import PlaceList from './PlaceList.vue'

export default {
  name: 'ConfigPage',
  components: {
    Navbar,
    FishList,
    PlaceList
  },
  methods: {
  }
}
</script>
