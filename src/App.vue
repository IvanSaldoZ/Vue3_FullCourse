<template>
  <div class="app">
    <post-form/>
    <!-- Короткая запись для v-bing - это двоеточие перед передаваемым пропсом -->
    <post-list :posts="posts"/>
  </div>
</template>

<script>

//Импортируем файлы с компонентами
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";

export default {
  //Регистрируем компоненты
  components: {
    PostForm, PostList
  },
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



</style>
