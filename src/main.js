import { createApp } from 'vue'
import App from './App'

//Импортируем UI-компоненты
import components from '@/components/UI';


// Создаем экземпляр приложения и помещаем его в переменную app
const app = createApp(App)

// Регистрируем в приложении каждый компонент из массива components
components.forEach(component => {
  app.component(component.name, component)
})

// Запускаем приложение в div с классом app (см. index.html-файл)
app.mount('#app')
