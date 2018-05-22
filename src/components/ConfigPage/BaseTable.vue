<template>
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
</template>
<style scoped>
  .subject {
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  table {
    width: 100%;
  }

  table thead {
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
export default {
  name: 'BaseTable',
  props: ['data'],
  data: function () {
    return {
      rows: this.data,
      activeRowId: null,
      editedRow: {},
      newRow: {
        name: '',
        description: ''
      },
      checkedRows: []
    }
  },
  methods: {
    creatRow: function () {
      this.rows.push(this.newRow)
      this.newRow.name = ''
      this.newRow.description = ''
    },
    deleteRows: function () {
      let updates = {}
      for (let rowKey of this.checkedRows) {
        updates[rowKey] = null
      }

      return this.rows.update(updates)
    },
    triggerEdit: function (row) {
      this.activeRowId = row['.key']
    },
    cancelEdit: function (e) {
      this.activeRowId = null
    },
    saveEditedName: function (e) {
      this.editedRow.name = e.target.value
    },
    saveEditedDesc: function (e) {
      this.editedRow.description = e.target.value
    },
    updateRow: function (row) {
      const _this = this
      if (Object.keys(this.editedRow).length) {
        const copy = {...row}
        delete copy['.key']
        let updates = {}
        updates[row['.key']] = Object.assign(copy, this.editedRow)

        return this.rows.update(updates, function (err) {
          if (err) {
            console.log(err)
          } else {
            _this.cancelEdit()
          }
        })
      }
    }
  }
}
</script>
