/* eslint-disable key-spacing */
/* eslint-disable space-in-parens */
/* eslint-disable func-call-spacing */
/* eslint-disable indent */
/* eslint-disable eol-last */
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import users from '../components/users.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: login
    },
    {
        path: '/home',
        component: home,
        redirect: '/welcome',
        children: [
            { path: '/welcome', component: welcome },
            { path: '/1-4-1', component: users }
        ]

    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path === '/') return next()
    const token = window.sessionStorage.getItem('userToken')
    if (!token) return next('/')
    next()
})
export default router