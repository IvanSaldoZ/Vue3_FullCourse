<template>
  <!-- Навигационная панель -->
  <nav-bar/>

 <div class="app">
   <!-- Компонент - маршрутизатор из файла router/router.js -->
   <router-view></router-view>

 </div>
</template>

<script>
 import NavBar from "@/components/UI/NavBar";
 export default {
   components: {NavBar}
 }
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

</style>