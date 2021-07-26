<template>
  <div class="app">
    <form @submit.prevent>
      <h4>Добавление поста</h4>
      <input
          v-bind:value="title"
          @input="title = $event.target.value"
          class="input"
          type="text"
          placeholder="Описание">
      <input
          v-bind:value="body"
          @input="body = $event.target.value"
          class="input"
          type="text"
          placeholder="Название">
      <button
          class="btn"
          @click="createPost">Добавить</button>
    </form>
    <div class="post" v-for="post in posts">
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
  </div>
</template>

<script>

export default {
  //Модель
  data() {
    return {
      posts: [
        {id: 1, title: 'Какой язык лучше: JavaScript или PHP?', body: 'Ответ на этот вопрос в этой статье'},
        {id: 2, title: 'Какой язык лучше: 2', body: 'Ответ на этот вопрос в этой статье 2'},
        {id: 3, title: 'Какой язык лучше: 3', body: 'Ответ на этот вопрос в этой статье 3'},
      ],
      title: '',
      body: ''
    }
  },
  methods: {
    createPost() {
      const newPost = {
        id: Date.now(),
        title: this.title,
        body: this.body
      }
      this.posts.push(newPost);
      this.title = "";
      this.body = "";
    }
  }
}


</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.post {
  padding: 15px;
  border: 2px solid green;
  margin-top: 15px;
}

form {
  display: flex;
  flex-direction: column;
}

.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}

.btn {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}

</style>
