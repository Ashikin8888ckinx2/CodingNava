const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BucketListSchema = new Schema({
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
});

const BucketList = mongoose.model('BucketList', BucketListSchema);

module.exports = BucketList;
