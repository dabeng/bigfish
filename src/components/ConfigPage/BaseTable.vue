<template>
<div class="fish-list">
  <h1 class="subject">{{subject}}</h1>
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
      <tr v-for="row of rows" :key="row['.key']" :class="{ 'in-edit': row['.key'] == activeRowId }" v-click-outside="cancelEdit">
        <td><input type="checkbox" :value="row['.key']" v-model="checkedRows"></td>
        <td>
          <span class="value" ref="name">{{row.name}}</span>
          <input type="text" class="editor" :value="row.name" @input="saveEditedName">
        </td>
        <td>
          <span class="value">{{row.description}}</span>
          <textarea class="editor" :value="row.description" @input="saveEditedDesc"></textarea>
        </td>
        <td>
          <button class="btn-edit" @click.stop="triggerEdit(row, $event)">编辑</button>
          <button class="btn-save" @click="updateRow(row)">保存</button>
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
          <button class="btn-add" @click="creatRow">新建</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<style scoped>
  .subject {
    padding: 10px 20px;
    background-color: #eee;
  }

  table {
    width: 100%;
    border: 1px solid #eee;
  }

  thead th:first-child {
    width: 20px;
  }

  thead th:nth-child(2) {
    width: 150px;
  }

  thead th:last-child {
    width: 50px;
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

  .in-edit input,
  .in-edit textarea,
  .new-row input,
  .new-row textarea {
    border: none;
    border-bottom: 1px #000 dashed;
    background-color: transparent;
  }

  textarea {
    resize: vertical;
  }
</style>
<script>
import {db} from '../../firebase'

export default {
  name: 'BaseTable',
  props: ['datasource', 'subject'],
  data: function () {
    return {
      activeRowId: null,
      editedRow: {},
      newRow: {
        name: '',
        description: ''
      },
      checkedRows: []
    }
  },
  firebase: function () {
    return {
      rows: db.ref(this.datasource),
      tags: db.ref('tag')
    }
  },
  methods: {
    creatRow: function () {
      const _this = this
      var newRowKey = this.$firebaseRefs.rows.push().key
      var newTagKey = this.$firebaseRefs.tags.push().key
      var updates = {}
      updates['/' + this.datasource + '/' + newRowKey] = this.newRow
      updates['/tag/' + newTagKey] = { relatedKey: newRowKey, name: this.newRow.name }

      db.ref().update(updates, function (err) {
        if (err) {
          console.log(err)
        } else {
          _this.newRow.name = ''
          _this.newRow.description = ''
        }
      })
    },
    deleteRows: function () {
      let updates = {}
      for (let rowKey of this.checkedRows) {
        updates['/' + this.datasource + '/' + rowKey] = null
        this.$firebaseRefs.tags.orderByChild('relatedKey').equalTo(rowKey).once('value', function (snap) {
          const data = snap.val()
          for (let tagKey in data) {
            data[tagKey] = null
            updates['/tag/' + tagKey] = null
          }
        })
      }
      db.ref().update(updates, function (err) {
        if (err) {
          console.log(err)
        }
      })
    },
    triggerEdit: function (row, e) {
      this.activeRowId = row['.key']
      this.$nextTick(() => e.target.parentNode.parentNode.querySelector('[type=text]').select())
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

        return this.$firebaseRefs.rows.update(updates, function (err) {
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
