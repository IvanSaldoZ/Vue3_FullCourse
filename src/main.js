// Загружаем основное приложение
import { createApp } from 'vue'
import App from './App'

// Импортируем наши UI-компоненты
import components from '@/components/UI';
import router from "@/router/router";

// Импортируем наши директивы (которые мы создали)
import directives from "@/directives";

// Создаем экземпляр приложения и помещаем его в переменную app
const app = createApp(App)

// Регистрируем в приложении каждый компонент из массива components
components.forEach(component => {
  app.component(component.name, component)
})

// Регистрируем в приложении наши директивы
// Например,  вызвать v-intersection у элемента, за которым мы хотим наблюдать
directives.forEach(directive => {
  app.directive(directive.name, directive)
  }
)

// Запускаем приложение в div с классом app (см. index.html-файл)
// router - маршрутизатор для добавления постраничной навигации
app
  .use(router)
  .mount('#app')
