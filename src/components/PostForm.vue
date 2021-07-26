<template>
  <form @submit.prevent>
    <h4>Добавление поста</h4>
    <input
        v-bind:value="post.title"
        @input="post.title = $event.target.value"
        class="input"
        type="text"
        placeholder="Описание">
    <input
        v-bind:value="post.body"
        @input="post.body = $event.target.value"
        class="input"
        type="text"
        placeholder="Название">
    <button
        class="btn"
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