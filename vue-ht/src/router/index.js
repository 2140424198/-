import Vue from "vue";
import VueRouter from 'vue-router'
// import Home from '@/views/Home'
// import User from '@/views/User'

Vue.use(VueRouter)

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
    // 此函数上下文(this指向)为VueRouter的一个实例
    if (resolve && reject) {    //如果我们自己指定了成功/失败的回调，则自己传入
        originPush.call(this, location, resolve, reject)
        //若此时直接使用originPush()方法，则函数内的this指向window（内部代码将无法执行）。故应用call或apply方法修改this指向
    } else {    //如果我们没有指定成功/失败的回调，则自动帮我们生成，防止报错
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('@/views/Main.vue'),
        redirect:'/home',
        children: [
        //     {
        //         path: '/home',
        //         name: 'home',
        //         component: () => import('@/views/home/index.vue')
        //     },
        //     {
        //         path: '/user',
        //         name: 'user',
        //         component: () => import('@/views/User/User.vue')
        //     },
        //     {
        //         path: '/mall',
        //         name: 'mall',
        //         component: () => import('@/views/mall/index.vue')
        //     },
        //     {
        //         path: '/page1',
        //         name: 'page1',
        //         component: () => import('@/views/other/pageOne.vue')
        //     },
        //     {
        //         path: '/page2',
        //         name: 'page2',
        //         component: () => import('@/views/other/pageTwo.vue')
        //     },

        ]
    },
    {
        path:'/login',
        name:"login",
        component:()=>import('@/views/login/login.vue')
    }
]


const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
