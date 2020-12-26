import request from '../util/request'

/**
 * @desc 获取全部留言
 * @access 接口公开
 * @param  
 */
export function getMessagesList (params: Object) {
    return request({
      url: '/messages/messages',
      method: 'get',
      params
    })
  }

  /**
 * @desc 创建留言
 * @access 接口公开
 * @data  
 */
export function addMessage (data: Object) {
  return request({
    url: '/messages/message',
    method: 'post',
    data
  })
}


  /**
 * @desc 删除留言
 * @access 接口私有
 * @params  
 */
export function deleteMessage (params: Object) {
  return request({
    url: '/messages/message',
    method: 'delete',
    params
  })
}

  /**
 * @desc 创建留言评论
 * @access 接口公开
 * @data  
 */
export function addMessageComment (params: Object, data: Object) {
  return request({
    url: '/messages/comment',
    method: 'post',
    params,
    data
  })
}