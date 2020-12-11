const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateLoginInput (data) {
    let error = {}

    if (validator.isEmpty(data.password)) {
        error.msg = 'password不能为空'
    }
    if (validator.isEmpty(data.email)) {
        error.msg = 'email不能为空'
    }
    if (!validator.isEmail(data.email)) {
        error.msg = '邮箱格式不合法'
    }

    return {
        error,
        isValid: isEmpty(error) // 判断是否有报错
    }
}
