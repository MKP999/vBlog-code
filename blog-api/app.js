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

const app = new koa()

// 引入MongoDB url
const db = require('./config/config').mongoURL
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
require('./config/passport')(passport);

// 全局配置
const config = require('./config/config')

// 引入路由
const user = require('./routes/user')
const article = require('./routes/article')
const message = require('./routes/message')

// 配置路由根路径
router.use('/api/users', user)
router.use('/api/articles', article)
router.use('/api/messages', message)

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

const PORT = config.PORT || 5000
app.listen(PORT, () => console.log('Server running on ' + PORT))