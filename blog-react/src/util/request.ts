import axios from 'axios'
import { getStorageFn } from "../util/storageFn"
console.log(process.env.NODE_ENV)
let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  // 测试 开发环境
  baseURL = 'http://localhost:5000/api'
} else if (process.env.NODE_ENV === 'production') {
  // 线上 生产环境
  baseURL = 'http://8.129.105.136/api'
}

// create an axios instance
const service = axios.create({
  baseURL, // url = base url + request url 线上
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (getStorageFn('blog_login')) {
      config.headers.Authorization = getStorageFn('blog_login')
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

export default service