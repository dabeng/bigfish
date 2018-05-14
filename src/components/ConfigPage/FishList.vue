<template>
  <div class="fish-list" v-click-outside="cancelEdit">
    <h1 class="subject">目标鱼</h1>
    <p>
      批处理：<button @click="deleteFishes">删除</button>
    </p>
    <table>
      <thead>
        <th></th>
        <th>名称</th>
        <th>描述</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="fish of fishes" :key="fish['.key']" :class="{ 'in-edit': fish['.key'] === activeId }">
          <td><input type="checkbox" :value="fish['.key']" v-model="checkedFishes"></td>
          <td>
            <span class="value">{{fish.name}}</span>
            <input type="text" class="editor" :value="fish.name" @input="saveEditedName">
          </td>
          <td>
            <span class="value">{{fish.description}}</span>
            <textarea class="editor" :value="fish.description" @input="saveEditedDesc"></textarea>
          </td>
          <td>
            <button class="btn-edit" @click="triggerEdit(fish)">Edit</button>
            <button class="btn-save" @click="updateFish(fish)">Save</button>
          </td>
        </tr>
        <tr class="new-row">
          <td></td>
          <td>
            <input type="text" class="editor" v-model="newFish.name">
          </td>
          <td>
            <textarea class="editor" v-model="newFish.description"></textarea>
          </td>
          <td>
            <button class="btn-add" @click="creatFish">Creat</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
  .subject {
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .fish-list table {
    width: 100%;
  }

  .fish-list table thead {
    font-size: 16px;
  }

  th, td {
    padding: 5px 10px;
  }
  .btn-save {
    display: none;
  }

  .in-edit .btn-save {
    display: initial;
  }

  .in-edit .btn-edit,
  .in-edit .value,
  .in-edit ~ .new-row {
    display: none;
  }

  .editor {
    width: 100%;
    display: none;
  }

  .new-row .editor,
  .in-edit .editor {
    display: initial;
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
      activeId: null,
      editedFish: {},
      newFish: {
        name: '',
        description: ''
      },
      checkedFishes: []
    }
  },
  methods: {
    creatFish: function () {
      fishRef.push(this.newFish)
      this.newFish.name = ''
      this.newFish.description = ''
    },
    deleteFishes: function () {
      let updates = {}
      for (let fishKey of this.checkedFishes) {
        updates[fishKey] = null
      }

      return fishRef.update(updates)
    },
    triggerEdit: function (fish) {
      this.activeId = fish['.key']
    },
    cancelEdit: function (e) {
      this.activeId = null
    },
    saveEditedName: function (e) {
      this.editedFish.name = e.target.value
    },
    saveEditedDesc: function (e) {
      this.editedFish.description = e.target.value
    },
    updateFish: function (fish) {
      if (Object.keys(this.editedFish).length) {
        const copy = {...fish}
        delete copy['.key']
        let updates = {}
        updates[fish['.key']] = Object.assign(copy, this.editedFish)

        return fishRef.update(updates)
      }
    }
  }
}
</script>
