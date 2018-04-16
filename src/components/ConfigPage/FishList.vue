<template>
  <div class="fishList">
    <h1>目标鱼</h1>
    <table>
      <thead>
        <th>名称</th>
        <th>描述</th>
        <th></th>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
  .fishList table {
    width: 100%;
  }

  .fishList table thead {
    font-size: 16px;
  }

</style>
<script>
import FishList from './FishList.vue'

export default {
  name: 'ConfigList',
  components: {
    FishList
  },
  methods: {
  }
}
</script>
