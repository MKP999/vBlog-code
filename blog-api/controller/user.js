const User = require('../model/User')
// 引入密码加密插件
const tools = require('../config/tools')
const bcrypt = require('bcryptjs')
// 全局配置变量
const config = require('../config/config')
// 引入全球公认头像
const gravatar = require('gravatar')
// 引入生成token插件
const jwt = require('jsonwebtoken')
// 引入 表单验证
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')
const { findById, findByIdAndUpdate } = require('../model/User')


/**
 * @route GET api/users/test
 * @desc  测试
 * @access 接口是公开的
 */
exports.Test = async ctx => {
    ctx.body = { msg: 'test succeed ...' }
}

/**
 * @route POST api/users/register
 * @desc  注册接口
 * @access 接口是公开的
 */
exports.Register = async ctx => {
    // 验证注册表单
    console.log(ctx.request.body)
    const { error, isValid } = validateRegisterInput(ctx.request.body)
    // isValid 判断error 是否为空 
    if (!isValid) {
        ctx.status = 400
        ctx.body = error
        return
    }

    const { username, password, email, wechat, phone, role } = ctx.request.body
    // 根据email查找是否存在该用户
    const user = await User.find({email})
    // 判断是否已经注册
    if (user.length > 0) {
        ctx.status = 500
        ctx.body = { success: false, msg: '用户已注册, 邮箱已存在'}
    } else {
        // 密码加密
        ctx.request.body.password = tools.enbcrypt(password)
        // 使用全球公认头像
        ctx.request.body.avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'})
        // 信息存储
        const user = await User.create(ctx.request.body)
        const payload = {
            _id: user.id, username, email, wechat, phone, avatar: ctx.request.body.avatar, role
        }
        // 生成token
        const token = jwt.sign({
            data: payload
          }, config.secretOrKeys, { expiresIn: '1h' })
        ctx.body = {success: true, token: 'Bearer ' + token}
        // 客户端 cookies缓存token
        ctx.cookies.set('token', 'Bearer ' + token)
    }
}

/**
 * @route POST api/users/login
 * @desc  登录
 * @access 接口是公开的
 */
exports.Login = async ctx => {
    console.log(ctx.request.body)
    // 验证登录 表单
    const { error, isValid } = validateLoginInput(ctx.request.body)
    // isValid 判断error 是否为空 
    if (!isValid) {
        ctx.status = 400
        ctx.body = error
        return
    }

    const { email, password } = ctx.request.body
    const user = await User.find({email}).select('+password')
    // 判断是否查找到该用户
    if (user.length > 0) {
        // 解密 判断密码是否正确
        const cheackPassword = await bcrypt.compareSync(password, user[0].password);
        if (cheackPassword) {
            const payload = {
                _id: user[0].id,
                username: user[0].username, 
                email: user[0].email,
                wechat: user[0].wechat,
                phone: user[0].phone, 
                avatar: user[0].avatar,
                role: user[0].role
            }
            // 生成token
            const token = jwt.sign({
                data: payload
            }, config.secretOrKeys, { expiresIn: '1h' })
            ctx.body = {success: true, token: 'Bearer ' + token}
            // 客户端 cookies缓存token
            ctx.cookies.set('token', 'Bearer ' + token)
        } else {
            ctx.status = 200
            ctx.body = { success: false, msg: '密码错误'}
        }
    } else {
        ctx.status = 200
        ctx.body = { success: false, msg: '用户不存在, 请先注册'}
    }
}

/**
 * @route GET api/users/current
 * @desc  获取当前账户信息接口
 * @access 接口是私有的
 */
exports.Current = async ctx => {
    if (ctx.state.user) {
        ctx.body = { success: true, data: ctx.state.user}
    }
}

/**
 * @route GET api/users/all
 * @desc  获取所有用户接口
 * @access 接口是私有的
 */
exports.All = async ctx => {
    ctx.body = ctx.advancedResults
}

/**
 * @route GET api/users?:id
 * @desc  获取单个用户信息接口
 * @access 接口是私有的
 */
exports.GetUser = async ctx => {
    const id = ctx.query.id
    await User.findById(id)
    .then(user => {
        ctx.status = 200
        ctx.body = { success: true, data: user}
      })
      .catch(err => {
        ctx.status = 404
        ctx.body = { success: false, msg: '用户不存在'}
      })
}

/**
 * @route PUT api/users?:id
 * @desc  修改单个用户信息
 * @access 接口是私有的
 */
exports.UpdateUser = async ctx => {
    console.log(ctx.request.body)
    const body = ctx.request.body

    const userInfo = {}

    if (body.username) {
        userInfo.username = body.username
    }
    if (body.email) {
        userInfo.email = body.email
    }
    if (body.wechat) {
        userInfo.wechat = body.wechat
    }
    if (body.phone) {
        userInfo.phone = body.phone
    }

    const id = ctx.query.id
    // 获取当前用户信息
    const user = ctx.state.user
    // 判断该id 是否有用户信息
    try {
        const cheackUser = await User.findById(id)
        if (cheackUser) {
            // 判断是否为admin 是则可以修改全部user 否则只能修改自己的
            if (user.role === 'admin') {
                const updateUser = await  User.findByIdAndUpdate(
                    {_id: id},
                    {$set: userInfo},
                    {new: true}
                )
                ctx.body = {success: true, data: updateUser}
            } else {
                // 判断是否修改自己的信息
                if (user._id.toString() === id) {
                    const updateUser = await  User.findByIdAndUpdate(
                        {_id: id},
                        {$set: userInfo},
                        {new: true}
                    )
                    ctx.body = {success: true, data: updateUser}
                } else {
                    ctx.status = 403
                    ctx.body = { msg: '无权限访问该路由'}
                }
            }
        }
    } catch(err) {
        ctx.status = 404
        ctx.body = { success: false, msg: '用户不存在'}
    }
}
