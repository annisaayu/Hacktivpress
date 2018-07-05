<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand"><router-link :to="{ path: '/', params: { id: '' } }">Hacktivpress</router-link></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto" v-if="!isLogin">
          <li class="dropdown order-1">
            <RegisterButton @register="register"></RegisterButton>
          </li>
          <li class="dropdown order-1">
            <LoginButton @login="login"></LoginButton>
          </li>
        </ul>

        <ul class="navbar-nav ml-auto"  v-else>
          <li class="dropdown order-1">
            <span class="text-white"> Hai, {{username}} </span>
          </li>
          <li class="dropdown order-1">
            <button type="button" class="btn btn-primary"  data-toggle="modal"
        data-target="#modalAdd">
              Add Article
            </button>
          </li>
          <li class="dropdown order-1">
            <button type="button" class="btn btn-outline-secondary"  v-on:click="logout()"> 
            Logout 
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div id="modalAdd" class="modal fade" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" align="left">New Post</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <form class="ivu-form ivu-form-label-right">
            <div class="form-group">
              <label class="form-title">Title</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i>
                  <input type="text" placeholder="Post Title" class="form-control" v-model="addThisItem.title">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-title">Image</label>
              <div class="form-group-content">
                <div class="">
                  <input type="file" class="form-control" id="recipient-name" @change="getPhotoAdd">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-title">Content</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i>
                  <textarea placeholder="Content" rows="2" class="form-control" v-model="addThisItem.content"></textarea>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-title">Category</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i> 
                  <select class="form-control form-control-sm" data-live-search="true" v-model="addThisItem.category">
                    <option value="tutorial" selected>tutorial</option>
                    <option value="design" selected>design</option>
                    <option value="others" selected>others</option>
									</select>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button class="btn btn-primary" @click="addPost" data-dismiss="modal">Save</button>
        </div>
      </div>
    </div>
  </div>
</div>
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
      username: '',
      addThisItem: {},
      fileAdd: null,
      formData: new FormData(),
      formDataAdd: new FormData(),
      selectedItem: ''
    }
  },
  created () {
    if ( localStorage.getItem('token')) {
      this.isLogin= true 
      this.username= localStorage.getItem('username')
    }

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
      let self = this
      axios.post('http://localhost:3000/users/login', logMember)
        .then(response => {
          console.log(response)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('username', response.data.payload.username)
          self.isLogin = true
          console.log('ini session--', localStorage.getItem('token'))
          alert('Login success!',)
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
    },
    addPost: function () {
      this.formDataAdd.set('image', this.fileAdd)
      this.formDataAdd.set('title', this.addThisItem.title)
      this.formDataAdd.set('content', this.addThisItem.content)
      this.formDataAdd.set('category', this.addThisItem.category)
      axios({
        method: 'post',
        url: 'http://localhost:3000/articles',
        data: this.formDataAdd,
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(({ data }) => {
        console.log(data)
        this.$router.push('/')
      })
    },
    getPhotoAdd: function (event) {
      this.fileAdd = event.target.files[0]
      console.log('image to add--', this.fileAdd)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>