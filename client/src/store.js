import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: localStorage.getItem('username'),
    token: localStorage.getItem('token'),
    posts: [],
    authors: []
  },
  mutations: {
    addPost (state, payload) {
      state.posts = payload.articles
    },
    addUser (state, payload) {
      state.posts = payload.users
    }
  },
  actions: {
    getPosts ({ commit }) {
      axios.get(`http://localhost:3000/articles`)
        .then(response => {
          commit('addPost', response.data)
        })
        .catch(err => {
          console.error(err);
        })
    },
    getAuthors ({ commit }) {
      axios.get(`http://localhost:3000/users`)
        .then(response => {
          console.log(response.data)
          commit('addUser', response.data)
        })
        .catch(err => {
          console.error(err);
        })
    },
    deleteItem({commit}, payload) {
      axios.delete(`http://localhost:3000/articles/${payload}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((response) => {
          alert(`delete article ${response.data.article.title}`)
        })
        .catch((err) => {
          console.log('ini err', err)
          alert('delete article failed ')
        })
    },
  }
})
