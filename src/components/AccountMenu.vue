<template>
  <div class="account-menu">
    <button @click="logout">Logout</button>
    <button>switch layout</button>
    <button>notifications</button>
  </div>
</template>
<style scoped>
  .account-menu {
    position: fixed;
    top: 5px;
    right: 5px;
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
