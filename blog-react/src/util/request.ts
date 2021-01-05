import axios from 'axios'
import { getStorageFn } from "../util/storageFn"

// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:5000/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
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