const Router = require('koa-router')
const router = new Router()
// token验证
const passport = require('koa-passport')

const { Test, AddBlogroll, GetBlogroll, UpdateType } = require('../controller/blogroll')

// 路由守卫 角色鉴权
const { authorize } = require('../middleware/auth')

// /api/blogroll
router
    .get('/test', Test)
    .get('/all', GetBlogroll)
    .post('/add',  passport.authenticate('jwt', { session: false }), AddBlogroll)
    .put('/update',  passport.authenticate('jwt', { session: false }), authorize('admin'), UpdateType)

module.exports = router.routes()