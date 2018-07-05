<template>
<div>
  <div class="container">
    <Navbar></Navbar>

    <div class="row">
      <!-- Blog Entries Column -->
      <div class="col-md-8">
        <h1 class="my-4">Hacktivpress Super Fox
          <small></small>
        </h1>

        <router-view />

        <!-- Pagination -->
        <ul class="pagination justify-content-center mb-4">
          <li class="page-item">
            <a class="page-link" href="#">&larr; Older</a>
          </li>
          <li class="page-item disabled">
            <a class="page-link" href="#">Newer &rarr;</a>
          </li>
        </ul>
      </div>

      <!-- Sidebar Widgets Column -->
      <div class="col-md-4">

        <Sidebar/>

      </div>

    </div>
  </div>
  <Footer/>
</div>
  
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Post from '@/components/Post.vue'
import Sidebar from '@/components/SideBar.vue'
import Footer from '@/components/Footer.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    Navbar,
    Post,
    Sidebar,
    Footer
  },
  methods: {
    ...mapActions([
      'getPosts'
    ])
  },
  computed: {
    ...mapState([
      'posts'
    ])
  },
  mounted () {
    this.getPosts()
  },
  created () {
    this.getPosts()
  }
}
</script>
