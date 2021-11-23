const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bio: String
    picture: String
    banner_picture: String
    followers: [ID]
    following: [ID]
    privacy_mode: Boolean
    bucketList: [ID]
  }
  input UpdateUserInput {
    email: String
    password: String
    bio: String
    picture: Upload
    banner_picture: Upload
    privacy_mode: Boolean
  }
  type FollowUser {
    followingUser: User
    followedUser: User
  }
  type UsernamePicture {
    username: String
    picture: String
  }
  type FollowUserInfo {
    following: [UsernamePicture]
    followers: [UsernamePicture]
  }
  type BucketList {
    _id: ID!
    name: String!
    progress: String!
    createdBy: String
    post: [Post]
  }
  input BucketListInput {
    name: String!
    progress: String!
  }
  type Post {
    _id: ID!
    description: String!
    images: [String]
    likes: [User]
    tags: [String]
    date_created: String!
    comment: [Comment]
  }
  input PostInput {
    description: String!
    images: [String]
    date_created: String!
  }
  type Comment {
    comment: String!
    likes: [User]
    date_created: String!
  }
  input CommentInput {
    comment: String!
    date_created: String!
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    followingList(username: String!): FollowUserInfo
    followersList(username: String!): FollowUserInfo
    getBucketLists(id:String!): [BucketList]
    getBucketList(_id: String!): BucketList
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String, username: String, password: String!): Auth
    updateUser(userData: UpdateUserInput!): User
    followUser(followId: ID!, isFollowing: Boolean): FollowUser
    addBucketList(listData: BucketListInput!): User
    deleteBucketList(listId: ID!): User
    editBucketList(listId: ID!, listData: BucketListInput!): BucketList
    
    addPost(postData: PostInput!): BucketList
    deletePost(postId: ID!): BucketList
    editPost(postId: ID! postData: PostInput!): BucketList
    
    addComment(commentData: CommentInput!): Post
    deleteComment(commentId: ID!): Post
    editComment(commentId: ID!, commentData: CommentInput!): Post
  }
`;

// We need edits for the mutations

module.exports = typeDefs;