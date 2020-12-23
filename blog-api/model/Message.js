const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            content: {
                type: String,
                require: true
            },
            name: {
                type: String,
                require: true
            },
            avatar: {
                type: String,
                require: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

module.exports = Message = mongoose.model('messages', MessageSchema)