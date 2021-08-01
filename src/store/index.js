import {createStore} from "vuex";
import {postModule} from "@/store/postModule";

// Создаем хранилище с помощью функции create Store
export default createStore({
  // Залогинен ли пользователь - доступно везде в приложении
  state: {
    isAuth: false
  },
  // Модули - изолированный кусочек состояния со своими геттерами, мутациями, экшонами
  // Разные модули должны быть объединены в один глобальный стор
  modules: {
    post: postModule
  }
});
