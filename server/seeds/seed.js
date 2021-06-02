const db = require('../config/connection');
const { Types } = require('mongoose');

const {User, BucketList, Comment} = require('../models');
const userData = require('./userData.json');
const bucketListData = require('./bucketListData.json');

db.once('open', async ()=>{
    try{
        await User.deleteMany({});
        await BucketList.deleteMany({});
        await Comment.deleteMany({});
        
        // Create user
        const user = await User.create(userData);
        
        for(let i=0; i < bucketListData.length; i++) {
            // Create bucketlist and get bucketListId
            let bucketList = await BucketList.create(bucketListData[i]);
            
            // update user with newly created bucket list id
            const newUser = await User.findByIdAndUpdate(
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