<template>
  <div class="navbar">
    <div>
      <router-link to="/" class="title">Vue3</router-link>
    </div>
    <div class="navbar__btns">

      <my-button @click="$router.push('/posts')" style="margin-left: 20px;">Посты</my-button>
      <my-button @click="$router.push('/about')" style="margin-left: 20px;">О нас</my-button>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
export default {
  name: "NavBar",
  components: {MyButton}
}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
}
.title {
  color: white;
  text-decoration: none;
  font-size: x-large;
  font-family: Calibri, Trebuchet MS, Arial, serif;

}

</style>