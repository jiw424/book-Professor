import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

// 响应拦截器
axios.interceptors.response.use(
    res => res.data,  // 拦截到响应对象，将响应对象的 data 属性返回给调用的地方
    err => Promise.reject(err)
)

const http = {
    post: '',
    get: '',
    put: '',
    del: ''
}

http.post = function (api, data) {
    return new Promise((resolve, reject) => {
        axios.post(api, data).then(response => {
            resolve(response)
        })
    })
}

http.get = function (api, data) {
    return new Promise((resolve, reject) => {
        axios.get(api, data).then(response => {
            resolve(response)
        })
    })
}

export default http