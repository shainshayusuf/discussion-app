const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscussionSchema = new Schema({
    topic: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    comments:{
        type:Array,
        required:false,
        default:[]
    },

    createdBy: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now(),
        required:false
    }




});
module.exports = mongoose.model('discussions', DiscussionSchema); 