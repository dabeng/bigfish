<template>
<div class="signup">
  <img src="../assets/logo.jpg">
  <h1>Let's create a new account</h1>
  <input type="text" placeholder="Email" v-model="email">
  <input type="password" placeholder="Password" v-model="password">
  <button @click="signup">Sign UP</button>
  <p>or go back to <router-link to="/login">login</router-link></p>
</div>
</template>
<style scoped>
.signup {
  text-align: center;
  padding: 20px;
}
input {
  display: block;
  margin: 0 auto 10px;
  width: 200px;
  padding: 5px 10px;
}
button {
  padding: 5px 15px;
  cursor: pointer;
}
</style>
<script>
import firebase from 'firebase'

export default {
  name: 'SignUp',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signup: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        user => {
          alert('Well Done! You are connected')
        },
        err => {
          alert(err.message)
        }
      )
    }
  }
}
</script>
