import Vue from 'vue'
import axios from 'axios'
import { MessageBox } from 'element-ui'
let service = axios.create({
    timeout: 5000,
    // 前缀
    baseURL: '/api'
});
export const TOKEN_KEY = 'RX_USER_TOKEN'
// @ todo 拦截器 管理token 
export default ({store, redirect}) => {
    // 请求拦截
    service.interceptors.request.use(
        config => {
            // 请求加 token
            const token = window.localStorage.getItem(TOKEN_KEY);
            console.log('token', token);
            // 设置 url 白名单 普通页面不需要添加 Authorization
            if (token) {
                config.headers.common['Authorization'] = 'Bearer' + token;
            }
            return config
        },
        err => {
            return Promise.reject(err)
        }
    )
    // 响应拦截
    service.interceptors.response.use(
        async response => {
            let { data, config } = response;
            console.log('响应拦截', response);
            // 写 token，也可以写在 login 的逻辑里
            if (data.code === 0) {
                if (config.url === '/api/user/login') {
                    localStorage.setItem(TOKEN_KEY, data.data.token)
                }
            } else if (data.code === -666) {
                // code 是 -666，意味着 token 过期
                MessageBox.confirm('登录过期了', '过期', {
                    confirmButtonText: '登录',
                    showCancelButton: false,
                    type: 'warning'
                }).then(() => {
                    localStorage.removeItem(TOKEN_KEY);
                    redirect({ path: '/login' })
                })
                console.log('拦截器知道 token 过期了')
            } else if (data.code === -999) {
                // code 是 -999，意味着 用户未登录
                MessageBox.confirm('尚未登录', '未登录', {
                    confirmButtonText: '登录',
                    showCancelButton: false,
                    type: 'warning'
                }).then(() => {
                    redirect({ path: '/login' })
                })
            }
            return data;
        },
        err => {
            return Promise.reject(err)
        }
    )
}
// 设置 token 管理和路由跳转

Vue.prototype.$http = service
export const http = service
// export TOKEN_KEY