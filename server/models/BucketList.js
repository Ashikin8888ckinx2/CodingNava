<<<<<<< HEAD
const mongoose = require("mongoose");
const {PostSchema} = require('./Post');
=======
const mongoose = require('mongoose');
>>>>>>> 34008845b90ec5ae4abdb8476e4b85a7dc6f1deb

const Schema = mongoose.Schema;

const BucketListSchema = new Schema({
<<<<<<< HEAD
    name: {
        type: String,
        trim: true
    },
    progress: {
        type: String,
    },
    post: [PostSchema]
=======
  name: {
    type: String,
    trim: true,
  },
  progress: {
    type: String,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
>>>>>>> 34008845b90ec5ae4abdb8476e4b85a7dc6f1deb
});

const BucketList = mongoose.model('BucketList', BucketListSchema);

<<<<<<< HEAD
module.exports = {BucketList, BucketListSchema};
=======
module.exports = BucketList;
>>>>>>> 34008845b90ec5ae4abdb8476e4b85a7dc6f1deb
