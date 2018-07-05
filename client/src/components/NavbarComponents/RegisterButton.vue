<template>
<div>
  <button type="button" id="btn_register" data-toggle="dropdown" class="btn btn-outline-secondary dropdown-toggle add-margin">Register
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu dropdown-menu-right mt-2">
    <li class="px-3 py-2">
      <form class="form" role="form" v-on:submit.prevent="register()">
        <div class="form-group">
          <input id="regis_email" placeholder="Email" class="form-control form-control-sm" type="email" required="" v-model="email">
        </div>
        <div class="form-group">
          <input id="regis_username" placeholder="Username" class="form-control form-control-sm" type="username" required="" v-model="username">
        </div>
        <div class="form-group">
          <input id="regis_pwd" placeholder="Password" class="form-control form-control-sm" type="password" required="" v-model="password">
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">Register</button>
        </div>
      </form>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'RegisterButton',
  data () {
    return {
      email: '',
      username: '',
      password: ''
    }
  },
  methods: {
    register () {
      let newMember = {
        email: this.email,
        username: this.username,
        password: this.password

      }
      console.log(newMember)
      this.$emit('register', newMember)
      this.email = ''
      this.username = ''
      this.password = ''
    }
  }
}
</script>

