<template>
  <div class="wrapper">
    <Navbar/>
    <div class="config-list">
      <BaseTable datasource="fish" subject="目标鱼"/>
      <BaseTable datasource="place" subject="钓场"/>
      <BaseTable datasource="equipment" subject="装备"/>
    </div>
  </div>
</template>
<style scoped>
  .wrapper {

  }
  .config-list {
    min-height: 800px;
    padding: 1px 20px 20px 182px;
  }
</style>
<script>
import Navbar from '../Navbar.vue'
import BaseTable from './BaseTable.vue'

export default {
  name: 'ConfigPage',
  components: {
    Navbar,
    BaseTable
  }
}
</script>
