<template>
  <div>


    <!-- Чтобы обратиться к каким-то полям, необходимо сначала обратиться к какому-то модулю-->

    <h1>Страница с постами</h1>
    <my-input
        v-focus
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск по постам"
    />
    <div class="app__btns">
      <my-button
          @click="showDialog"
          style = "margin: 15px 0;"
      >
        Создать пост
      </my-button>
      <my-button
          @click="fetchPosts"
      >
        Получить посты
      </my-button>
      <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>



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
    <!-- Передаем в компонент PostList результат
    выполнения метода sortedAndSearchedPosts - сортировки и поиска по массиву -->
    <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
    />
    <div v-if="isPostsLoading">
      <h3>Загрузка постов...</h3>
    </div>

    <!-- Наблюдатель за тем, долистал ли пользователь до данного места-->
    <!-- https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API -->
    <div v-intersection="loadMorePosts" class="observer"></div>


  </div>
</template>

<script>

//Импортируем файлы с компонентами
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
// Импортируем сокращения для $store.getters.post....
// Нужно для упрощения получения мутаций, экшона, стейта и геттеров
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  //Регистрируем компоненты
  components: {
    PostForm,
    PostList
  },
  //Модели описываются в data
  data() {
    return {
      dialogVisible: false,

      // Перенесены в глобальный стор
    }
  },
  methods: {
    // Разворачиваем методы для работы с мутациями и экшонами
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    // Сразу подгружаем все необходимые нам методы
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),

    // Этот метод вызывается, при добавлении поста от дочернего компонента post-form - см выше
    // В качестве параметра тут - это пост, который пользователь хочет добавить
    createPost(post) {
      // Добавляем пост в наш список постов
      this.posts.push(post);
      this.dialogVisible = false;
    },
    // Удаляем пост
    removePost(post) {
      // Копируем с помощью метода Filter только те посты в тот же массив, айдишники которых
      // НЕ равны указанному посту для удаления
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    // Показываем диалог
    showDialog() {
      this.dialogVisible = true;
    },
    changePage(pageNumber) {
      this.page = pageNumber
    }
  },
  // При маунте компонента
  // https://v3.ru.vuejs.org/ru/guide/instance.html#диаграмма-жизненного-цикла
  mounted() {
    // Подгружаем посты - снова работает, потому что развернули хуки ...mapActions из глобального стора
    this.fetchPosts();
  },
  // computed - обертка для вычисления какого-то поля объекта
  // Нужно для того, чтобы при неизменности самого объекта какая-то переменная также не изменялась
  // (экономия ресурсов)
  computed: {
    // Замапываем геттеры и State, чтобы убрать глобальный неймспейс
    ...mapState({
      posts: state => state.post.posts,
      // Состояние загрузки постов - заружены/нет
      isPostsLoading: state => state.post.isPostsLoading,
      // Модель для сортировки - выпадающего списка
      selectedSort: state => state.post.selectedSort,
      //Массив, который будет содержать элементы списка
      sortOptions: state => state.post.sortOptions,
      // Модель-строка для поиска по постам
      searchQuery: state => state.post.searchQuery,
      // Модель для постраничного вывода
      page: state => state.post.page, //текущая страница
      limit: state => state.post.limit, //кол-во постов на одной странице
      totalPages: state => state.post.totalPages, //общее кол-во страниц
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })

    // Остальные перенесены в глобальный стор
  },
  // объект для отслеживания изменения какой-то модели/свойства/поля (функция-наблюдатель)
  watch: {

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
