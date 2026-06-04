import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/style.css'

createApp(App)
    .use(router)
    .mount('#app')


const redirect = sessionStorage.redirect;

if (redirect) {
    delete sessionStorage.redirect;

    const url = new URL(redirect);
    history.replaceState(
        null,
        '',
        url.pathname.replace('/stDashboard', '') + url.search + url.hash
    );
}