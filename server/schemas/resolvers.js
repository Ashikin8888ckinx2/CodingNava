const { AuthenticationError } = require('apollo-server-express');
const { GraphQLUpload } = require('graphql-upload');

const { User, BucketList, Post, Comment } = require('../models');
const { signToken } = require('../utils/auth');
const { uploadImage } = require('../utils/cloudinary');

// Think about what action users can do with and without login
// If things need to happen with login, then the Query needs context and auth error

const resolvers = {
  FileUpload: GraphQLUpload,
  Query: {
    // Access current user's profile
    me: async (parent, args, context) => {
      if (context.user) {
        // excludes password form User object 
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
      }
      throw new AuthenticationError('Not logged in!');
    },
    // Find all users
    users: async (parent, { searchUser }) => {
      return User.find({ username: { "$regex": searchUser, "$options": "i" } });
    },
    // Find a single user
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    // Find following information
    followingList: async (parent, { username }) => {
      return await User.findOne({ username }).populate('following');
    },
    followersList: async (parent, { username }) => {
      return await User.findOne({ username }).populate('followers');
    },
    // Find bucket lists based on user
    getBucketLists: async (parent, { id }) => {
      return BucketList.find({ createdBy: id });
    },
    // Find a single bucket list
    getBucketList: async (parent, { _id }) => {
      return await BucketList.findOne({ _id });
    },
    // Find all posts based for homepage
    getAllPosts: async (parent) => {
      return await Post.find().sort({ date_created: -1 }).populate('createdBy');
    },
    // Find posts based on user or bucketlist
    getPosts: async (parent, { userId }) => {
      return await Post.find({ createdBy: userId }).sort({ date_created: -1 });
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, username, password }) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ $or: [{ email: email }, { username: username }] });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const checkPassword = await user.checkPassword(password);

      if (!checkPassword) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, { userData }, context) => {
      if (context.user) {
        if (userData.picture) {
          const file = await uploadImage(await userData.picture);
          userData.picture = file.url;
        }
        if (userData.banner_picture) {
          const file = await uploadImage(await userData.banner_picture);
          userData.banner_picture = file.url;
        }
        const user = await User.findById({ _id: context.user._id });
        Object.assign(user, userData);
        await user.save();
        return user;
      }
      throw new AuthenticationError('User not logged in');
    },
    followUser: async (parent, { followId, isFollowing }, context) => {
      if (context.user) {
        if (context.user._id == followId) {
          throw new Error("Can't follow yourself");
        }
        const action = isFollowing ? '$pull' : '$addToSet';
        const followingUser = await User.findByIdAndUpdate({ _id: context.user._id }, { [action]: { following: followId } }, { new: true });
        const followedUser = await User.findByIdAndUpdate({ _id: followId }, { [action]: { followers: context.user._id } }, { new: true });
        return { followingUser, followedUser };
      }
      throw new AuthenticationError('User not logged in');
    },
    addBucketList: async (parent, { listData }, context) => {
      // Check if logged in, then add bucket list to a user's profile
      if (context.user) {
        // Create a new bucket list with listData
        const newBucketList = await BucketList.create({
          name: listData.name,
          progress: listData.progress,
          createdBy: context.user
        })

        // Push bucket list id into User array
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { bucketList: newBucketList._id } },
          { new: true });

        // Return user
        return updatedUser;
      }
      throw new AuthenticationError('User not logged in');
    },
    deleteBucketList: async (parent, { listId }, context) => {
      // check if logged in, then delete a bucket list from a user's profile
      if (context.user) {        
        await BucketList.findByIdAndDelete(
          {_id: listId}
        )
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { bucketList: listId } }, 
          { new: true });
        return updatedUser;
      }
      throw new AuthenticationError('User not logged in');
    },
    editBucketList: async (parent, { listId, listData }, context) => {
      // check if logged in, then allow user to edit bucket list
      if (context.user) {
        const updatedList = await BucketList.findByIdAndUpdate(
          { _id: listId },
          {
            name: listData.name,
            progress: listData.progress,

          }
        );

        return updatedList;
      }
    },
    addPost: async (parent, { postData, listName }, context) => {
      // check if logged in, then add a post to a user's bucket list
      // if (context.user) {
      // Create new post
      const newPost = await Post.create({
        title: postData.title,
        description: postData.description,
        // May have to create a for loop for the images and tags
        images: postData.images,
        tags: postData.tags,
        // createdBy: context.user
        createdBy: postData.createdBy
      })
      // Push post ID into BucketList
      const updatedBucketList = await BucketList.findOneAndUpdate(
        { name: listName },
        { $push: { post: newPost._id } },
        { new: true }
      );

      // Return updated bucket list
      return updatedBucketList;
      // }
      // throw new AuthenticationError('User not logged in');
    },
    deletePost: async (parent, { postId }, context) => {
      // check if logged in then delete a post from a user's bucket list
      if (context.user) {
        const updatedBucketList = await BucketList.findByIdAndUpdate({ _id: context.user.bucketList._id }, { $pull: { post: { postId } } }, { new: true });
        return updatedBucketList;
      }
      throw new AuthenticationError('User not logged in');
    },
    addComment: async (parent, { commentData }, context) => {
      // check if logged in, then add a comment to a post
      if (context.user) {
        const updatedPost = await Post.findByIdAndUpdate({ _id: context.user.bucketlist.post._id }, { $push: { comment: { commentData } } }, { new: true });
        return updatedPost;
      }
      throw new AuthenticationError('User not logged in');
    },
    deleteComment: async (parent, { commentId }, context) => {
      // check if logged in, then delete a comment from a user's post
      if (context.user) {
        const updatedPost = await Post.findByIdAndUpdate({ _id: context.user.bucketList.post._id }, { $pull: { comment: { commentId } } }, { new: true });
        return updatedPost;
      }
      throw new AuthenticationError('User not logged in');
    },
  },
};

module.exports = resolvers;