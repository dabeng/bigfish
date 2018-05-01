<template>
  <div class="fishList">
    <h1>目标鱼</h1>
    <p :class="{hidden: !inBatch}">
      <b>批处理：</b>
      <button>归档</button>
      <button>删除</button>
    </p>
    <table>
      <thead>
        <th></th>
        <th>名称</th>
        <th>描述</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="fish of fishes" :key="fish['.key']">
          <td><input type="checkbox"></td>
          <td>{{fish.name}}</td>
          <td>{{fish.description}}</td>
          <td>
            <button :class="['btn-edit', { hidden: inEdit }]">Edit</button>
            <button :class="['btn-save', { hidden: !inEdit }]">Save</button>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input type="text" class="editor" v-model="newFish.name">
          </td>
          <td>
            <textarea class="editor" v-model="newFish.description"></textarea>
          </td>
          <td>
            <button class="btn-add" @click="addFish">Add</button>
          </td>
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

  th, td {
    padding: 5px 10px;
  }

  .editor {
    width: 100%;
  }

  textarea {
    resize: vertical;
  }

</style>
<script>
import {fishRef} from '../../firebase'

export default {
  name: 'FishList',
  firebase: {
    fishes: fishRef
  },
  data: function () {
    return {
      inEdit: false,
      inBatch: false,
      newFish: {
        name: '',
        description: ''
      }
    }
  },
  methods: {
    addFish: function () {
      fishRef.push(this.newFish)
      this.newFish.name = ''
      this.newFish.description = ''
    }
  }
}
</script>
