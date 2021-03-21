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
    post: [PostSchema]
});

const BucketList = mongoose.model('BucketList', BucketListSchema);

module.exports = {BucketList, BucketListSchema};
