<template>
<div class="login">
  <img src="../assets/logo.jpg">
  <input type="text" placeholder="Email" v-model="email">
  <input type="password" placeholder="Password" v-model="password">
  <button @click="login">Login</button>
  <p>You don't have an account ? You can <router-link to="/signup">create one</router-link></p>
</div>
</template>
<style scoped>
.login {
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
p {
  margin-top: 10px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
<script>
import firebase from 'firebase'

export default {
  name: 'SingIn',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        /*
         * With ES6 arrow function, this is lexical, meaning that it does not create its own
         * this context. Instead, this has the original meaning from the enclosing context.
         */
        user => {
          this.$router.replace('index')
        },
        err => {
          alert(err.message)
        }
      )
    }
  }
}
</script>
