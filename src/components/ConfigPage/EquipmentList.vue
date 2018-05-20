<template>
  <div class="place-list" v-click-outside="{ selector: '.in-edit', func: cancelEdit }">
    <h1 class="subject">装备</h1>
    <p>
      批处理：<button @click="deleteRows">删除</button>
    </p>
    <table>
      <thead>
        <th></th>
        <th>名称</th>
        <th>描述</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="row of rows" :key="row['.key']" :class="{ 'in-edit': row['.key'] == activeRowId }">
          <td><input type="checkbox" :value="row['.key']" v-model="checkedRows"></td>
          <td>
            <span class="value">{{row.name}}</span>
            <input type="text" class="editor" :value="row.name" @input="saveEditedName">
          </td>
          <td>
            <span class="value">{{row.description}}</span>
            <textarea class="editor" :value="row.description" @input="saveEditedDesc"></textarea>
          </td>
          <td>
            <button class="btn-edit" @click="triggerEdit(row)">Edit</button>
            <button class="btn-save" @click="updateRow(row)">Save</button>
          </td>
        </tr>
        <tr class="new-row">
          <td></td>
          <td>
            <input type="text" class="editor" v-model="newRow.name">
          </td>
          <td>
            <textarea class="editor" v-model="newRow.description"></textarea>
          </td>
          <td>
            <button class="btn-add" @click="creatRow">Creat</button>
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

  .place-list table {
    width: 100%;
  }

  .place-list table thead {
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

import BaseList from './BaseList.js'
import {equipmentRef} from '../../firebase'

export default {
  name: 'EquipmentList',
  firebase: {
    rows: equipmentRef
  },
  mixins: [BaseList]
}
</script>
