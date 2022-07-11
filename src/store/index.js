import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router';
Vue.use(Vuex)
    //引入注册接口
import { RegUserApi } from '@/api'
//引入登录接口
import { LoginApi } from "@/api";
//用户信息接口
import { UserInfoApi } from "@/api";
//引入 首页左侧列表接口
import { HomeLeftApi } from '@/api'
//接收实例this
let _this = null
console.log(_this);
export default new Vuex.Store({
    state: {
        USER_TOKEN: '',
        USER_INFO_LIST: {},
        USER_PIC: 'https://pic.imgdb.cn/item/62bc73be1d64b07066f3d5d2.jpg',
        HOME_LEFT_LIST: {}
    },
    actions: {
        //传递This
        VueThis(a, data) {
            //将this 给Vuex中的变量  便于之后调用this 使用Element
            _this = data
        },
        //注册APi
        async RegApi({
            commit
        }, data) {
            const res = await RegUserApi(data);
            // console.log(res.data.message); 注册成功回调
            if (res.data.code === 0) {
                _this.$message({ showClose: true, message: res.data.message, type: 'success' })

                router.push('/home')
            }
            //注册失败的回调
            if (res.data.code === 1) {
                _this.$message({ showClose: true, message: res.data.message, type: 'warning' })
                router.push('/Login')
            } else {
                _this.$message({ showClose: true, message: `${res.data.message},用户名重复`, type: 'error' })
            }
        },
        //登录Api
        async LoginApi({
            commit
        }, data) {
            const res = await LoginApi(data)
                //暂存用户输入内容
            const userMsg = {
                    username: data.username,
                    password: data.password
                }
                //登录成功的回调 且用户点击了保存密码的回调
            if (res.data.code === 0 && data.checked) {
                _this.$message({ showClose: true, message: res.data.message, type: 'success' })
                    //存储用户Token 存储用户信息
                localStorage.setItem('userMessage', window.btoa(JSON.stringify(userMsg)))
                commit('Token', res.data.token)
                router.push('/home')
            }
            //若用户未点击保存密码的回调
            if (res.data.code === 0) {
                _this.$message({ showClose: true, message: res.data.message, type: 'success' })
                    //存储用户Token
                commit('Token', res.data.token)
                router.push('/home')
            }
            if (res.data.code === 1) {
                return _this.$message({ showClose: true, message: res.data.message, type: 'error' })

            }
        },
        //用户信息
        async getMsg({ state, commit }) {
            const res = await UserInfoApi()
                //首次登录若后台没有返回头像 则用自己给的默认的
            if (res.data.code === 0 && res.data.data.user_pic === null) {
                res.data.data.user_pic = state.USER_PIC
                commit('UserINFO', res.data.data)
            }
            if (res.data.code === 0) {
                commit('UserINFO', res.data.data)
            } else {
                return _this.message({ type: 'error', message: '出错了请重试' })
            }
        },
        //首页左侧列表数据
        async getLeftList({ commit }) {
            const res = await HomeLeftApi()
            if (res.data.code === 0) {
                commit('HomeLeftList', res.data.data)
            }
        }
    },
    mutations: {
        //登录成功 存储Token
        Token(state, TOKEN) {
            state.USER_TOKEN = TOKEN
            localStorage.setItem('Token', state.USER_TOKEN)
        },
        UserINFO(state, USERINFO) {
            state.USER_INFO_LIST = USERINFO
        },
        HomeLeftList(state, HOMELEFTLIST) {
            state.HOME_LEFT_LIST = HOMELEFTLIST
        }
    },
})