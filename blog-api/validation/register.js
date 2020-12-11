const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateRegisterInput (data) {
    let error = {}

    if (validator.isEmpty(data.username)) {
        error.msg = 'username不能为空'
    }
    if (!validator.isLength(data.username, {min: 3, max: 12})) {
        error.msg = 'username的长度不能小于3位且不能超过12位'
    }
    if (validator.isEmpty(data.password)) {
        error.msg = 'password不能为空'
    }
    if (!validator.isLength(data.password, {min: 6, max: 30})) {
        error.msg = 'password的长度不能小于6位且不能超过30位'
    }
    if (validator.isEmpty(data.email)) {
        error.msg = 'email不能为空'
    }
    if (!validator.isEmail(data.email)) {
        error.msg = '邮箱格式不合法'
    }
    if (validator.isEmpty(data.wechat)) {
        error.msg = 'wechat不能为空'
    }
    if (validator.isEmpty(data.phone)) {
        error.msg = 'phone不能为空'
    }

    return {
        error,
        isValid: isEmpty(error) // 判断是否有报错
    }
}
