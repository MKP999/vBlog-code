const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogrollSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    describe: {
      type: String,
      require: true
    },
    url: {
      type: String,
      require: true
    },
    type: {
      type: Number,
      require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Blogroll = mongoose.model('Blogroll', BlogrollSchema)