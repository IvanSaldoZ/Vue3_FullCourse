// Стор, хранящий данные модуля, отвечающего за посты
import axios from "axios";

export const postModule = {


  // Общие данные (состояние приложения)
  state: () => ({
    posts: [],
    // Состояние загрузки постов - заружены/нет
    isPostsLoading: false,
    // Модель для сортировки - выпадающего списка
    selectedSort: '',
    // Массив, который будет содержать элементы для соратировки
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
  }),


  // Компьютед-свойства, т.е. это кэшируемые вычисляемые значения, к ним можно обращаться как к свойствам
  // и получать модифицированные значения
  getters: {
    // Объявляем метод для сортировки массива (в отличие от watch имя метода может быть любым)
    sortedPosts(state) {
      // [...] - создает копию массива, ещё запись ... называют разворот массива
      // (нужно, чтобы не менять исходный массив, а точнее - номера индексов)
      return [...state.posts].sort((post1, post2) => {
        // Сравниваем называние одного поста с названием другого через метод localeCompare
        // state.selectedSort - выбранный метод сортировки (title или body)
        return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      })
    },
    // Объявляем новое компьютед-свойство для поиска постов (с предварительной сортировкой)
    // Стейт - это состояние, которое эквивалентно this,
    // а getters - это геттеры, к которым также можно получить доступ из других геттеров
    sortedAndSearchedPosts(state, getters) {
      // Возвращаем this.sortedPosts, но фильтрованный по поисковой строке
      // .toLowerCase() - метод, который приводит все символы строки к нижнему регистру
      return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
    }
  },


  // Мутации позволяют менять нам поля из state-объекта (напрямую нельзя, но через мутации - можно)
  // По-факту - сеттеры
  mutations: {

    setPosts(state, posts) {
      state.posts = posts
    },
    setLoading(state, isPostsLoading) {
      state.isPostsLoading = isPostsLoading
    },
    setPage(state, page) {
      state.page = page
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery
    },

  },


  // Функции, которые внутри себя используют мутации и вызывают сайд-эффекты
  // Получаем данные с сервера, вызываем мутации и т.д.
  // https://next.vuex.vuejs.org/api/#usestore
  actions: {
    // Получаем список постов, передаем объект, в котором хранится список
    // функций и объектов для модификации состояния приложения (commit - для мутации,
    // а dispatch - для вызова других экшонов)
    async fetchPosts({state, commit}) {
      try {
        commit("setLoading", true);
        //Получаем посты с сервера - бакэнд
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        });
        // Считаем кол-во страниц (общее кол-во постов достаём из хедера) с округлением
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
        // Помещаем в модель posts то, что хранится в ответе в поле data (посты с сервера)
        commit('setPosts', response.data);
      } catch (e) {
        console.log(e)
      } finally {
        //Меняем состояние переменной загрузки постов
        commit("setLoading", false);
      }
    },
    // Получаем список постов при скролле в конец страницы
    async loadMorePosts({state, commit}) {
      try {
        commit('setPage', state.page + 1) // Увеличиваем страницу на единичку
        //Получаем посты с сервера - бакэнд
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        });
        // Считаем кол-во страниц (общее кол-во постов достаём из хедера) с округлением
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
        // Помещаем в модель posts то, что хранится в ответе в поле data (посты с сервера)
        commit('setPosts', [...state.posts, ...response.data]);
      } catch (e) {
        console.log(e)
      }
    },
  },


  // Флаг, говорящий о том, что вызывать мутации и акшоны необходимо через неймспейс (пространство имён)
  // Например {{ $store.commit('post/setPosts') }}
  // Необходимо для того, чтобы имена разных модулей не пересекались
  namespaced: true
}