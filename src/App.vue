<template>
  <div class="app">
    <!-- Компонент - добавление поста -->
    <post-form
        @create="createPost"
    />
    <!-- Компонент - вывод списка постов -->
    <!-- Короткая запись для v-bing - это двоеточие перед передаваемым пропсом -->
    <!-- @remove - это on_remove - это событие из дочернего компонента post-list по удалению поста -->
    <post-list
        :posts="posts"
        @remove="removePost"
    />
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
    }
  },
  methods: {
    // Этот метод вызывается, при добавлении поста от дочернего компонента post-form - см выше
    // В качестве параметра тут - это пост, который пользователь хочет добавить
    createPost(post) {
      // Добавляем пост в наш список постов
      this.posts.push(post);
    },
    removePost(post) {
      // Копируем с помощью метода Filter только те посты в тот же массив, айдишники которых
      // НЕ равны указанному посту для удаления
      this.posts = this.posts.filter(p => p.id !== post.id)
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
