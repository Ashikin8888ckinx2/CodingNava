const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar FileUpload

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
    picture: FileUpload
    banner_picture: FileUpload
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
    post: [ID]
  }
  input BucketListInput {
    name: String!
    progress: String!
    createdBy: String!
  }
  type Post {
    _id: ID!
    title: String!
    description: String!
    images: [String]
    likes: [ID]
    tags: [String]
    date_created: String!
    createdBy: User
    bucketlist_id: ID
    comment: [Comment]
  }
  input PostInput {
    title: String!
    description: String!
    images: [String]
    tags: [String]
    createdBy: String!
  }
  type Comment {
    comment: String!
    likes: [ID]
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
    users(searchUser: String!): [User]
    user(username: String!): User
    followingList(username: String!): FollowUserInfo
    followersList(username: String!): FollowUserInfo
    getBucketLists(id:String!): [BucketList]
    getBucketList(_id: String!): BucketList
    getAllPosts: [Post]
    getPosts(userId: String): [Post]
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String, username: String, password: String!): Auth
    updateUser(userData: UpdateUserInput!): User
    followUser(followId: ID!, isFollowing: Boolean): FollowUser
    
    # Add, edit, delete Bucket List items
    addBucketList(listData: BucketListInput!): User
    deleteBucketList(listId: String!): User
    editBucketList(listId: ID!, progress: String): BucketList
    
    # Add, edit, delete Post items
    addPost(postData: PostInput!, listName: String!): BucketList
    deletePost(postId: ID!): BucketList
    editPost(postId: ID! postData: PostInput!): BucketList
    
    # Add, edit, delete, Comment items
    addComment(commentData: CommentInput!): Post
    deleteComment(commentId: ID!): Post
    editComment(commentId: ID!, commentData: CommentInput!): Post
  }
`;

// We need edits for the mutations

module.exports = typeDefs;