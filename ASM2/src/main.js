import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//import css and js for bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
//import custom css
import './style.css'

const app = createApp(App)
app.use(router)
app.mount('#app')