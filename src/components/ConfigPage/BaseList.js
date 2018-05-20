export default {
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
  methods: {
    creatRow: function () {
      this.$firebaseRefs.rows.push(this.newRow)
      this.newRow.name = ''
      this.newRow.description = ''
    },
    deleteRows: function () {
      let updates = {}
      for (let rowKey of this.checkedRows) {
        updates[rowKey] = null
      }

      return this.$firebaseRefs.rows.update(updates)
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
