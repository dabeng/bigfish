<template>
  <nav class="top-menu" :class="{ expanded: isExpanded }">
    <a href="#" class="avatar" title="top menu" @click="expandMenu">☘</a>
    <a href="#" class="message" title="message center">✉</a>
    <a href="#" class="config" title="configurations">⚙</a>
    <a href="#" class="layout" title="toggle layout">⧉</a>
    <a href="#" class="logout" title="logout" @click="logout">➭</a>
  </nav>
</template>
<style scoped>
  .top-menu {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 4px;
    right: 4px;
  }
  .top-menu.expanded a {
    display: initial;
  }
  .top-menu a {
    display: inline-block;
    line-height: 35px;
    width: 35px;
    text-align: center;
    margin-bottom: 5px;
    text-decoration: none;
    color: #eee;
    border: 1px solid transparent;
    background-color: rgba(0, 0, 0, .5);
    font-size: 24px;
  }
  .top-menu a:hover {
    border-color: #eee;
  }
  .top-menu > *:not(.avatar) {
    display: none;
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
