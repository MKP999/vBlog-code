import request from '../util/request'


/**
 * @desc 获取段子 
 * @access 接口公开
 * @param  
 */
export function getJoke (params: Object) {
    return request({
      url: '/entertainment/joke',
      method: 'get',
      params
    })
  }
  