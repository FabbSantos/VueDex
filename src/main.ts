import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'; // Importe o i18n que você acabou de criar


const app = createApp(App).use(i18n) // Adicione o i18n ao app

app.use(router)

app.mount('#app')
