const koa = require('koa')
const Router = require('koa-router')
const router = new Router()
const bodyParser = require('koa-bodyparser')
const colors = require('colors')
const mongoose = require('mongoose')
// 允许跨域
const cors = require('koa2-cors')
// token 验证
const passport = require('koa-passport')
// 引入压缩
const compress = require('koa-compress')
// koa-static 访问静态资源
const static = require('koa-static')
const path = require('path')
const fs = require('fs')

const app = new koa()

// 静态资源
app.use(static('client/dist'))

// 引入MongoDB url
const db = require('./blog-api/config/config').mongoURL
// 连接MongoDB数据库
// 连接数据库
mongoose.connect(db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      }).then(() => {
    console.log('mongoose connected ...'.red.bold)
  }).catch(err => {
    console.log(err)
  })

// 开启gzip
app.use(compress({threshold: 2048}))
app.use(bodyParser())
app.use(cors({
    origin: function(ctx) {
      if (ctx.url === '/test') {
        return false;
      }
      return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }))

// passport初始化
app.use(passport.initialize())
app.use(passport.session())

// 回调到config文件中 passport.js
require('./blog-api/config/passport')(passport);

// 全局配置
const config = require('./blog-api/config/config')

// 引入路由
const user = require('./blog-api/routes/user')
const article = require('./blog-api/routes/article')
const message = require('./blog-api/routes/message')
const entertainment = require('./blog-api/routes/entertainment')
const timeline = require('./blog-api/routes/timeline')
const blogroll = require('./blog-api/routes/blogroll')


// 配置路由根路径
router.use('/api/users', user)
router.use('/api/articles', article)
router.use('/api/messages', message)
router.use('/api/entertainment', entertainment)
router.use('/api/timeline', timeline)
router.use('/api/blogroll', blogroll)
// 访问根路径 前端包
router.use('/', async ctx => {
  // ctx.sendFile(path.resolve(__dirname,'client','dist','index.html'))
  ctx.response.type = 'html'
  ctx.response.body = fs.createReadStream(path.resolve(__dirname,'client','dist','index.html'))
})

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

const PORT = config.PORT || 5000
app.listen(PORT, () => console.log('Server running on ' + PORT))