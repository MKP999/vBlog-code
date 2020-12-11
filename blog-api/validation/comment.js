const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateCommentInput (data) {
    let error = {}

    if (validator.isEmpty(data.content)) {
        error.msg = 'content不能为空'
    }

    return {
        error,
        isValid: isEmpty(error) // 判断是否有报错
    }
}
