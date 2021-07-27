<template>
  <div v-show="posts.length > 0">
    <h3>Список постов</h3>
    <!-- @remove - это on_remove - это событие из дочернего компонента post-item по удалению поста -->
    <post-item v-for="post in posts"
               :post="post"
               :key="post.id"
               @remove="$emit('remove', post)"
    />
  </div>
  <h2 v-show="posts.length === 0" style="color: red">
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
    }
  }
</script>

<style scoped>

</style>