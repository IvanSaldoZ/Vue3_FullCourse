import {ref, computed} from 'vue'

export default function useSortedPosts(posts) {
  const selectedSort = ref('')
  const sortedPosts = computed(() => {
    // [...this.posts] - создает копию массива ... - разворот массива
    // (нужно, чтобы не менять исходный массив, а точнее - номера индексов)
    return [...posts.value].sort((post1, post2) => {
      // Сравниваем называние одного поста с названием другого через метод localeCompare
      // this.selectedSort - выбранный метод сортировки (title или body)
      return post1[selectedSort.value]?.localeCompare(post2[selectedSort.value])
    })
  })

  return {
    selectedSort, sortedPosts
  }



};