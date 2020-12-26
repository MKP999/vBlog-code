const Blogroll = require('../model/Blogroll')
// 表单验证
const validateBlogrollInput = require('../validation/blogroll')


/**
 * @route GET api/blogroll/test
 * @desc  测试
 * @access 接口是公开的
 */
exports.Test = async ctx => {
    ctx.body = { msg: 'Blogroll succeed ...' }
}

/**
 * @route GET api/blogroll/all
 * @desc  获取全部的友情连接
 * @access 接口是公开的
 */
exports.GetBlogroll = async ctx => {
  const total = await Blogroll.countDocuments()
  const res = await Blogroll.find().sort({date: -1})
    ctx.body = { success: true, total, data: res }
}

/**
 * @route POST api/blogroll/add
 * @desc  创建友情链接
 * @access 接口是私有的
 */
exports.AddBlogroll = async ctx => {
    // 验证注册表单
    const body = ctx.request.body
    const { error, isValid } = validateBlogrollInput(ctx.request.body)
    // isValid 判断error 是否为空 
    if (!isValid) {
        ctx.status = 400
        ctx.body = error
        return
    }


    const blogrollInfo = {}
    blogrollInfo.user = ctx.state.user._id
    // 初创建需要通过审核
    blogrollInfo.type = 0
    if (body.title) {
      blogrollInfo.title = body.title
    }
    if (body.avatar) {
      blogrollInfo.avatar = body.avatar
    }
    if (body.describe) {
      blogrollInfo.describe = body.describe
    }
    if (body.url) {
      blogrollInfo.url = body.url
    }

    // 存储
    const blogroll = await new Blogroll(blogrollInfo)

    await blogroll.save().then(item => {
        ctx.status = 200
        ctx.body = { success: true, data: item }
    }).catch(err => {
        ctx.status = 500
        ctx.body = { success: false, msg: '创建失败' }
        console.log(err)
    })
}

/**
 * @route PUT api/blogroll/update?id=123
 * @desc  修改友情链接类型（修改审核状态）
 * @access 接口是私有的
 */
exports.UpdateType = async ctx => {
  const id = ctx.query.id

  try {
    const blogroll = await Blogroll.findById(id)
    if (blogroll) {
      // 初创建需要通过审核
      blogroll.type = 1
      const updateBlogroll = await Blogroll.findByIdAndUpdate(
        {_id: id},
        {$set: blogroll},
        {new: true}
      )

      ctx.body = { success: true, data: updateBlogroll }
    }
    
  } catch (error) {
    console.log(error)
    ctx.status = 404
    ctx.body = { success: false, msg: '友情链接不存在' }
  }
}