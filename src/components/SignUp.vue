<template>
  <div class="signup">
    <p>Let's create a new account</p>
    <input type="text" placeholder="Email" v-model="email"><br>
    <input type="password" placeholder="Password" v-model="password"><br>
    <button @click="signup">Sign UP</button>
    <p>or go back to <router-link to="/login">login</router-link></p>
  </div>
</template>
<style scoped>
  .signup {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 10px;
    width: 10%;
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
        function (user) {
          alert('Your account has been created')
        },
        function (err) {
          alert(err.message)
        }
      )
    }
  }
}
</script>
