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
      posts: [
        {id: 1, title: 'Какой язык лучше: JavaScript или PHP?', body: 'Ответ на этот вопрос в этой статье'},
        {id: 2, title: 'Какой язык лучше: 2', body: 'Ответ на этот вопрос в этой статье 2'},
        {id: 3, title: 'Какой язык лучше: 3', body: 'Ответ на этот вопрос в этой статье 3'},
      ],
    }
  },
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
  margin-top: 15px;
}
</style>
