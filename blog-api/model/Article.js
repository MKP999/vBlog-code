const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    user: {
        type: String,
        ref: 'users',
        require: true
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    like: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
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
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Article = mongoose.model('articles', ArticleSchema)