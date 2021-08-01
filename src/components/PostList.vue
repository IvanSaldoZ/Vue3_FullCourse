<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <!-- Анимация списков: https://v3.ru.vuejs.org/ru/guide/transitions-list.html -->
    <transition-group name="posts-list">
      <!-- @remove - это on_remove - это событие из дочернего компонента post-item по удалению поста -->
      <post-item v-for="post in posts"
                 :post="post"
                 :key="post.id"
                 @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h2 v-else style="color: red">
    Список постов пуст!
  </h2>
</template>

<script>
  import PostItem from "./PostItem";
  export default {
    components: {PostItem},
    props: {
      posts: {
        type: Array,
        required: true,
      }
    },
    beforeCreate() {
      console.log(this.posts)
    }
  }
</script>

<style scoped>
/* https://v3.ru.vuejs.org/ru/guide/transitions-list.html#анимации-добавления-и-удаления-элементов-списка */
/* Анимация добавления-удаления */
.posts-list-item {
  display: inline-block;
  margin-right: 10px;
}
.posts-list-enter-active,
.posts-list-leave-active {
  transition: all 0.4s ease;
}
.posts-list-enter-from,
.posts-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

/* Анимация при сортировке */
.posts-list-move {
  transition: transform 0.4s ease;
}

</style>