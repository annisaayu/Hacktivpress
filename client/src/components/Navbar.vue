<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div class="container">
    <a class="navbar-brand"><router-link :to="{ path: '/', params: { id: '' } }">Blog</router-link></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ml-auto">
        <li class="dropdown order-1" v-show="!isLogin">
          <RegisterButton @register="register"></RegisterButton>
        </li>
        <li class="dropdown order-1" v-show="!isLogin">
          <LoginButton @login="login"></LoginButton>
        </li>
      </ul>
      <div v-show="isLogin">
      Hai, {{username}}
        <button type="button" class="btn btn-outline-secondary"  v-on:click="logout()"> 
          Logout 
        </button>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import axios from 'axios'
import RegisterButton from '@/components/NavbarComponents/RegisterButton.vue'
import LoginButton from '@/components/NavbarComponents/LoginButton.vue'

export default {
  name: 'Navbar',
  components : {
    RegisterButton,
    LoginButton
  },
  data () {
    return {
      isLogin: false,
      email: '',
      username: ''
    }
  },
  created () {
    if ( localStorage.getItem('token')) this.isLogin= true

    console.log(this.isLogin)
  },
  methods: {
    toHome () {
      this.$router.push('/')
    },
    toAbout () {
      this.$router.push('/about')
    },
    register (newMember) {
      console.log(newMember)
      axios.post('http://localhost:3000/users/register', newMember)
        .then(response => {
          console.log(response)
          alert(`Email ${this.email} successfully registered!`)
        })
        .catch(err => {
          console.error(err)
        })
    },
    login (logMember) {
      axios.post('http://localhost:3000/users/login', logMember)
        .then(response => {
          console.log(response)
          localStorage.setItem('token', response.data.token)
          this.isLogin = true
          this.username = response.data.payload.username
          console.log('ini session--', localStorage.getItem('token'))
          alert('Login success!')
        })
        .catch(err => {
          alert('Login failed!')
          console.error(err)
        })
    },
    logout () {
      this.isLogin = false
      localStorage.removeItem('token')
      alert('logged out')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>