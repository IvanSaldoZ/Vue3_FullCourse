<template>
  <div>


    <h1>Страница с постами</h1>
    <my-input
        v-focus
        v-model="searchQuery"
        placeholder="Поиск по постам"
    />
    <div class="app__btns">
      <my-button
          style = "margin: 15px 0;"
      >
        Создать пост
      </my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>



    <!-- Компонент - добавление поста через модальную форму -->
    <my-dialog v-model:show="dialogVisible">

      <!-- Компонент - форма добавления поста
      поскольку внутри my-dialog есть slots, то туда попадет всё содержимое этого тэга -->
      <post-form
      />


    </my-dialog>


    <!-- Компонент - вывод списка постов -->
    <!-- Короткая запись для v-bing - это двоеточие перед передаваемым пропсом -->
    <!-- @remove - это on_remove - это событие из дочернего компонента post-list по удалению поста -->
    <!-- Передаем в компонент PostList результат
    выполнения метода sortedAndSearchedPosts - сортировки и поиска по массиву -->
    <post-list
        :posts="sortedAndSearchedPosts"
        v-if="!isPostsLoading"
    />
    <div v-if="isPostsLoading">
      <h3>Загрузка постов...</h3>
    </div>


  </div>
</template>

<script>

//Импортируем файлы с компонентами
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import {ref} from 'vue';
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

export default {
  //Регистрируем компоненты
  components: {
    PostList,
    PostForm,
  },
  //Модели описываются в data
  data() {
    return {
      // Модель для отображения или скрытия диалогового окннаа
      dialogVisible: false,
      // Массив, который будет содержать элементы списка
      sortOptions: [
        {value: 'title', name: 'По заголовку'},
        {value: 'body', name: 'По содержимому'},
      ],
    }
  },
  // Хуки - Vue Composition API - объединение данных и методов, которые с ними работают
  setup(props) {
    const {posts, isPostsLoading, totalPages} = usePosts(10, 1);
    const {selectedSort, sortedPosts} = useSortedPosts(posts);
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      totalPages,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts
    }
   }


}


</script>

<style>

.app__btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}

/* Наблюдатель, долистал ли пользователь до этого места */
.observer {
  height: 30px;
  background: green;
}

</style>
