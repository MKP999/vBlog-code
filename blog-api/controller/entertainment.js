const axios = require('axios')
/**
 * @route GET api/entertainment/test
 * @desc  测试
 * @access 接口是公开的
 */
exports.Test = async ctx => {
    ctx.body = { msg: 'entertainment succeed ...' }
}

/**
 * @route GET api/entertainment/news
 * @desc  获取新闻列表信息
 * @access 接口是公开的
 */
exports.GetNews = async ctx => {
    try {
        const { page, count } = ctx.query
        const res = await axios.get(`https://api.apiopen.top/getWangYiNews?page=${page}&count=${count}`)
        ctx.body = { data: res.data }
    } catch (error) {
        console.log(error)
    }
}

/**
 * @route GET api/entertainment/getJoke
 * @desc  获取一条段子
 * @access 接口是公开的
 */
exports.GetJokes = async ctx => {
    try {
        console.log(ctx.query)
        const { page } = ctx.query
        const res = await axios.get(`https://api.apiopen.top/getJoke?page=${page}&count=1`)
        ctx.body = { data: res.data }
    } catch (error) {
        console.log(error)
    }
}
