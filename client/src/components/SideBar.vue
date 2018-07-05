<template>
  <div>

    <!-- Categories Widget -->
    <div class="card my-4">
      <h5 class="card-header">Categories</h5>
      <div class="card-body">
        <div class="row">
          <div class="col-lg-12">
            <ul class="list-unstyled mb-0">
              <li>
                <a><router-link :to="{ path: '/tutorial', params: { id: 'tutorial' } }">Tutorial</router-link></a>
              </li>
              <li>
                <a><router-link :to="{ path: '/design', params: { id: 'design' } }">Design</router-link></a>
              </li>
              <li>
                <a><router-link :to="{ path: '/others', params: { id: 'others' } }">Others</router-link></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Authors Widget -->
    <div class="card my-4">
      <h5 class="card-header">Authors</h5>
      <div class="card-body">
        <div class="row">
          <div class="col-lg-12">
            <ul class="list-unstyled mb-0">
              <li v-for="author in authors">
              {{author}}
                <a><router-link :to="{ path: `/${author.username}`, params: { id: `${author.username}` } }">Tutorial</router-link></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Time Widget -->
    <div class="card my-4">
      <h5 class="card-header">Time Widget</h5>
      <div class="card-body">
        <div style="text-align:center;padding:1em 0;"> <h3><span style="color:gray;">Current local time in</span><br />Jakarta, Indonesia</h3> <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=en&size=medium&timezone=Asia%2FJakarta" width="100%" height="115" frameborder="0" seamless></iframe> </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Sidebar',
  computed: {
    ...mapState([
      'authors'
    ]),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
