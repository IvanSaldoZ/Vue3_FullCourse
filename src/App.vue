<template>
  <div>
    Работает!

    <div>
      <button @click="addLike">
        Like
      </button>
      <button @click="addDislike">
        Dislike
      </button>
    </div>

    <div>
      Количество лайков <strong>{{ likes }}</strong>
      <br>
      Количество дизайлков <strong>{{ dislikes }}</strong>
    </div>
  </div>
</template>

<script>

export default {
  //Модель
  data() {
    return {
      likes: 0,
      dislikes: 0,
    }
  },
  // Функции для изменения компонентов
  methods: {
    //Метод для увеличения лайков
    addLike() {
      this.likes += 1;
    },
    //Метод для увеличения дизлайков
    addDislike() {
      this.dislikes += 1;
    },

  }
}


</script>

<style>
</style>
