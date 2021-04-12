const { AuthenticationError } = require('apollo-server-express');
const { User, BucketList, Post, Comment } = require('../models');
const { signToken } = require('../utils/auth');

// Think about what action users can do with and without login
// If things need to happen with login, then the Query needs context and auth error

const resolvers = {
  Query: {
    // Access current user's profile
    me: async (parent, args, context) => {
      if (context.user) {
        // excludes password form User object
        const userData = await User
          .findOne({ _id: context.user._id })
          .select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('Not logged in!');
    },
    // Find all users
    users: async () => {
      return User.find();
    },
    // Find a single user
    user: async (parent, { userId }) => {
      return User.findOne({ userId });
    },
    // Find all bucket lists
    bucketLists: async () => {
      return BucketList.find();
    },
    // Find a single bucket list
    bucketList: async (parent, args) => {
      return BucketList.findOne(args._id);
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
    addBucketList: async (parent, {listData}, context) =>{
      // Check if logged in, then add bucket list to a user's profile
      if(context.user){
        const updatedUser = await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$push: {bucketList: {listData}}},
          {new: true}
        )
        return updatedUser;
      }
      throw new AuthenticationError('User not logged in');
    },
    addPost: async (parent, {postData}, context) =>{
      // check if logged in, then add a post to a user's bucket list
      if(context.user){
        const updatedBucketList = await BucketList.findByIdAndUpdate(
          {_id: context.user.bucketList._id},
          {$push: {post: {postData}}},
          {new: true}
        );
        return updatedBucketList;
      }
      throw new AuthenticationError('User not logged in');
    },
    addComment: async (parent, {commentData}, context) =>{
      // check if logged in, then add a comment to a post
      if(context.user){
        const updatedPost = await Post.findByIdAndUpdate(
          {_id: context.user.bucketlist.post._id},
          {$push: {comment: {commentData}}},
          {new: true}
        );
        return updatedPost;
      }
      throw new AuthenticationError('User not logged in');
    },
    deleteBucketList: async (parent, {listId}, context) =>{
      // check if logged in, then delete a bucket list from a user's profile
      if(context.user){
        const updatedUser = await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$pull: {bucketList: {listId}}},
          {new: true}
        );
        return updatedUser;
      }
      throw new AuthenticationError('User not logged in');
    },
    deletePost: async (parent, {postId}, context) =>{
      // check if logged in then delete a post from a user's bucket list
      if(context.user){
        const updatedBucketList = await BucketList.findByIdAndUpdate(
          {_id: context.user.bucketList._id},
          {$pull: {post: {postId}}},
          {new: true}
        );
        return updatedBucketList;
      }
      throw new AuthenticationError('User not logged in');
    },
    deleteComment: async (parent, {commentId}, context) =>{
      // check if logged in, then delete a comment from a user's post
      if(context.user){
        const updatedPost = await Post.findByIdAndUpdate(
          {_id: context.user.bucketList.post._id},
          {$pull: {comment: {commentId}}},
          {new: true}
        );
        return updatedPost;
      }
      throw new AuthenticationError('User not logged in');
    }
  },
};

module.exports = resolvers;
