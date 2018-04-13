<template>
  <div class="top-menu" :class="{ expanded: isExpanded }">
    <button id="btn-noti" title="notifications">✉</button>
    <button class="fixed-item" id="btn-avatar" title="toggle top menu" @click="expandMenu">☘</button>
    <button id="btn-layout" title="toggle layout">⧉</button>
    <button id="btn-logout" title="logout" @click="logout">⎋</button>
  </div>
</template>
<style scoped>
  .top-menu {
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    top: 5px;
    right: 5px;
  }
  .top-menu.expanded {
    width: 74px;
    height: 74px;
  }
  .top-menu.expanded button {
    display: initial;
  }
  .top-menu button {
    color: #ccc;
    border: none;
    background-color: rgba(0, 0, 0, .5);
    height: 36px;
    width: 36px;
    font-size: 24px;
  }
  .top-menu button:hover {
    color: #fff;
  }
  .top-menu > *:not(.fixed-item) {
    display: none;
  }
  #btn-noti, #btn-layout {
    margin-right: 2px;
  }
  #btn-layout, #btn-logout {
    margin-top: 2px;
  }
</style>
<script>
import firebase from 'firebase'

export default {
  name: 'TopMenu',
  data: function () {
    return { isExpanded: false }
  },
  methods: {
    expandMenu: function () {
      this.isExpanded = !this.isExpanded
    },
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('signin')
      })
    }
  }
}
</script>
