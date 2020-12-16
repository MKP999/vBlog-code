import request from '../util/request'

// 获取新闻列表
export function getNewsList (params: Object) {
  return request({
    url: '/entertainment/news',
    method: 'get',
    params
  })
}

// 登录
export function login (data: Object) {
    return request({
      url: '/users/login',
      method: 'post',
      data
    })
  }

  // 获取当前用户信息
export function getInfo () {
    return request({
      url: '/users/current',
      method: 'get'
    })
  }
    
