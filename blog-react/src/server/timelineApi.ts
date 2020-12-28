import request from '../util/request'

/**
 * @desc 查看时光轴
 * @access 接口公开
 * @param  
 */
export function getTimelineList () {
    return request({
      url: '/timeline/all',
      method: 'get'
    })
  }

  /**
 * @desc 添加时光轴
 * @access 接口私有
 * @data  
 */
export function addTimeline (data: Object) {
    return request({
      url: '/timeline/add',
      method: 'post',
      data
    })
  }