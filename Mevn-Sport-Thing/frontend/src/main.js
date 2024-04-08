import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import store from '@/stores'
//gets stuff from local storage
store.dispatch('rehydrateAuthenticationState');
const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(store)

app.mount('#app')
