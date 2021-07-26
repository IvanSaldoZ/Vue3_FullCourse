<template>
  <div>
    Работает!

    <div>
      Количество лайков <strong>{{ likes }}</strong>
      <br>
      Количество дизайлков <strong>{{ dislikes }}</strong>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      likes: 0,
      dislikes: 5,
    }
  }
}


</script>

<style>
</style>
