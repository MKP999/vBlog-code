const Router = require('koa-router')
const router = new Router()
// token 验证 passport
const passport = require('koa-passport')

const { Test, CreateMessage, GetMessages, DeleteMessage } = require('../controller/message')

// 路由守卫 角色鉴权
const { authorize } = require('../middleware/auth')

// advanceResult 封装高级搜索中间件
const advanceResult = require('../middleware/advanceResult')
const Message = require('../model/Message')

// /api/messages
router
    .get('/test', Test)
    .get('/messages', advanceResult(Message) , GetMessages)
    .post('/message', CreateMessage)
    .delete('/message', passport.authenticate('jwt', { session: false }), authorize('admin'), DeleteMessage)

module.exports = router.routes()