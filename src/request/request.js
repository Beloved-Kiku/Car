//引入Axios 进行二次封装
import axios from "axios";
//引入遮罩层
import { Loading } from 'element-ui';
//引入通知
import { Message } from 'element-ui';
//引入路由
import router from '@/router/index'
const axiosHttp = axios.create({ baseURL: 'http://www.liulongbin.top:3008' })
    // 添加请求拦截器
let isLoading = Loading
console.log(Loading.service, 'loading');
let whiteUrl = ['/api/login', '/api/reg']
axiosHttp.interceptors.request.use(function(config) {
    //利用白名单 判断是否添加遮罩层实现节流效果
    const Reg = whiteUrl.includes(config.url)
    if (Reg) {
        isLoading.service({ text: '正在疯狂加载', spinner: "el-icon-loading", background: 'rgba(0,0,0,.5)' })
        return config
    }
    //config.$Loading.service()
    if (config.headers.Authorization === undefined) {
        config.headers.Authorization = `${localStorage.getItem('Token')}`
    }
    // 在发送请求之前做些什么
    return config;
}, function(error) {
    return Promise.reject(error);
});
//添加响应拦截器
axiosHttp.interceptors.response.use(function(response) {
    // 2xx 范围内的状态码都会触发该函数。 对响应数据做点什么
    let ResponseUrl = response.config.url
    if (whiteUrl.includes(ResponseUrl))
        return response;
}, function(error) {
    // 超出 2xx 范围的状态码都会触发该函数。 对响应错误做点什么
    if (error.response.status === 401) {
        Message.error({ message: 'Token过期,请重新登陆', duration: 2000 })
            //移除错误Token  路由跳转
        localStorage.removeItem('Token')
        router.replace('/Login')
        return error
    }
    return Promise.reject(error);
});
//设置请求最基本格式  若外面没有传递相应参数 则 选择默认
export default ({
    url,
    method = 'GET',
    data = {},
    params = {},
    headers = {}
}) => {
    //axios默认返回Promise对象 留在原地 需要返回给这个函数
    return axiosHttp({ url, method, data, params, headers })
}