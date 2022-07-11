import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
    // 防止路由Promise报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
        return originalPush
            .call(this, location)
            .catch(err => err)
    }
    //路由 懒加载
const Login = () => {
    return import ('@/views/Login')
}
const Reg = () => {
    return import ('@/views/Reg')
}

const home = () => {
    return import ('@/views/home')
}
const Main = () => {
    return import ('@/views/home/Main')
}
const Menus = () => {
    return import ('@/views/home/Menus')
}
const ArtCate = () => {
    return import ('@/views/home/Menus/art-cate')
}
const router = new VueRouter({
        routes: [{
            path: '/Reg',
            component: Reg
        }, {
            redirect: '/',
            path: '/home',
            component: home,
            children: [{
                path: '',
                components: {
                    Main,
                    Menus,
                    ArtCate
                }
            }, ]
        }, {
            path: '/Login',
            component: Login
        }]
    })
    //创建全局路由守卫 判断用户是否携带Token进入 如果用户没有Token 则只能取登录或者注册页面 白名单形式 完成路由跳转
const whiteList = ['/Login', '/Reg']
router.beforeEach((to, from, next) => {
    next()
    if (!localStorage.getItem('Token') && !whiteList.includes(to.path)) {
        next('/Login')
    } else {
        next()
    }
})
export default router