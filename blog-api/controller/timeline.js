const Timeline = require('../model/Timeline')
// 表单验证
const validateTimelineInput = require('../validation/timeline')


/**
 * @route GET api/timeline/test
 * @desc  测试
 * @access 接口是公开的
 */
exports.Test = async ctx => {
    ctx.body = { msg: 'timeline succeed ...' }
}

/**
 * @route GET api/timeline/all
 * @desc  获取时光轴
 * @access 接口是公开的
 */
exports.GetTimeline = async ctx => {
  const total = await Timeline.countDocuments()
  const res = await Timeline.find().sort({date: -1})
    ctx.body = { success: true, total, data: res }
}

/**
 * @route POST api/timeline/add
 * @desc  创建时光轴
 * @access 接口是私有的
 */
exports.AddTimeline = async ctx => {
    // 验证注册表单
    console.log(ctx.request.body)
    const body = ctx.request.body
    const { error, isValid } = validateTimelineInput(ctx.request.body)
    // isValid 判断error 是否为空 
    if (!isValid) {
        ctx.status = 400
        ctx.body = error
        return
    }

    // const { user, title, content, color, time } = ctx.request.body

    const timelineInfo = {}
    timelineInfo.user = ctx.state.user._id
    if (body.title) {
      timelineInfo.title = body.title
    }
    if (body.content) {
      timelineInfo.content = body.content
    }
    if (body.color) {
      timelineInfo.color = body.color
    }

    // 存储
    const timeline = await new Timeline(timelineInfo)

    await timeline.save().then(item => {
        ctx.status = 200
        ctx.body = { success: true, data: item }
    }).catch(err => {
        ctx.status = 500
        ctx.body = { success: false, msg: '创建失败' }
        console.log(err)
    })
}