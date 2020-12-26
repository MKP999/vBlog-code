import request from '../util/request'


/**
 * @desc 获取全部文章(获取对应的类型文章)
 * @access 接口公开
 * @param  
 */
export function getArticlesList (params: Object) {
    return request({
      url: '/articles/articles',
      method: 'get',
      params
    })
  }

  /**
 * @desc 搜索框 模糊查询标题
 * @access 接口公开
 * @param  
 */
export function getSearch (params: Object) {
    return request({
      url: '/articles/search',
      method: 'get',
      params
    })
  }

/**
 * @desc 获取文章列表中文章数、评论数、点赞数、分类文章数
 * @access 接口公开
 * @param  
 */
export function getArticlesData () {
    return request({
      url: '/articles/number',
      method: 'get'
    })
  }

/**
 * @desc 创建文章
 * @access 接口私有
 * @data  
 */
export function addArticle (data: Object) {
    return request({
      url: '/articles/article',
      method: 'post',
      data
    })
  }

    /**
 * @desc 获取单篇文章
 * @access 接口公开
 * @param  
 */
export function getArticle (params: Object) {
    return request({
      url: '/articles/article',
      method: 'get',
      params
    })
  }

    /**
 * @desc 修改文章
 * @access 接口私有
 * @data  
 */
export function updateArticle (data: Object) {
    return request({
      url: '/articles/article',
      method: 'put',
      data
    })
  }

      /**
 * @desc 点赞与取消点赞
 * @access 接口私有
 * @param  
 */
export function getLike () {
    return request({
      url: '/articles/like',
      method: 'post'
    })
  }

    /**
 * @desc 添加文章评论
 * @access 接口私有
 * @data  
 */
export function addArticleComment (data: Object) {
    return request({
      url: '/articles/comment',
      method: 'post',
      data
    })
  }


    /**
 * @desc 删除文章评论
 * @access 接口私有
 * @params  
 */
export function deleteArticleComment (params: Object) {
    return request({
      url: '/articles/comment',
      method: 'post',
      params
    })
  }