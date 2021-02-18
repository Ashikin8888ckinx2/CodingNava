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
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    bucket_list_id: {
        type: Schema.Types.ObjectId,
        ref: "BucketList"
    },
    comment_ids: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;