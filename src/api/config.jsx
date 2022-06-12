import axios from 'axios'
import NProgress from 'nprogress' // 顶部进度条
import cookie from 'react-cookies'

import Toast from '@/components/Toast';
import eventBus from '@/utils/eventBus'

const config = {
    timeout: 10000,
    // baseURL: import.meta.env.VITE_APP_BASE_API,
    baseURL: import.meta.env.VITE_APP_BASE_API,
}

export const $http = (params) => {
    NProgress.start()
    const { url, method, data } = params

    let req = method === "get" ? {
        params: {
            ...data
        },
    } :
        {
            data: {
                ...data
            },

        }
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: method || 'get',
            ...req,
            headers: {
                UserId: cookie.load('userId') || '',
                UserToken: cookie.load('userToken') || ''
            },
            ...config
        })

            .then(function (response) {
                NProgress.done()
                resolve(response)
            })
            .catch(function (error) {
                NProgress.done()
                reject(error)
            });
    })
}

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    switch (response.data.status) {
        case 401:
            Toast.error(response.data.msg)
            eventBus.emit("LoginTimeout", false)
            return;
        // case 401:
        //     Toast.error("登录已过期")
        //     eventBus.emit("LoginTimeout", false)
        //     return;
        default:
            return response;
    }
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});