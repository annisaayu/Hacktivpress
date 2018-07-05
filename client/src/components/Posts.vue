<template>
  <div>
    <div class="card mb-4" v-for="(post,i) in posts" :key="i">
      <img class="card-img-top" v-bind:src="post.image" alt="Card image cap">
      <div class="card-body">
        <h2 class="card-title">{{ post.title }}</h2>
        <p class="card-text">{{ post.content.substr(0, 100) }}...</p>
        <a class="btn btn-default">
          <router-link :to="{ path: '/' + post.category + '/' + post._id, params: { id: post.category, postid: post._id } }">
            Read More &rarr;
          </router-link>
        </a>
      </div>
      <div class="card-footer text-muted">
        Posted on {{post.createdAt.slice(0, 10)}} by
        <a href="#">{{post.author.username}}</a>
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
      category: this.$route.params.id
    }
  },
  computed: {
    ...mapState([
      'posts'
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

</style>
