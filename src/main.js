import { createApp } from 'vue'
import router from './router'
import client from './client';
import store from "./store/index";
import App from './App.vue'

import './css/style.css'


const app = createApp(App)
app.use(router)
app.use(client) 
app.use(store)
app.mount('#app')
