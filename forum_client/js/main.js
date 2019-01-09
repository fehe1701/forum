new Vue({
  el: '#app',
  data() {
    return {
      posts: []
    }
  },
  // Använd Axios för att konsumera REST-tjänst
  mounted() {
    axios
      .get('https://forum-vue-node.herokuapp.com/api/posts/')
      .then(response => (this.posts = response.data))
  },
  methods: {
    // Radera poster
    deletePost(_id, i) {
      axios.delete('https://forum-vue-node.herokuapp.com/api/posts/delete/' + _id)
        .then(() => {
          this.posts.splice(i, 1)
        });
      console.log(this.posts);
    },
    // Skicka poster
    sendPost() {
        let newPost = {
          name: this.posts.name,
          text: this.posts.text
        }

        console.log(newPost);
        axios.post('https://forum-vue-node.herokuapp.com/api/posts/add/', newPost)
        .then((response) => {
          console.log(response)
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
})

