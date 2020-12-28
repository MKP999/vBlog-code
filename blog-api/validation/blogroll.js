const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateBlogrollInput (data) {
    let error = {}

    if (validator.isEmpty(data.title)) {
        error.msg = 'title不能为空'
    }
    if (validator.isEmpty(data.avatar)) {
        error.msg = 'avatar不能为空'
    }
    if (validator.isEmpty(data.describe)) {
        error.msg = 'describe不能为空'
    }
    if (validator.isEmpty(data.url)) {
      error.msg = 'url不能为空'
    }
    if (!validator.isLength(data.title, {min: 1, max: 50})) {
        error.msg = 'title的长度不能小于1位且不能超过50位'
    }
    if (!validator.isLength(data.describe, {min: 1, max: 50})) {
        error.msg = 'describe的长度不能小于1位且不能超过50位'
    }

    return {
        error,
        isValid: isEmpty(error) // 判断是否有报错
    }
}
