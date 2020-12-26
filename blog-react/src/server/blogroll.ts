import request from '../util/request'

/**
 * @desc 获取全部友情链接
 * @access 接口公开
 * @param  
 */
export function getBlogrollList () {
    return request({
      url: '/blogroll/all',
      method: 'get'
    })
  }

  /**
 * @desc 添加友情链接
 * @access 接口私有
 * @data  
 */
export function addBlogroll (data: Object) {
    return request({
      url: '/blogroll/add',
      method: 'post',
      data
    })
  }

  /**
 * @desc 修改友情链接审批状态
 * @access 接口私有
 * @data  
 */
export function updateBlogroll () {
    return request({
      url: '/blogroll/update',
      method: 'put'
    })
  }