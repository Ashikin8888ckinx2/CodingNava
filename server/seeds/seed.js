const db = require('../config/connection');
const { Types } = require('mongoose');

const {User, BucketList, Post, Comment} = require('../models');
const userData = require('./userData.json');
const bucketListData = require('./bucketListData.json');
const postData = require('./postData.json');

db.once('open', async ()=>{
    try{
        await User.deleteMany({});
        await BucketList.deleteMany({});
        await Post.deleteMany({});
        await Comment.deleteMany({});
        
        // Create user
        const user = await User.create(userData);
        
        for(let i=0; i < bucketListData.length; i++) {
            // Create bucketlist and get bucketListId
            let bucketList = await BucketList.create(bucketListData[i]);
            let post = await Post.create(postData[i]);

            await BucketList.findByIdAndUpdate(
                bucketList._id,
                {$push: {post: Types.ObjectId(post._id)}},
                {new: true}
            )

            
            // update user with newly created bucket list id
            await User.findByIdAndUpdate(
                bucketList.createdBy,
                {$push: {bucketList: Types.ObjectId(bucketList._id)}},
                {new: true}
            );
        }

    }catch(err) {
        console.log(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);

})