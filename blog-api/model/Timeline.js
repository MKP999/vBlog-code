const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TimelineSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
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
    color: {
      type: String,
      require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Timeline = mongoose.model('timeline', TimelineSchema)