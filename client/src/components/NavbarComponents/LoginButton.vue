<template>
<div>
  <button type="button" id="btn_login" data-toggle="dropdown" class="btn btn-outline-secondary dropdown-toggle add-margin">Login
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu dropdown-menu-right mt-2">
    <li class="px-3 py-2">
      <form class="form" role="form" v-on:submit.prevent="login()">
        <div class="form-group">
          <input id="login_username" placeholder="username" class="form-control form-control-sm" type="text" required="" v-model="username">
        </div>
        <div class="form-group">
          <input id="login_pwd" placeholder="Password" class="form-control form-control-sm" type="password" required v-model="password">
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">Login</button>
        </div>
        <div class="form-group text-center">
          <small>
            <a href="#" data-toggle="modal" data-target="#modalPassword">Forgot password?</a>
          </small>
        </div>
      </form>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'LoginButton',
  data () {
    return {
      username:'',
      password: ''
    }
  },
  methods: {
    login () {
      let logMember = {
        username: this.username,
        password: this.password

      }
      console.log(logMember)
      this.$emit('login', logMember)
      this.username = ''
      this.password = ''
    }
  }
}
</script>

