<template>
  <div class="app">
    <h1>Страница с постами</h1>

    <my-button
      @click="fetchPosts"
    >
      Получить посты
    </my-button>

    <my-button
        @click="showDialog"
        style = "margin: 15px 0;"
    >Создать пост</my-button>

    <!-- Компонент - добавление поста через модальную форму -->
    <my-dialog v-model:show="dialogVisible">

      <!-- Компонент - форма добавления поста
      поскольку внутри my-dialog есть slots, то туда попадет всё содержимое этого тэга -->
      <post-form
          @create="createPost"
      />


    </my-dialog>


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
import MyDialog from "@/components/UI/MyDialog";
import axios from "axios";
import MyButton from "@/components/UI/MyButton";


export default {
  //Регистрируем компоненты
  components: {
    MyButton,
    MyDialog,
    PostForm, PostList
  },
  //Модель - посты
  data() {
    return {
      posts: [],
      //Модель для отображения или скрытия диалогового окннаа
      dialogVisible: false
    }
  },
  methods: {
    // Этот метод вызывается, при добавлении поста от дочернего компонента post-form - см выше
    // В качестве параметра тут - это пост, который пользователь хочет добавить
    createPost(post) {
      // Добавляем пост в наш список постов
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      // Копируем с помощью метода Filter только те посты в тот же массив, айдишники которых
      // НЕ равны указанному посту для удаления
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        //Получаем посты с сервера - бакэнд
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
        // Помещаем в модель posts то, что хранится в ответе в поле data (посты с сервера)
        this.posts = response.data;
      } catch (e) {
        alert('Ошибка')
      }

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
