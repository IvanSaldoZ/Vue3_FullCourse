import {ref, computed} from 'vue'

export default function useSortedAndSearchedPosts(sortedPosts) {
  const searchQuery = ref('')
  const sortedAndSearchedPosts = computed(() => {
    // [...posts.value] - создает копию массива ... - разворот массива
    // (нужно, чтобы не менять исходный массив, а точнее - номера индексов)
    // Возвращаем this.sortedPosts, но фильтрованный по поисковой строке
    // .toLowerCase() - метод, который приводит все символы строки к нижнему регистру
    return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
  })

  return {
    searchQuery, sortedAndSearchedPosts
  }



};