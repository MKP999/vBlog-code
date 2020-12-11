const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false   // 需要显示的地方添加 select('+password')
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    wechat: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'visitor'],
        default: 'user',
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('users', UserSchema)