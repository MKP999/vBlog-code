const Router = require('koa-router')
const router = new Router()
// token 验证 passport
const passport = require('koa-passport')
const { Test, Login, Register, Current, All, GetUser, UpdateUser } = require('../controller/user')

// 路由守卫 角色鉴权
const { authorize } = require('../middleware/auth')

// advanceResult 封装高级搜索中间件
const advanceResult = require('../middleware/advanceResult')
const User = require('../model/User')

// /api/users
router
    .get('/test', Test)
    .post('/login', Login)
    .post('/register', Register)
    .get('/current', passport.authenticate('jwt', { session: false }), Current)
    .get('/all', passport.authenticate('jwt', { session: false }), authorize('admin'), advanceResult(User), All)
    .get('/', passport.authenticate('jwt', { session: false }), GetUser)
    .put('/', passport.authenticate('jwt', { session: false }), UpdateUser)

module.exports = router.routes()