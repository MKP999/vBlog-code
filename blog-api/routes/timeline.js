const Router = require('koa-router')
const router = new Router()
// token验证
const passport = require('koa-passport')

const { Test, GetTimeline, AddTimeline } = require('../controller/timeline')

// /api/timeline
router
    .get('/test', Test)
    .get('/all', GetTimeline)
    .post('/add',  passport.authenticate('jwt', { session: false }), AddTimeline)

module.exports = router.routes()