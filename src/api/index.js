//引入二次封装的axios
import axiosHttp from '@/request/request'
//注册接口 解构赋值出需要的参数
export const RegUserApi = ({ username, password, repassword }) => {
        return axiosHttp({
            url: '/api/reg',
            method: 'POST',
            data: {
                username,
                password,
                repassword
            }
        })
    }
    //用户登录接口
export const LoginApi = ({ username, password }) => {
        return axiosHttp({
            url: '/api/login',
            method: 'POST',
            data: {
                username,
                password
            }
        })
    }
    //用户基本信息
export const UserInfoApi = () => {
        return axiosHttp({
            url: '/my/userinfo',
            method: 'GET'
        })
    }
    //首页左侧列表接口
export const HomeLeftApi = () => {
    return axiosHttp({
        url: '/my/menus',
        method: 'GET'
    })
}