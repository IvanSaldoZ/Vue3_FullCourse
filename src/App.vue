<template>
  <div>
    <div class="post">
      <div><strong>Название:</strong> Пост о JavaScript</div>
      <div><strong>Описание:</strong> Описание поста</div>
    </div>
    <div class="post">
      <div><strong>Название:</strong> Пост о JavaScript</div>
      <div><strong>Описание:</strong> Описание поста</div>
    </div>
    <div class="post">
      <div><strong>Название:</strong> Пост о JavaScript</div>
      <div><strong>Описание:</strong> Описание поста</div>
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.post {
  padding: 15px;
  border: 2px solid green;
;
}
</style>
