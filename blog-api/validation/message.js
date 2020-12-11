const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateMessageInput (data) {
    let error = {}

    if (validator.isEmpty(data.name)) {
        error.msg = 'name不能为空'
    }
    if (!validator.isLength(data.name, {min: 3, max: 12})) {
        error.msg = 'name的长度不能小于3位且不能超过12位'
    }
    if (validator.isEmpty(data.email)) {
        error.msg = 'email不能为空'
    }
    if (!validator.isEmail(data.email)) {
        error.msg = '邮箱格式不合法'
    }
    if (validator.isEmpty(data.content)) {
        error.msg = 'content不能为空'
    }

    return {
        error,
        isValid: isEmpty(error) // 判断是否有报错
    }
}
