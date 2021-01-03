const Article = require('../model/Article')
const validateArticleInput = require('../validation/article')
const validateCommentInput = require('../validation/comment')


/**
 * @route GET api/articles/test
 * @desc  测试
 * @access 接口是公开的
 */
exports.Test = async ctx => {
    ctx.body = { msg: 'articles succeed ...' }
}

/**
 * @route GET api/articles/article?:id
 * @desc  查看单个文章
 * @access 接口是公开的
 */
exports.GetArticle = async ctx => {
    const id = ctx.query.id
    await Article.findById(id)
    .then(item => {
        ctx.status = 200
        ctx.body = { success: true, data: item}
      })
      .catch(err => {
        ctx.status = 404
        ctx.body = { success: false, msg: '文章不存在'}
      })
}

/**
 * @route GET api/articles/articles
 * @desc  查看全部文章
 * @access 接口是公开的
 */
exports.GetArticles = async ctx => {
    ctx.body = ctx.advancedResults
}

/**
 * @route POST api/articles/article
 * @desc  创建文章
 * @access 接口是私有的
 */
exports.CreateArticle = async ctx => {
    const body = ctx.request.body
    const { error, isValid } = validateArticleInput(body)
    if (!isValid) {
        ctx.status = 400
        ctx.body = error
        return
    }

    const articleInfo = {}

    if (body.title) {
        articleInfo.title = body.title
    }
    if (body.content) {
        articleInfo.content = body.content
    }
    if (body.text) {
        articleInfo.text = body.text
    }
    if (body.type) {
        articleInfo.type = body.type
    }
    articleInfo.user = ctx.state.user._id

    // 创建缓存
    const article = new Article(articleInfo)

    await article.save().then(article => {
        ctx.status = 200
        ctx.body = { success: true, data: article}
    }).catch(err => {
        ctx.status = 400
        ctx.body = { success: false, msg: '创建文章失败'}
    })
}

/**
 * @route PUT api/articles/article?:id
 * @desc  修改文章
 * @access 接口是私有的
 */
exports.UpdateArticle = async ctx => {
    const id = ctx.query.id
    const body = ctx.request.body

    const { error, isValid } = validateArticleInput(body)
    if (!isValid) {
        ctx.status = 400
        ctx.body = error
        return
    }

    // 判断文章是否存在
    try {
        const cheackArticle = await Article.findById(id)
        if (cheackArticle) {
            const articleInfo = {}

            if (body.title) {
                articleInfo.title = body.title
            }
            if (body.content) {
                articleInfo.content = body.content
            }
            if (body.text) {
                articleInfo.text = body.text
            }
            if (body.type) {
                articleInfo.type = body.type
            }
            articleInfo.user = ctx.state.user._id

            const updateArticle = await Article.findByIdAndUpdate(
                {_id: id},
                {$set: articleInfo},
                {new: true}
            )
            ctx.body = { success: true, data: updateArticle }
        } 

    } catch (error) {
        ctx.status = 404
        ctx.body = { success: false, msg: '文章不存在'}
    }
}

/**
 * @route POST api/articles/like?:id
 * @desc  点赞与取消点赞
 * @access 接口是私有的
 */
exports.ToggleLike = async ctx => {
    const id = ctx.query.id
    const user = ctx.state.user
    // 判断文章是否存在
    try {
        const article = await Article.findById(id)
        if (article) {
            // 判断点赞还是取消点赞
            // 判断是否有 相同id 的下表
            const removeIndex = article.like.map(item => item.user.toString()).indexOf(user._id)
            console.log('removeIndex => ', removeIndex)
            if (removeIndex < 0) {
                // 点赞
                article.like.unshift({user: user._id})
                const updateArticle = await Article.findByIdAndUpdate(
                    {_id: id},
                    {$set: article},
                    {new: true}
                )
                ctx.body = {success: true, data: updateArticle}
            } else {
                // 具备该下标 取消点赞
                article.like.splice(removeIndex, 1)
                const updateArticle = await Article.findByIdAndUpdate(
                    {_id: id},
                    {$set: article},
                    {new: true}
                )
                ctx.body = {success: true, data: updateArticle}
            }
        }
    } catch (error) {
        ctx.status = 404
        ctx.body = { success: false, msg: '文章不存在'}
        console.log(error)
    }
}

/**
 * @route POST api/articles/comment?:id
 * @desc  创建文章评论
 * @access 接口是私有的
 */
