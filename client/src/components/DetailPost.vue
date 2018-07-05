<template>
  <div>
    <div class="card mb-4" v-for="(post,i) in posts" :key="i" v-if="post._id == postid">
      <img class="card-img-top" v-bind:src="post.image" alt="Card image cap">
      <div class="card-body">
        <h2 class="card-title">{{ post.title }}</h2>
        <p class="card-text">{{ post.content }}</p>
      </div>
      <div class="card-footer text-muted">
        Posted on {{post.createdAt.slice(0, 10)}} by
        <a href="#">{{post.author.username}}</a>
        <span v-if="username == post.author.username  && token">
        ||
          <a class="text-warning" data-toggle="modal" data-target=".bd-example-modal-lg" @click="changeItem(post)">Edit</a> 
          | 
          <a class="text-danger" @click="deleteItem(post._id)">Delete</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Post',
  data () {
    return {
      category: this.$route.params.id,
      postid: this.$route.params.postid,
      newComment: ''
    }
  },
  methods: {
    addComment: function(postid) {
      let user = localStorage.getItem('token')
      if(!user) {
        alert('Login first')
      } else {
        axios.post(`http://localhost:3000/articles/${postid}/addcomment/`, {
          id: postid,
          comment: this.newComment
        }, {
          headers: {
            token: user
          }
        })
          .then(response => {
            console.log(response)
            this.newComment = ''
            this.$router.go()
          })
          .catch(err => {
            console.error(err)
          })
      }
      
    },
    deleteItem(id) {
      this.$store.dispatch('deleteItem', id)
    }
  },
  computed: {
    ...mapState([
      'posts',
      'username',
      'token'
    ]),
  },
  watch:{
    $route: function (to, from){
      this.$router.go()
    }
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comment-user {
  font-weight: bold;
  text-align: left;
}
</style>
