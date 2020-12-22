const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateTimelineInput (data) {
    let error = {}

    if (validator.isEmpty(data.title)) {
        error.msg = 'title不能为空'
    }
    if (validator.isEmpty(data.content)) {
        error.msg = 'content不能为空'
    }
    if (validator.isEmpty(data.time)) {
        error.msg = 'time'
    }
    if (!validator.isLength(data.title, {min: 3, max: 50})) {
        error.msg = 'title的长度不能小于3位且不能超过50位'
    }
    if (!validator.isLength(data.content, {min: 10})) {
        error.msg = 'content的长度不能小于10'
    }

    return {
        error,
        isValid: isEmpty(error) // 判断是否有报错
    }
}
