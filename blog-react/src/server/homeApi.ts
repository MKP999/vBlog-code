import request from '../util/request'

/**
 * @desc 获取新闻列表
 * @access 接口公开
 * @param  
 */
export function getNewsList (params: Object) {
  return request({
    url: '/entertainment/news',
    method: 'get',
    params
  })
}


/**
 * @desc 登录
 * @access 接口公开
 * @data  
 */
export function login (data: Object) {
    return request({
      url: '/users/login',
      method: 'post',
      data
    })
  }
  

/**
 * @desc  获取当前用户信息
 * @access 接口私有
 */
export function getInfo () {
    return request({
      url: '/users/current',
      method: 'get'
    })
  }

  
/**
 * @desc 注册
 * @access 接口公开
 * @data  
 */
export function register (data: Object) {
  return request({
    url: '/users/register',
    method: 'post',
    data
  })
}


