const Message = require('../model/Message')
const validateMessageInput = require('../validation/message')

/**
 * @route GET api/messages/test
 * @desc  测试
 * @access 接口是公开的
 */
exports.Test = async ctx => {
    ctx.body = { msg: 'messages succeed ...' }
}

/**
 * @route GET api/messages/messages
 * @desc  查看全部留言
 * @access 接口是公开的
 */
exports.GetMessages = async ctx => {
    ctx.body = ctx.advancedResults
}

/**
 * @route POST api/messages/message
 * @desc  创建留言
 * @access 接口是公开的
 */
exports.CreateMessage = async ctx => {
    const body = ctx.request.body
    // 验证留言表单
    const { error, isValid } = validateMessageInput(body)
    if (!isValid) {
        ctx.status = 400
        ctx.body = error
        return
    }
    
    const messageInfo = {}
    
    if (body.name) {
        messageInfo.name = body.name
    }
    if (body.email) {
        messageInfo.email = body.email
    }
    if (body.content) {
        messageInfo.content = body.content
    }

    // 存储
    const message = await new Message(messageInfo)

    await message.save().then(message => {
        ctx.status = 200
        ctx.body = { success: true, data: message }
    }).catch(err => {
        ctx.status = 500
        ctx.body = { success: false, msg: '创建失败' }
        console.log(err)
    })
}



/**
 * @route DELETE api/messages/message?:id
 * @desc  删除留言
 * @access 接口是私有的
 */
exports.DeleteMessage = async ctx => {
    try {
        const id = ctx.query.id
        const message = await Message.findById(id)
        if (message) {
            if (ctx.state.user.role === 'admin') {
                await Message.findByIdAndDelete(id)
                ctx.status = 200
                ctx.body = { success: true, data: [] }
            } else {
                ctx.status = 403
                ctx.body = { success: false, msg: '该用户无权限访问此路由' }
            }
        }
    } catch(err) {
        ctx.status = 404
        ctx.body = { success: false, msg: '留言不存在' }
    }
}