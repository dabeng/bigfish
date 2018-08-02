<template>
  <div>
    <BaseTable datasource="fish" subject="目标鱼"/>
    <BaseTable datasource="place" subject="钓场"/>
    <BaseTable datasource="equipment" subject="装备"/>
  </div>
</template>
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
