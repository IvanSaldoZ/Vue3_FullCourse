<template>
  <form @submit.prevent>
    <h4>Добавление поста</h4>
    <my-input
        v-model="post.title"
        placeholder="Описание"/>
    <my-input
        v-model="post.body"
        placeholder="Название"/>
    <my-button
        style="margin-top: 15px;"
        @click="createPost"
        >
      Добавить
    </my-button>
  </form>

</template>

<script>
  export default {
    data() {
      return {
        post: {
          title: "",
          body: ""
        }
      }
    },
    methods: {
      createPost() {
        // Генерим ID поста
        this.post.id = Date.now();
        // Генерирум событие, которое сможет отлавливать родительский
        // компонент при изменении этого (дочернего по отношению к App) компонента
        // Затем на это событие можно подписаться вверху
        this.$emit('create', this.post)
        this.post = {
          title: "",
          body: ""
        }
      }
    },
    // Наблюдаем за изменением свойств какой-либо модели
    watch: {
      post: {
        // Обработчик для отслеживания изменений модели post
        handler(newVal) {
          console.log(newVal)
        },
        // Включаем глубокое отслеживание (если обычный подход watch не работает)
        deep: true
      }
    }
  }
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}



</style>