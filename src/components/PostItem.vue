<template>
  <div class="post">
    <div>
      <strong>ID:</strong> {{ post.id }}<br>
      <strong>Название:</strong> {{ post.title }}<br>
      <strong>Описание:</strong> {{ post.body }}</div>
    <div class="post__btns">
      <my-button
          @click="$router.push(`/posts/${post.id}`)"
      >
        Открыть
      </my-button>
      <my-button
          @click="$emit('remove', post)"
      >
        Удалить
      </my-button>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid green;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post__btns {
  display: flex;
}
</style>