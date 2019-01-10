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
      let name = this.posts.name;
      let text = this.posts.text;

      var xhr = new XMLHttpRequest();

      xhr.open("POST", 'https://forum-vue-node.herokuapp.com/api/posts/add/', true);

      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      xhr.onreadystatechange = function () { 

        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

          console.log("Response: " + this.responseText);
        }

      }
      xhr.send("name=" + name + "&text= " + text);
      location.reload();
      
    }
  }
})

