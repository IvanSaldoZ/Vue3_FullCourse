<template>
  <div class="post">
    <div><strong>Название:</strong> {{ post.title }}<br>
      <strong>Описание:</strong> {{ post.body }}</div>
    <div class="post__btns">
      <my-button>Удалить</my-button>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
export default {
  components: {
    MyButton
  },
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
</style>