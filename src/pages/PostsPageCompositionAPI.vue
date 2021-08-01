<template>
  <div>
    <h1>{{ likes }}</h1>
    <br><br>
    <button @click="addLike">Добавить лайк</button>


    <h1>Страница с постами</h1>
<!--    <my-input-->
<!--        v-focus-->
<!--        v-model="searchQuery"-->
<!--        placeholder="Поиск по постам"-->
<!--    />-->
<!--    <div class="app__btns">-->
<!--      <my-button-->
<!--          @click="showDialog"-->
<!--          style = "margin: 15px 0;"-->
<!--      >-->
<!--        Создать пост-->
<!--      </my-button>-->
<!--      <my-button-->
<!--          @click="fetchPosts"-->
<!--      >-->
<!--        Получить посты-->
<!--      </my-button>-->
<!--      <my-select-->
<!--          v-model="selectedSort"-->
<!--          :options="sortOptions"-->
<!--      />-->
<!--    </div>-->



<!--    &lt;!&ndash; Компонент - добавление поста через модальную форму &ndash;&gt;-->
<!--    <my-dialog v-model:show="dialogVisible">-->

<!--      &lt;!&ndash; Компонент - форма добавления поста-->
<!--      поскольку внутри my-dialog есть slots, то туда попадет всё содержимое этого тэга &ndash;&gt;-->
<!--      <post-form-->
<!--          @create="createPost"-->
<!--      />-->


<!--    </my-dialog>-->


<!--    &lt;!&ndash; Компонент - вывод списка постов &ndash;&gt;-->
<!--    &lt;!&ndash; Короткая запись для v-bing - это двоеточие перед передаваемым пропсом &ndash;&gt;-->
<!--    &lt;!&ndash; @remove - это on_remove - это событие из дочернего компонента post-list по удалению поста &ndash;&gt;-->
<!--    &lt;!&ndash; Передаем в компонент PostList результат-->
<!--    выполнения метода sortedAndSearchedPosts - сортировки и поиска по массиву &ndash;&gt;-->
<!--    <post-list-->
<!--        :posts="sortedAndSearchedPosts"-->
<!--        @remove="removePost"-->
<!--        v-if="!isPostsLoading"-->
<!--    />-->
<!--    <div v-if="isPostsLoading">-->
<!--      <h3>Загрузка постов...</h3>-->
<!--    </div>-->

<!--    &lt;!&ndash; Наблюдатель за тем, долистал ли пользователь до данного места&ndash;&gt;-->
<!--    &lt;!&ndash; https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API &ndash;&gt;-->
<!--    <div v-intersection="loadMorePosts" class="observer"></div>-->


  </div>
</template>

<script>

//Импортируем файлы с компонентами
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import {ref} from 'vue';

export default {
  //Регистрируем компоненты
  components: {
    PostForm,
    PostList
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
  setup(props) {
    const likes = ref(0)

    const addLike = () => {
      likes.value += 1
    }

    return {
      likes,
      addLike
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
