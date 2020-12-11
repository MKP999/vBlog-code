const Router = require('koa-router')
const router = new Router()
// token 验证 passport
const passport = require('koa-passport')

const { Test, GetArticle, GetArticles, CreateArticle, UpdateArticle, ToggleLike, CreateComment, DeleteComment } = require('../controller/article')

// advanceResult 封装高级搜索中间件
const advanceResult = require('../middleware/advanceResult')
const Article = require('../model/Article')

// /api/articles
router
    .get('/test', Test)
    .get('/article', GetArticle)
    .get('/articles', advanceResult(Article), GetArticles)
    .post('/article', passport.authenticate('jwt', { session: false }), CreateArticle)
    .put('/article', passport.authenticate('jwt', { session: false }), UpdateArticle)
    .post('/like', passport.authenticate('jwt', { session: false }), ToggleLike)
    .post('/comment', passport.authenticate('jwt', { session: false }), CreateComment)
    .delete('/comment', passport.authenticate('jwt', { session: false }), DeleteComment)

module.exports = router.routes()