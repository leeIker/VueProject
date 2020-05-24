/* eslint-disable eol-last */
/* eslint-disable indent */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import ZkTable from 'vue-table-with-tree-grid'

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://39.98.140.77'
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('userToken')
    return config
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

Vue.component('tree-table', ZkTable)

// eslint-disable-next-line space-before-function-paren
Vue.filter('dateFormat', function(originVal) {
    const date = new Date(originVal)
        // const yy = date.getFullYear() + '-'
        // const mm = date.getMonth() + '-'
        //  const d = date.getDate() + '-'
        // const hh = date.getHours() + '-'
        // const m = date.getMinutes + '-'
        // const S = date.getSeconds + ''
    const Strings = date.toLocaleString()
        // const time = yy + mm + d + hh + m + S
    return Strings
})