// Реактивный хук для Composition API для загрузки всех постов
// Удобство в том, что всё находится в одном месте

import axios from "axios";
import {ref, onMounted} from 'vue';

// Загружаем все посты с лимитом и активной страницей
export function usePosts(limit, page) {
  // Создаем реактивные переменные
  const posts = ref([])
  const totalPages = ref(0)
  const isPostsLoading = ref(true)

  const fetching = async () => {
    // Получаем список постов
    try {
      //Получаем посты с сервера - бакэнд
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _page: page,
          _limit: limit
        }
      });
      // Считаем кол-во страниц (общее кол-во постов достаём из хедера) с округлением
      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
      // Помещаем в модель posts то, что хранится в ответе в поле data (посты с сервера)
      posts.value = response.data;
    } catch (e) {
      console.log(e)
    } finally {
      //Меняем состояние переменной загрузки постов
      isPostsLoading.value = false;
    }
  }
  /*
  * Можно использовать
  * onMounted()
  * onCreated()
  * computed()
  * watch()
  *   * */

  // Функция должна отрабатывать тогда, когда компонент монтируется
  onMounted(fetching)

  // Возвращаем всё вовне
  return {
    posts, isPostsLoading, totalPages
  }

}