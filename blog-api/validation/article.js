const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateArticleInput (data) {
    let error = {}

    if (validator.isEmpty(data.title)) {
        error.msg = 'title不能为空'
    }
    if (validator.isEmpty(data.content)) {
        error.msg = 'content不能为空'
    }
    if (validator.isEmpty(data.type)) {
        error.msg = 'type不能为空'
    }
    if (!validator.isLength(data.title, {min: 1, max: 100})) {
        error.msg = 'title的长度不能小于1位且不能超过100位'
    }
    if (!validator.isLength(data.content, {min: 15})) {
        error.msg = 'content的长度不能小于15'
    }

    return {
        error,
        isValid: isEmpty(error) // 判断是否有报错
    }
}
