const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: {
        type: String,
        trim: true
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    date_created: {
        type: Date,
        default: Date.now
    },
    // We need this because other users can make comments
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    post_id: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;