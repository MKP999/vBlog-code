const Message = require('../model/Message')
const validateMessageInput = require('../validation/message')
const validateCommentInput = require('../validation/comment')

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
        const qq = body.email.slice(0, -7)
        messageInfo.avatar = `http://q1.qlogo.cn/g?b=qq&nk=${qq}&s=100`
    }

    if (body.content) {
        messageInfo.content = body.content
    }
    messageInfo.date = new Date().getTime()

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

/**
 * @route POST api/messages/comment?:id
 * @desc  创建留言评论
 * @access 接口是公开的
 */
exports.CreateComment = async ctx => {
    const id = ctx.query.id
    const body = ctx.request.body

    // 验证评论表单
    const { error, isValid } = validateCommentInput(body)
    if (!isValid) {
        ctx.status = 400
        ctx.body = error
        return
    }

    // 判断留言是否存在
    try {
        const message = await Message.findById(id)
        if (message) {
            const commentInfo = {
                name: body.name,
                email: body.email,
                content: body.content
            }
            console.log('commentInfo => ', commentInfo)
            message.comments.push(commentInfo)
            // 更新 缓存
            const updateMessage = await Message.findByIdAndUpdate(
                {_id: id},
                {$set: message},
                {new:true}
            )
            ctx.body = {success: true, data: updateMessage}
        }
    } catch (error) {
        ctx.status = 404
        ctx.body = { success: false, msg: '留言不存在'}
        console.log(error)
    }
}