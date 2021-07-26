<template>
  <form @submit.prevent>
    <h4>Добавление поста</h4>
    <input
        v-model="post.title"
        class="input"
        type="text"
        placeholder="Описание">
    <input
        v-model="post.body"
        class="input"
        type="text"
        placeholder="Название">
    <button
        class="btn"
        @click="createPost"
        >
      Добавить
    </button>
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
    }
  }
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}

.btn {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}

</style>