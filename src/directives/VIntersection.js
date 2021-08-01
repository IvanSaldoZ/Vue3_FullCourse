// Возвращаем директиву для динамической подгрузки страниц (v-intersection)
export default {
  mounted(el, binding) {
    // console.log(el, binding);
    // Запускаем наблюдателя за блоком div observer, при скролле которого подгружаются новые посты
    // https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    };
    const callback = (entries, observer) => {
      // Коллбек, который отработает, когда происходит пересечение
      // При условии, что текущая страница меньше, чем общее число страниц
      if (entries[0].isIntersecting
        // При директивах объекта this не существет, но их можно передавать через binding
        // && this.page < this.totalPages
      ) {
        // Раньше подгружали посты при достижении данной директивы...
        //this.loadMorePosts();
        //, а теперь будет выполнять ту функцию, которую передал пользователь
        binding.value()
      }
    };
    const observer = new IntersectionObserver(callback, options);
    // Вызываем наблюдателя и указываем объект (DOM-элемент), за которым ему надо следить (через ref="observer" выше)
    // Было - наблюдали за ref="observer", а теперь - за переданным элментом
    //observer.observe(this.$refs.observer);
    observer.observe(el);

  },
  name: 'intersection'
}