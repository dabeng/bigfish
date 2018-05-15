<template>
  <div class="place-list" v-click-outside="{ selector: '.in-edit', func: cancelEdit }">
    <h1 class="subject">钓场</h1>
    <p>
      批处理：<button @click="deletePlaces">删除</button>
    </p>
    <table>
      <thead>
        <th></th>
        <th>名称</th>
        <th>描述</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="place of places" :key="place['.key']" :class="{ 'in-edit': place['.key'] == activePlaceId }">
          <td><input type="checkbox" :value="place['.key']" v-model="checkedPlaces"></td>
          <td>
            <span class="value">{{place.name}}</span>
            <input type="text" class="editor" :value="place.name" @input="saveEditedName">
          </td>
          <td>
            <span class="value">{{place.description}}</span>
            <textarea class="editor" :value="place.description" @input="saveEditedDesc"></textarea>
          </td>
          <td>
            <button class="btn-edit" @click="triggerEdit(place)">Edit</button>
            <button class="btn-save" @click="updatePlace(place)">Save</button>
          </td>
        </tr>
        <tr class="new-row">
          <td></td>
          <td>
            <input type="text" class="editor" v-model="newPlace.name">
          </td>
          <td>
            <textarea class="editor" v-model="newPlace.description"></textarea>
          </td>
          <td>
            <button class="btn-add" @click="creatPlace">Creat</button>
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
import {placeRef} from '../../firebase'

export default {
  name: 'PlaceList',
  firebase: {
    places: placeRef
  },
  data: function () {
    return {
      activePlaceId: null,
      editedPlace: {},
      newPlace: {
        name: '',
        description: ''
      },
      checkedPlaces: []
    }
  },
  methods: {
    creatPlace: function () {
      placeRef.push(this.newPlace)
      this.newPlace.name = ''
      this.newPlace.description = ''
    },
    deletePlaces: function () {
      let updates = {}
      for (let placeKey of this.checkedPlaces) {
        updates[placeKey] = null
      }

      return placeRef.update(updates)
    },
    triggerEdit: function (place) {
      this.activePlaceId = place['.key']
    },
    cancelEdit: function (e) {
      this.activePlaceId = null
    },
    saveEditedName: function (e) {
      this.editedPlace.name = e.target.value
    },
    saveEditedDesc: function (e) {
      this.editedPlace.description = e.target.value
    },
    updatePlace: function (place) {
      if (Object.keys(this.editedPlace).length) {
        const copy = {...place}
        delete copy['.key']
        let updates = {}
        updates[place['.key']] = Object.assign(copy, this.editedPlace)

        return placeRef.update(updates)
      }
    }
  }
}
</script>
