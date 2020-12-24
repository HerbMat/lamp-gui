<template>
  <div class="flex-box center">
    <div class="container">
      <form class="login-form-layout">
        <app-errors v-bind:errors="errors" />
        <label for="username">Username</label>
        <input type="text" id="username" v-model="user.username"/>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="user.password"/>
        <input type="submit" id="login-submit" @click.prevent="login" value="Log in"/>
      </form>
    </div>
  </div>
</template>

<script>
import router from '../router'
import FormErrors from '../components/FormErrors'

export default {
  name: 'Login',
  data: () => {
    return {
      user: {
        username: '',
        password: ''
      },
      errors: []
    }
  },
  methods: {
    login () {
      if (this.checkForm()) {
        this.$store.dispatch('login', {
          username: this.user.username,
          password: this.user.password
        }).then(() => router.replace('/'))
          .catch(error => {
            this.errors = []
            if (error.response.status === 401) {
              this.errors.push('Bad username or password')
            } else {
              this.errors.push('There was some kind of error')
            }
          })
      }
    },
    checkForm () {
      this.errors = []
      if (!this.user.username) {
        this.errors.push('Name required.')
      }
      if (!this.user.password) {
        this.errors.push('Password required.')
      }
      return this.errors.length === 0
    }
  },
  components: {
    'app-errors': FormErrors
  }
}
</script>

<style lang="scss" scoped>
  .login-form-layout {
    margin-left: 20%;
    margin-right: 20%;
    min-width: 3rem;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1rem;
  }

  .login-form-layout > input {
    width: 100%;
    min-width: 3rem;
    height: 3rem;
  }

  .login-form-layout > label {
    display: block;
    text-align: center;
  }
</style>
