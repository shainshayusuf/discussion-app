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

    createdBy: {
        type: String,
        required: true
    },




});
module.exports = mongoose.model('discussions', DiscussionSchema); 