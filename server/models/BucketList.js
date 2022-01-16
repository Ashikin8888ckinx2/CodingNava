const mongoose = require("mongoose");
const {PostSchema} = require('./Post');

const Schema = mongoose.Schema;

const BucketListSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    progress: {
        type: String,
    },
    // So we can reference the User when BucketList is called
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    // Returns a list of posts
    post: [{
        type: Schema.Types.ObjectId,
        ref: 'Post' 
        // But wouldn't post need to be a model here instead of a schema?
    }]
});

const BucketList = mongoose.model('BucketList', BucketListSchema);

module.exports = BucketList;
