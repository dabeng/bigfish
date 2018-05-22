<template>
  <div class="place-list">
    <h1 class="subject">装备</h1>
    <p>
      批处理：<button>删除</button>
    </p>
    <BaseTable :rows="data"/>
  </div>
</template>
<style scoped>
  .subject {
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
<script>
import BaseTable from './BaseTable.vue'
import {equipmentRef} from '../../firebase'

export default {
  name: 'EquipmentList',
  components: {
    BaseTable
  },
  firebase: {
    data: equipmentRef
  }
}
</script>
