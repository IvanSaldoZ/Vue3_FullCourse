<template>
  <h3>Список постов</h3>
  <post-item v-for="post in posts"
             :post="post"/>
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
.post {
  padding: 15px;
  border: 2px solid green;
  margin-top: 15px;
}
</style>