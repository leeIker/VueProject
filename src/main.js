/* eslint-disable eol-last */
/* eslint-disable indent */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://39.98.140.77/'
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('userToken')
    return config
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')