<template>
  <div class="account-menu">
    <button>noti</button>
    <button>Avatar</button>
    <button>switch layout</button>
    <button @click="logout">Logout</button>
  </div>
</template>
<style scoped>
  .account-menu {
    display: flex;
    flex-wrap: wrap;
    width: 100px;
    height: 100px;
    position: fixed;
    top: 5px;
    right: 5px;
  }
  .account-menu button {
    border: 1px solid #000;
    background-color: #fff;
    height: 50px;
    width: 50px;
  }
</style>
<script>
import firebase from 'firebase'

export default {
  name: 'AccountMenu',
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('signin')
      })
    }
  }
}
</script>
