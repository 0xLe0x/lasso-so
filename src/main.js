import { createApp } from 'vue'
import router from './router'
import urql from '@urql/vue';
import App from './App.vue'

import './css/style.css'


const app = createApp(App)
app.use(router)
app.use(urql, {url: 'https://local-api.topaly.xyz/'})
app.mount('#app')
