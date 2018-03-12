<template>
  <div class="login">
    <img src="../assets/logo.jpg">
    <h1>Sign In</h1>
    <input type="text" placeholder="Email">
    <input type="password" placeholder="Password">
    <button @click="login">Connection</button>
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
    padding: 5px 15px;
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