exports.CreateComment = async ctx => {
    const id = ctx.query.id
    const user = ctx.state.user
    const body = ctx.request.body

    // 验证评论表单
    const { error, isValid } = validateCommentInput(body)
    if (!isValid) {
        ctx.status = 400
        ctx.body = error
        return
    }

    // 判断文章是否存在
    try {
        const article = await Article.findById(id)
        if (article) {
            const commentInfo = {
                user: user._id,
                content: body.content,
                name: user.username,
                avatar: user.avatar
            }
            console.log('commentInfo => ', commentInfo)
            article.comments.unshift(commentInfo)
            // 更新 缓存
            const updateArticle = await Article.findByIdAndUpdate(
                {_id: id},
                {$set: article},
                {new:true}
            )
            ctx.body = {success: true, data: updateArticle}
        }
    } catch (error) {
        ctx.status = 404
        ctx.body = { success: false, msg: '文章不存在'}
        console.log(error)
    }
}

/**
 * @route DELETE api/articles/comment?:art_id&:com_id
 * @desc  删除文章评论
 * @access 接口是私有的
 */
exports.DeleteComment = async ctx => {
    const art_id = ctx.query.art_id
    const com_id = ctx.query.com_id
    const user = ctx.state.user

    // 判断文章是否存在
    try {
        const article = await Article.findById(art_id)
        // 查找是否有该评论
        const removeIndex = article.comments.map(item => item._id).indexOf(com_id)
        if (removeIndex < 0) {
            // 未找到
            ctx.status = 404
            ctx.body = { success: false, msg: '评论不存在'}
        } else {
            // 找到
            // 判断是否为admin 允许操作
            if (user.role === 'admin') {
                article.comments.splice(removeIndex, 1)
                const updateArticle = await Article.findByIdAndUpdate(
                    {_id: art_id},
                    {$set: article},
                    {new: true}
                )
                ctx.body = { success: true, data: updateArticle }
            } else {
                // 判断是否为本人 本人可以操作
                const hasHandle = article.comments[removeIndex].user.toString() === user._id.toString()
                console.log('文章的user', article.comments[removeIndex].user)
                console.log('当前用户的id', user._id)
                console.log('是否可以操作', hasHandle)
                if (hasHandle) {
                    article.comments.splice(removeIndex, 1)
                    const updateArticle = await Article.findByIdAndUpdate(
                        {_id: art_id},
                        {$set: article},
                        {new: true}
                    )
                    ctx.body = { success: true, data: updateArticle }
                } else {
                    ctx.status = 401
                    ctx.body = { success: false, msg: '非法操作'}
                }

            }
        }
    } catch (error) {
        ctx.status = 404
        ctx.body = { success: false, msg: '文章不存在'}
        console.log(error)
    }
}

/**
 * @route GET api/articles/search?title=123
 * @desc  模糊查询文章标题
 * @access 接口是公开的
 */
exports.Search = async ctx => {
    const title = ctx.query.title
    try {
        const article = await Article.find().sort({date: -1})
        const data = [] 
        article.forEach(item => {
            if (item.title.includes(title)) {
                return data.push(item)
            }
        })
        ctx.status = 200
        ctx.body = { success: true, total: data.length, data }
    } catch (error) {
        console.log(error)
    }
}


/**
 * @route GET api/articles/number
 * @desc    获取文章数、评论数、点赞、分类的文章数
 * @access 接口是公开的
 */
exports.GetNumber = async ctx => {
    try {
        const article = await Article.find().sort({date: -1})
        // 文章数
        const total = await Article.countDocuments()
        // 评论数
        let commitNum = 0
        // 点赞
        let likeNum = 0
        // 分类文章数 前端获取用 object.keys取出
        let classify = {}
        article.forEach(item => {
            commitNum += item.comments.length
            likeNum += item.like.length
            if (classify[item.type]) {
                classify[item.type] += 1
            } else {
                classify[item.type] = 1
            }
        })
        ctx.status = 200
        ctx.body = { success: true, data: { total, commitNum, likeNum, classify} }
    } catch (error) {
        console.log(error)
    }
}

/**
 * @route DELETE api/articles/article?id=123
 * @desc  删除文章
 * @access 接口是私有的
 */
exports.DeleteArticle = async ctx => {
    try {
        const id = ctx.query.id
        const article = await Article.findById(id)
        if (article) {
            if (ctx.state.user.role === 'admin') {
                await Article.findByIdAndDelete(id)
                ctx.status = 200
                ctx.body = { success: true, data: [] }
            } else {
                ctx.status = 403
                ctx.body = { success: false, msg: '该用户无权限访问此路由' }
            }
        }
    } catch(err) {
        ctx.status = 404
        ctx.body = { success: false, msg: '文章不存在' }
    }
}