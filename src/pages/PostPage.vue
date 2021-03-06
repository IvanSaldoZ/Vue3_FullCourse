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
          v-model="selectedSort"
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


    <!-- Ссылки для перехода по страницам-->
    <!--    <div class="page__wrapper">-->
    <!--      <div-->
    <!--          v-for="pageNumber in totalPages"-->
    <!--          :key="pageNumber"-->
    <!--          class="page"-->
    <!--          :class="{-->
    <!--            'current-page': page === pageNumber-->
    <!--          }"-->
    <!--          @click="changePage(pageNumber)"-->
    <!--      >-->

    <!--        {{ pageNumber }}-->

    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>

//Импортируем файлы с компонентами
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";

export default {
  //Регистрируем компоненты
  components: {
    PostForm,
    PostList
  },
  //Модели описываются в data
  data() {
    return {
      posts: [],
      // Модель для отображения или скрытия диалогового окннаа
      dialogVisible: false,
      // Состояние загрузки постов - заружены/нет
      isPostsLoading: false,
      // Модель для сортировки - выпадающего списка
      selectedSort: '',
      // Массив, который будет содержать элементы списка
      sortOptions: [
        {value: 'title', name: 'По заголовку'},
        {value: 'body', name: 'По содержимому'},
      ],
      // Модель-строка для поиска по постам
      searchQuery: '',
      // Модель для постраничного вывода
      page: 1, //текущая страница
      limit: 10, //кол-во постов на одной странице
      totalPages: 0 //общее кол-во страниц
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
    // Получаем список постов
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        //Получаем посты с сервера - бакэнд
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        // Считаем кол-во страниц (общее кол-во постов достаём из хедера) с округлением
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        // Помещаем в модель posts то, что хранится в ответе в поле data (посты с сервера)
        this.posts = response.data;
      } catch (e) {
        alert('Ошибка')
      } finally {
        //Меняем состояние переменной загрузки постов
        this.isPostsLoading = false;
      }
    },
    // Получаем список постов при скролле в конец страницы
    async loadMorePosts() {
      try {
        this.page += 1; // Увеличиваем страницу на единичку
        //Получаем посты с сервера - бакэнд
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        // Считаем кол-во страниц (общее кол-во постов достаём из хедера) с округлением
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        // Помещаем в модель posts то, что хранится в ответе в поле data (посты с сервера)
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('Ошибка')
      }
    },
    changePage(pageNumber) {
      this.page = pageNumber
    }
  },
  // При маунте компонента
  // https://v3.ru.vuejs.org/ru/guide/instance.html#диаграмма-жизненного-цикла
  mounted() {
    // Подгружаем посты
    this.fetchPosts();
  },
  // computed - обертка для вычисления какого-то поля объекта
  // Нужно для того, чтобы при неизменности самого объекта какая-то переменная также не изменялась
  // (экономия ресурсов)
  computed: {
    // Объявляем метод для сортировки массива (в отличие от watch имя метода может быть любым)
    sortedPosts() {
      // [...this.posts] - создает копию массива ... - разворот массива
      // (нужно, чтобы не менять исходный массив, а точнее - номера индексов)
      return [...this.posts].sort((post1, post2) => {
        // Сравниваем называние одного поста с названием другого через метод localeCompare
        // this.selectedSort - выбранный метод сортировки (title или body)
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    // Объявляем новое компьютед-свойство для поиска постов (с предварительной сортировкой)
    sortedAndSearchedPosts() {
      // Возвращаем this.sortedPosts, но фильтрованный по поисковой строке
      // .toLowerCase() - метод, который приводит все символы строки к нижнему регистру
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  // объект для отслеживания изменения какой-то модели/свойства/поля (функция-наблюдатель)
  watch: {
    // Метод, который отслеживает изменение модели. Имя этого метода должно быть таким же,
    // как и имя той модель, за которой наблюдает этот watch-метод
    // (в нашем случае модель в data() выше называется selectedSort),
    // поэтому и тут мы тоже назовем метод для отслеживания selectedSort
    // Параметр - новое значение
    // selectedSort(newValue) {
    //   // Сортируем посты - в качестве параметров выступает коллбек с двумя постами для сравнения
    //   this.posts.sort((post1, post2) => {
    //     // Сравниваем называние одного поста с названием другого через метод localeCompare
    //     // newValue = this.selectedSort - выбранный метод сортировки (title или body)
    //     return post1[newValue]?.localeCompare(post2[newValue])
    //   })
    // },
    // Наблюдаем за тем, видимо окно диалога или нет
    dialogVisible(newValue) {
      console.log(newValue)
    },
    // Наблюдатель за номером страницы - когда он меняется, отрабатывает эта функция
    // page() {
    //   this.fetchPosts()
    // }
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
