const Router = require('koa-router')
const router = new Router()

const { Test, GetNews, GetJokes } = require('../controller/entertainment')

// /api/entertainment
router.get('/test', Test).get('/news', GetNews).get('/joke', GetJokes)

module.exports = router.routes()