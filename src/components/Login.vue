<template>
  <div class="login">
    <img src="../assets/logo.png">
    <h1>Sign In</h1>
    <input type="text" placeholder="Email">
    <input type="password" placeholder="Password">
    <button @click="login">Connection</button>
    <p>You don't have an account ? You can <router-link to="/signup">create one</router-link></p>
  </div>
</template>
<style scoped>
  .login {
    margin-top: 40px;
    text-align: center;
  }
  input {
    display: block;
    margin: 0 auto 10px;
    width: 20%;
    min-width: 200px;
    padding: 5px 15px;
  }
  button {
    margin-top: 30px;
    padding: 5px 15px;
    min-width: 100px;
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
export default {
  name: 'Login',
  data: function () {
    return {}
  },
  methods: {
    login: function () {
      this.$router.replace('index')
    }
  }
}
</script>
