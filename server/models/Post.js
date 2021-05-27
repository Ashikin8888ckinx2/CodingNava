const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    description: {
        type: String,
        trim: true
    },
    images: [
        {
            type: String
        }
    ],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    tags: [
        {
            type: String
        }
    ],
    date_created: {
        type: Date,
        default: Date.now
    },
    comment_ids: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = {PostSchema};